import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@ApiTags('campaigns')
@Controller('campaigns')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  create(@Req() req, @Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(req.user.id, createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user campaigns' })
  findAll(@Req() req) {
    return this.campaignsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign by ID' })
  findOne(@Req() req, @Param('id') id: string) {
    return this.campaignsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update campaign' })
  update(@Req() req, @Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(id, req.user.id, updateCampaignDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete campaign' })
  remove(@Req() req, @Param('id') id: string) {
    return this.campaignsService.remove(id, req.user.id);
  }
}
