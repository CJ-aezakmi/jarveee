import { IsEnum, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CampaignType } from '../entities/campaign.entity';
import { SocialPlatform } from '../../accounts/entities/account.entity';

export class CreateCampaignDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: CampaignType })
  @IsEnum(CampaignType)
  type: CampaignType;

  @ApiProperty({ enum: SocialPlatform })
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  config?: any;
}
