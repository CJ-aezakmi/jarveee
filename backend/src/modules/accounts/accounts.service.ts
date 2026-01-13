import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAccount } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(SocialAccount)
    private accountsRepository: Repository<SocialAccount>,
  ) {}

  async create(userId: string, createAccountDto: CreateAccountDto): Promise<SocialAccount> {
    const account = this.accountsRepository.create({
      ...createAccountDto,
      userId,
    });
    return this.accountsRepository.save(account);
  }

  async findAll(userId: string): Promise<SocialAccount[]> {
    return this.accountsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<SocialAccount> {
    const account = await this.accountsRepository.findOne({
      where: { id, userId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async update(
    id: string,
    userId: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<SocialAccount> {
    const account = await this.findOne(id, userId);
    Object.assign(account, updateAccountDto);
    return this.accountsRepository.save(account);
  }

  async remove(id: string, userId: string): Promise<void> {
    const account = await this.findOne(id, userId);
    await this.accountsRepository.remove(account);
  }

  async updateStatistics(id: string, statistics: any): Promise<void> {
    await this.accountsRepository.update(id, {
      statistics: { ...statistics, lastUpdated: new Date() },
    });
  }

  async updateWarmupLevel(id: string, level: number): Promise<void> {
    await this.accountsRepository.update(id, { warmupLevel: level });
  }
}
