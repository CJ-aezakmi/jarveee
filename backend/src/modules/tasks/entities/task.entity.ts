import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SocialAccount } from '../../accounts/entities/account.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';

export enum TaskType {
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
  LIKE = 'like',
  UNLIKE = 'unlike',
  COMMENT = 'comment',
  DELETE_COMMENT = 'delete_comment',
  POST = 'post',
  DELETE_POST = 'delete_post',
  DIRECT_MESSAGE = 'direct_message',
  STORY_VIEW = 'story_view',
  REEL_VIEW = 'reel_view',
  SHARE = 'share',
  SAVE = 'save',
  SCRAPE = 'scrape',
  CUSTOM = 'custom',
}

export enum TaskStatus {
  PENDING = 'pending',
  QUEUED = 'queued',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => SocialAccount, (account) => account.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'accountId' })
  account: SocialAccount;

  @Column()
  accountId: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.tasks, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;

  @Column({ nullable: true })
  campaignId: string;

  @Column({
    type: 'varchar',
  })
  type: TaskType;

  @Column({
    type: 'varchar',
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({
    type: 'varchar',
    default: TaskPriority.NORMAL,
  })
  priority: TaskPriority;

  @Column({ type: 'jsonb', default: {} })
  payload: {
    targetUserId?: string;
    targetUsername?: string;
    targetPostId?: string;
    targetUrl?: string;
    content?: string;
    mediaUrls?: string[];
    hashtags?: string[];
    location?: string;
    mentions?: string[];
    customData?: any;
  };

  @Column({ type: 'jsonb', nullable: true })
  result: {
    success?: boolean;
    message?: string;
    data?: any;
    error?: string;
    timestamp?: Date;
  };

  @Column({ nullable: true })
  scheduledFor: Date;

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ default: 0 })
  retryCount: number;

  @Column({ default: 3 })
  maxRetries: number;

  @Column({ nullable: true, type: 'text' })
  errorMessage: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    userAgent?: string;
    ip?: string;
    proxyUsed?: string;
    duration?: number;
    [key: string]: any;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
