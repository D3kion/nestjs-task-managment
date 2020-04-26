import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters({ status, search }: GetTasksFilterDTO): Task[] {
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(x => x.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        x => x.title.includes(search) || x.description.includes(search),
      );
    }

    return tasks;
  }

  createTask({ title, description }: CreateTaskDTO): Task {
    const task: Task = {
      id: uuid4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(x => x.id === id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(x => x.id !== id);
  }
}
