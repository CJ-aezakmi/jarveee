import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  async create(userId: string, createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = this.campaignsRepository.create({
      ...createCampaignDto,
      userId,
    });
    return this.campaignsRepository.save(campaign);
  }

  async findAll(userId: string): Promise<Campaign[]> {
    return this.campaignsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Campaign> {
    const campaign = await this.campaignsRepository.findOne({
      where: { id, userId },
      relations: ['tasks'],
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return campaign;
  }

  async update(
    id: string,
    userId: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.findOne(id, userId);
    Object.assign(campaign, updateCampaignDto);
    return this.campaignsRepository.save(campaign);
  }

  async remove(id: string, userId: string): Promise<void> {
    const campaign = await this.findOne(id, userId);
    await this.campaignsRepository.remove(campaign);
  }

  async updateStatistics(id: string, statistics: any): Promise<void> {
    await this.campaignsRepository.update(id, { statistics });
  }
}
