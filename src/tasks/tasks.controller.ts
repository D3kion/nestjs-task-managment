import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[] {
  //   return Object.keys(filterDTO).length
  //     ? this.tasksService.getTasksWithFilters(filterDTO)
  //     : this.tasksService.getAllTasks();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() dto: CreateTaskDTO) {
    return this.tasksService.createTask(dto);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  // @Patch(':id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete(':id')
  @HttpCode(204)
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
