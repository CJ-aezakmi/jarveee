import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { ProxyModule } from './modules/proxy/proxy.module';
import { AutomationModule } from './modules/automation/automation.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),

    // Redis & Bull Queue
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD') || undefined,
        },
      }),
      inject: [ConfigService],
    }),

    // Schedule (for cron jobs)
    ScheduleModule.forRoot(),

    // Feature modules
    AuthModule,
    UsersModule,
    AccountsModule,
    CampaignsModule,
    TasksModule,
    AnalyticsModule,
    SubscriptionsModule,
    ProxyModule,
    AutomationModule,
  ],
})
export class AppModule {}
