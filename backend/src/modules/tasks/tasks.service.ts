import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectQueue('tasks')
    private tasksQueue: Queue,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId,
    });

    const savedTask = await this.tasksRepository.save(task);

    // Add to queue for processing
    await this.tasksQueue.add('process-task', {
      taskId: savedTask.id,
    });

    return savedTask;
  }

  async findAll(userId: string, filters?: any): Promise<Task[]> {
    const query: any = { userId };
    
    if (filters?.accountId) {
      query.accountId = filters.accountId;
    }
    
    if (filters?.campaignId) {
      query.campaignId = filters.campaignId;
    }
    
    if (filters?.status) {
      query.status = filters.status;
    }

    return this.tasksRepository.find({
      where: query,
      order: { createdAt: 'DESC' },
      take: filters?.limit || 100,
    });
  }

  async findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async updateStatus(id: string, status: TaskStatus, result?: any): Promise<void> {
    const updateData: any = { status };
    
    if (status === TaskStatus.PROCESSING) {
      updateData.startedAt = new Date();
    } else if (status === TaskStatus.COMPLETED || status === TaskStatus.FAILED) {
      updateData.completedAt = new Date();
      if (result) {
        updateData.result = result;
      }
    }

    await this.tasksRepository.update(id, updateData);
  }

  async getStatistics(userId: string): Promise<any> {
    const tasks = await this.findAll(userId);

    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === TaskStatus.PENDING).length,
      processing: tasks.filter((t) => t.status === TaskStatus.PROCESSING).length,
      completed: tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
      failed: tasks.filter((t) => t.status === TaskStatus.FAILED).length,
    };
  }
}
