import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskProcessor } from './processors/task.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    BullModule.registerQueue({
      name: 'tasks',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskProcessor],
  exports: [TasksService],
})
export class TasksModule {}
