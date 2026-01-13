import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SocialAccount } from '../../accounts/entities/account.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'varchar',
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'varchar',
    default: SubscriptionTier.FREE,
  })
  subscriptionTier: SubscriptionTier;

  @Column({ nullable: true })
  googleId: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ nullable: true })
  @Exclude()
  twoFactorSecret: string;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  @Exclude()
  passwordResetToken: string;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ nullable: true })
  lastLoginIp: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => SocialAccount, (account) => account.user)
  socialAccounts: SocialAccount[];

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaigns: Campaign[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual properties
  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  get accountLimit(): number {
    switch (this.subscriptionTier) {
      case SubscriptionTier.FREE:
        return 5;
      case SubscriptionTier.BASIC:
        return 20;
      case SubscriptionTier.PREMIUM:
        return 100;
      case SubscriptionTier.ENTERPRISE:
        return 500;
      default:
        return 5;
    }
  }
}
