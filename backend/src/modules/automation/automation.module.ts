import { Module } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { InstagramAutomation } from './services/instagram.automation';
import { FacebookAutomation } from './services/facebook.automation';
import { TwitterAutomation } from './services/twitter.automation';

@Module({
  providers: [
    AutomationService,
    InstagramAutomation,
    FacebookAutomation,
    TwitterAutomation,
  ],
  exports: [AutomationService],
})
export class AutomationModule {}
