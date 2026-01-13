import { Injectable } from '@nestjs/common';
import { InstagramAutomation } from './services/instagram.automation';
import { FacebookAutomation } from './services/facebook.automation';
import { TwitterAutomation } from './services/twitter.automation';
import { SocialPlatform } from '../accounts/entities/account.entity';

@Injectable()
export class AutomationService {
  constructor(
    private instagramAutomation: InstagramAutomation,
    private facebookAutomation: FacebookAutomation,
    private twitterAutomation: TwitterAutomation,
  ) {}

  getAutomationService(platform: SocialPlatform) {
    switch (platform) {
      case SocialPlatform.INSTAGRAM:
        return this.instagramAutomation;
      case SocialPlatform.FACEBOOK:
        return this.facebookAutomation;
      case SocialPlatform.TWITTER:
        return this.twitterAutomation;
      default:
        throw new Error(`Automation not implemented for ${platform}`);
    }
  }

  async executeTask(account: any, task: any): Promise<any> {
    const automationService = this.getAutomationService(account.platform);
    return automationService.executeTask(account, task);
  }
}
