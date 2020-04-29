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

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`Task with ID "${id}" not found`);

    return task;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();

    return task;
  }

  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    return await this.taskRepository.remove(task);
  }
}
