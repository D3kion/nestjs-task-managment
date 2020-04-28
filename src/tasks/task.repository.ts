import { Repository, EntityRepository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask({ title, description }: CreateTaskDTO): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    await task.save();

    return task;
  }
}
