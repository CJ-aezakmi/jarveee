import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    private configService: ConfigService,
  ) {}

  async getUserSubscription(userId: string): Promise<Subscription> {
    return this.subscriptionsRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async createSubscription(userId: string, plan: string): Promise<Subscription> {
    // In production, integrate with Stripe
    const subscription = this.subscriptionsRepository.create({
      userId,
      plan: plan as any,
    });

    return this.subscriptionsRepository.save(subscription);
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.subscriptionsRepository.update(subscriptionId, {
      status: 'cancelled' as any,
      canceledAt: new Date(),
    });
  }

  async handleStripeWebhook(event: any): Promise<void> {
    // Handle Stripe webhook events
    switch (event.type) {
      case 'customer.subscription.created':
        // Handle subscription created
        break;
      case 'customer.subscription.updated':
        // Handle subscription updated
        break;
      case 'customer.subscription.deleted':
        // Handle subscription cancelled
        break;
      case 'invoice.payment_succeeded':
        // Handle successful payment
        break;
      case 'invoice.payment_failed':
        // Handle failed payment
        break;
    }
  }
}
