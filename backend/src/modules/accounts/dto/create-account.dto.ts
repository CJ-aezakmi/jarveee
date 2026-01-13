import { IsEnum, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SocialPlatform } from '../entities/account.entity';

export class CreateAccountDto {
  @ApiProperty({ enum: SocialPlatform })
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  credentials?: {
    email?: string;
    password?: string;
    cookies?: any;
    accessToken?: string;
    refreshToken?: string;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  proxyId?: string;
}
