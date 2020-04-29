import { Repository, EntityRepository } from 'typeorm';

import { User } from '../auth/user.entity';

import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(
    { status, search }: GetTasksFilterDTO,
    user: User,
  ): Promise<Task[]> {
    const q = this.createQueryBuilder('task');

    q.where('task.userId = :userId', { userId: user.id });
    if (status) q.andWhere('task.status = :status', { status });
    if (search)
      q.andWhere('task.title LIKE :search OR task.description LIKE :search', {
        search: `%${search}%`,
      });

    const tasks = await q.getMany();
    return tasks;
  }

  async createTask(
    { title, description }: CreateTaskDTO,
    user: User,
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }
}
