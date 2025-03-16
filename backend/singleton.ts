import { PrismaClient, Task } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { Request, Response, NextFunction } from 'express'

if(process.env.TEST_TYPE === 'unit') {
  jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  }))

  beforeEach(() => {
    mockReset(prismaMock);
    req = mockRequest();
    res = mockResponse();
    next = nextFunction();
  });
}

import prisma from './client'


const mockRequest = () => {
  return {} as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const nextFunction = jest.fn();

let req: Request;
let res: Response;
let next: NextFunction;


const task: Task = {
  id: 1,
  title: 'Task 1',
  description: 'Description 1',
  parentTaskId: null,
  status: 'todo',
  createdAt: new Date(),
};

const tasks: Task[] = Array(3).map((_, i) => {
  return {
      id: i + 1,
      title: `Task ${i + 1}`,
      description: `Description ${i + 1}`,
      parentTaskId: null,
      status: 'todo',
      createdAt: new Date(),
  };
});

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

export { 
  req, 
  res, 
  prismaMock, 
  task, 
  tasks, 
  next 
}