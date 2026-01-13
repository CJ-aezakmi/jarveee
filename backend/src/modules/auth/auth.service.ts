import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;

    // Check if user exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await this.usersRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Update last login
    user.lastLoginAt = new Date();
    await this.usersRepository.save(user);

    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateGoogleUser(googleProfile: any) {
    const { email, given_name, family_name, picture, sub } = googleProfile;

    let user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      user = this.usersRepository.create({
        email,
        firstName: given_name,
        lastName: family_name,
        avatar: picture,
        googleId: sub,
        emailVerified: true,
      });
      await this.usersRepository.save(user);
    } else if (!user.googleId) {
      user.googleId = sub;
      user.emailVerified = true;
      await this.usersRepository.save(user);
    }

    return user;
  }

  async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersRepository.findOne({ where: { id: payload.sub } });

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private sanitizeUser(user: User) {
    const { password, twoFactorSecret, passwordResetToken, ...sanitized } = user;
    return sanitized;
  }
}
