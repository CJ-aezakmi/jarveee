import { Controller, Get, Param, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  getDashboard(@Req() req) {
    return this.analyticsService.getDashboardStats(req.user.id);
  }

  @Get('account/:id')
  @ApiOperation({ summary: 'Get account analytics' })
  getAccountAnalytics(@Param('id') id: string, @Query('period') period: string) {
    return this.analyticsService.getAccountAnalytics(id, period);
  }

  @Get('campaign/:id')
  @ApiOperation({ summary: 'Get campaign analytics' })
  getCampaignAnalytics(@Param('id') id: string) {
    return this.analyticsService.getCampaignAnalytics(id);
  }
}
