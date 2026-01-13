import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

export enum SocialPlatform {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  PINTEREST = 'pinterest',
  LINKEDIN = 'linkedin',
  YOUTUBE = 'youtube',
  TUMBLR = 'tumblr',
  QUORA = 'quora',
  REDDIT = 'reddit',
  TIKTOK = 'tiktok',
}

export enum AccountStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  BANNED = 'banned',
  ERROR = 'error',
  WARMING_UP = 'warming_up',
}

@Entity('social_accounts')
export class SocialAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.socialAccounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({
    type: 'varchar',
  })
  platform: SocialPlatform;

  @Column()
  username: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, type: 'text' })
  bio: string;

  @Column({ type: 'jsonb', nullable: true })
  credentials: {
    email?: string;
    password?: string;
    cookies?: any;
    accessToken?: string;
    refreshToken?: string;
    sessionId?: string;
  };

  @Column({
    type: 'varchar',
    default: AccountStatus.ACTIVE,
  })
  status: AccountStatus;

  @Column({ nullable: true })
  proxyId: string;

  @Column({ type: 'jsonb', nullable: true })
  fingerprint: {
    userAgent?: string;
    viewport?: { width: number; height: number };
    timezone?: string;
    language?: string;
    platform?: string;
    webgl?: any;
    canvas?: any;
  };

  @Column({ type: 'jsonb', default: {} })
  statistics: {
    followers?: number;
    following?: number;
    posts?: number;
    likes?: number;
    comments?: number;
    lastUpdated?: Date;
  };

  @Column({ type: 'jsonb', default: {} })
  limits: {
    followsPerDay?: number;
    unfollowsPerDay?: number;
    likesPerDay?: number;
    commentsPerDay?: number;
    dmPerDay?: number;
    postsPerDay?: number;
  };

  @Column({ default: 0 })
  warmupLevel: number; // 0-100

  @Column({ default: false })
  isWarmingUp: boolean;

  @Column({ nullable: true })
  lastActivityAt: Date;

  @Column({ nullable: true, type: 'text' })
  lastError: string;

  @Column({ default: 0 })
  errorCount: number;

  @OneToMany(() => Task, (task) => task.account)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
