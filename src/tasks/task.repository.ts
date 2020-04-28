import { Repository, EntityRepository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks({ status, search }: GetTasksFilterDTO): Promise<Task[]> {
    const q = this.createQueryBuilder('task');

    if (status) {
      q.andWhere('task.status = :status', { status });
    }

    if (search) {
      q.andWhere('task.title LIKE :search OR task.description LIKE :search', {
        search: `%${search}%`,
      });
    }

    const tasks = await q.getMany();
    return tasks;
  }

  async createTask({ title, description }: CreateTaskDTO): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    await task.save();

    return task;
  }
}
