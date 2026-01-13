import { IsEnum, IsString, IsOptional, IsObject, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskType, TaskPriority } from '../entities/task.entity';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  accountId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  campaignId?: string;

  @ApiProperty({ enum: TaskType })
  @IsEnum(TaskType)
  type: TaskType;

  @ApiProperty({ enum: TaskPriority, required: false })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  payload?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  scheduledFor?: Date;
}
