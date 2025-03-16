import { Request, Response } from 'express';
import prisma from '../../client';
import { ApiError } from '../errors/ApiError';
import { ValidateRequest } from '../types/task';

async function getTasks(req: Request, res: Response) {
  const tasks = await prisma.task.findMany({
    where: {parentTaskId: null},
    include: {subtasks: true}
  });


  res.status(200).json(tasks);
}

async function getTask(req: Request, res: Response) {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: {id: Number(id)},
    include: {subtasks: true}
  });

  if (!task) {
    throw ApiError.NotFound();
  }

  res.status(200).json(task);
}

async function createTask(req: Request<any, any, ValidateRequest>, res: Response) {
  const { title, description } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      description,
    }
  });

  res.status(201).json(task);
}

async function createSubTask(req: Request<any, any, ValidateRequest>, res: Response) {
  const { title, description, parentTaskId } = req.body;

  if (!parentTaskId) {
    throw ApiError.BadRequest('Parent task id is required to create a subtask');
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      parentTaskId: Number(parentTaskId)
    }
  });

  res.status(201).json(task);
}

async function updateTask(req: Request<any, any, ValidateRequest>, res: Response) {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await prisma.task.update({
    where: {id: Number(id)},
    data: {
      title,
      description,
      status
    }
  });

  res.status(200).json(task);
}

async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  await prisma.task.delete({
    where: {id: Number(id)}
  });

  res.status(204).end();
}

export const taskController = {
  getTasks,
  getTask,
  createTask,
  createSubTask,
  updateTask,
  deleteTask
};
