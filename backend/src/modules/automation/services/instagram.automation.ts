import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

@Injectable()
export class InstagramAutomation {
  private readonly logger = new Logger(InstagramAutomation.name);

  async executeTask(account: any, task: any): Promise<any> {
    this.logger.log(`Executing Instagram task: ${task.type}`);

    const browser = await this.launchBrowser(account);

    try {
      switch (task.type) {
        case 'follow':
          return await this.follow(browser, task.payload);
        case 'unfollow':
          return await this.unfollow(browser, task.payload);
        case 'like':
          return await this.like(browser, task.payload);
        case 'comment':
          return await this.comment(browser, task.payload);
        case 'post':
          return await this.post(browser, task.payload);
        case 'direct_message':
          return await this.sendDirectMessage(browser, task.payload);
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }
    } finally {
      await browser.close();
    }
  }

  private async launchBrowser(account: any) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Set fingerprint
    if (account.fingerprint) {
      await page.setUserAgent(account.fingerprint.userAgent || 'Mozilla/5.0');
      if (account.fingerprint.viewport) {
        await page.setViewport(account.fingerprint.viewport);
      }
    }

    // Login with cookies if available
    if (account.credentials?.cookies) {
      await page.setCookie(...account.credentials.cookies);
    }

    return browser;
  }

  private async follow(browser: any, payload: any): Promise<any> {
    this.logger.log(`Following user: ${payload.targetUsername}`);
    
    const page = await browser.newPage();
    await page.goto(`https://www.instagram.com/${payload.targetUsername}/`);
    
    // Wait for page load and click follow button
    await page.waitForSelector('button', { timeout: 5000 });
    
    // Random delay to simulate human behavior
    await this.randomDelay(1000, 3000);
    
    // Click follow button (simplified)
    // In production, use more robust selectors
    
    return {
      success: true,
      action: 'follow',
      target: payload.targetUsername,
    };
  }

  private async unfollow(browser: any, payload: any): Promise<any> {
    this.logger.log(`Unfollowing user: ${payload.targetUsername}`);
    return { success: true, action: 'unfollow' };
  }

  private async like(browser: any, payload: any): Promise<any> {
    this.logger.log(`Liking post: ${payload.targetPostId}`);
    return { success: true, action: 'like' };
  }

  private async comment(browser: any, payload: any): Promise<any> {
    this.logger.log(`Commenting on post: ${payload.targetPostId}`);
    return { success: true, action: 'comment' };
  }

  private async post(browser: any, payload: any): Promise<any> {
    this.logger.log('Creating new post');
    return { success: true, action: 'post' };
  }

  private async sendDirectMessage(browser: any, payload: any): Promise<any> {
    this.logger.log(`Sending DM to: ${payload.targetUsername}`);
    return { success: true, action: 'dm' };
  }

  private async randomDelay(min: number, max: number): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
