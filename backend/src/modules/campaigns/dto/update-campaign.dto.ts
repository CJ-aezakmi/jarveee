import { PartialType } from '@nestjs/swagger';
import { CreateCampaignDto } from './create-campaign.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from '../entities/campaign.entity';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
  @ApiProperty({ enum: CampaignStatus, required: false })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;
}
