import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../auth/user.entity';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(dto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(dto, user);
  }

  async createTask(dto: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(dto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!task) throw new NotFoundException(`Task with ID "${id}" not found`);

    return task;
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();

    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const task = await this.getTaskById(id, user);
    await this.taskRepository.remove(task);
  }
}
