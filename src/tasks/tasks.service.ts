import { Injectable, NotFoundException } from '@nestjs/common';

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

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters({ status, search }: GetTasksFilterDTO): Task[] {
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(x => x.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       x => x.title.includes(search) || x.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(dto);
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
