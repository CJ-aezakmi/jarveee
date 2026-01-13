import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('current')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current subscription' })
  getCurrentSubscription(@Req() req) {
    return this.subscriptionsService.getUserSubscription(req.user.id);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new subscription' })
  createSubscription(@Req() req, @Body() body: { plan: string }) {
    return this.subscriptionsService.createSubscription(req.user.id, body.plan);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  handleWebhook(@Body() event: any) {
    return this.subscriptionsService.handleStripeWebhook(event);
  }
}
