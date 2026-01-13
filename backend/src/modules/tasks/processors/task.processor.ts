import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { TasksService } from '../tasks.service';
import { TaskStatus } from '../entities/task.entity';

@Processor('tasks')
@Injectable()
export class TaskProcessor {
  private readonly logger = new Logger(TaskProcessor.name);

  constructor(private readonly tasksService: TasksService) {}

  @Process('process-task')
  async handleTask(job: Job) {
    const { taskId } = job.data;
    this.logger.log(`Processing task ${taskId}`);

    try {
      // Update status to processing
      await this.tasksService.updateStatus(taskId, TaskStatus.PROCESSING);

      // Get task details
      const task = await this.tasksService.findOne(taskId);

      if (!task) {
        throw new Error('Task not found');
      }

      // Simulate task execution
      // In real implementation, this would call the automation service
      await this.simulateTaskExecution(task);

      // Update status to completed
      await this.tasksService.updateStatus(taskId, TaskStatus.COMPLETED, {
        success: true,
        message: 'Task completed successfully',
        timestamp: new Date(),
      });

      this.logger.log(`Task ${taskId} completed`);
    } catch (error) {
      this.logger.error(`Task ${taskId} failed: ${error.message}`);

      await this.tasksService.updateStatus(taskId, TaskStatus.FAILED, {
        success: false,
        error: error.message,
        timestamp: new Date(),
      });
    }
  }

  private async simulateTaskExecution(task: any): Promise<void> {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would implement the actual automation logic
    // based on task.type and task.payload
    this.logger.log(`Executing ${task.type} task`);
  }
}
