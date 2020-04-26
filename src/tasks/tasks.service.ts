import { Injectable, Req } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
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

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(x => x.id !== id);
  }
}
