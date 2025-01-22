import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';


@Injectable()
export class TasksService {
constructor(private prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prismaService.task.create({ data: createTaskDto });
    return task;
  }

  async findAll() : Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany();
    return tasks;
  }

  async findOne(id: number) : Promise<Task>{
    
    const task = await this.prismaService.task.findUnique({ where: { id } });

    if (!task) {
      throw new  NotFoundException("Task not found");
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) : Promise<Task> {


    try {
      const update = await this.prismaService.task.update({
        where: { id },
        data: updateTaskDto,
      });
      
      if (!update) {
        throw new  NotFoundException("Task not found");
      }
      return update;
    } catch (error) {
      throw new  NotFoundException("Task not found");
    }
    
  }

  async remove(id: number) : Promise<Task> {
    try {
      return await this.prismaService.task.delete({ where: { id } });
      
    } catch (error) {
      throw new  NotFoundException("Task not found");
    }
  }
}
