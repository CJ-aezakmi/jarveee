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
import { SocialPlatform } from '../../accounts/entities/account.entity';

export enum CampaignType {
  FOLLOWER_GROWTH = 'follower_growth',
  ENGAGEMENT = 'engagement',
  CONTENT_POSTING = 'content_posting',
  MESSAGING = 'messaging',
  SCRAPING = 'scraping',
  CUSTOM = 'custom',
}

export enum CampaignStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  DRAFT = 'draft',
}

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.campaigns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({
    type: 'varchar',
  })
  type: CampaignType;

  @Column({
    type: 'varchar',
  })
  platform: SocialPlatform;

  @Column({
    type: 'varchar',
    default: CampaignStatus.DRAFT,
  })
  status: CampaignStatus;

  @Column({ type: 'jsonb', default: {} })
  config: {
    // Targeting
    hashtags?: string[];
    locations?: string[];
    competitors?: string[];
    keywords?: string[];
    minFollowers?: number;
    maxFollowers?: number;

    // Actions
    autoFollow?: boolean;
    autoLike?: boolean;
    autoComment?: boolean;
    autoDm?: boolean;
    autoPost?: boolean;

    // Limits
    actionsPerDay?: number;
    delayBetweenActions?: { min: number; max: number };

    // Content
    commentTemplates?: string[];
    dmTemplates?: string[];
    postSchedule?: any[];

    // Advanced
    spintax?: boolean;
    filterByLanguage?: string[];
    filterByVerified?: boolean;
  };

  @Column({ type: 'jsonb', default: {} })
  statistics: {
    totalActions?: number;
    successfulActions?: number;
    failedActions?: number;
    newFollowers?: number;
    newLikes?: number;
    newComments?: number;
    accountsProcessed?: number;
  };

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @OneToMany(() => Task, (task) => task.campaign)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
