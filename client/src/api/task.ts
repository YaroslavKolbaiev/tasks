import { ApiErrorHandler } from '../errors/ApiError';
import { httpClient } from '../http';
import { MutateTask, Task } from '../types';

const getTasks = async () => {
  try {
    const response = await httpClient<Task[]>({
      method: 'GET',
      url: '/',
    });

    return response.data;
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
};

const getTask = async (id: number) => {
  try {
    const response = await httpClient<Task>({
      method: 'GET',
      url: `/task/${id}`,
    });

    return response.data;
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
};

const createTask = async (data: MutateTask) => {
  try {
    const response = await httpClient<Task>({
      method: 'POST',
      url: data.parentTaskId ? '/subtask' : '/task',
      data,
    });

    return response.data;
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
};

const updateTask = async (data: MutateTask, id: number) => {
  try {
    const response = await httpClient<Task>({
      method: 'PUT',
      url: `/task/${id}`,
      data,
    });

    return response.data;
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
};

const deleteTask = async (id: number) => {
  try {
    const response = await httpClient<Task>({
      method: 'DELETE',
      url: `/task/${id}`,
    });

    return response.data;
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
};

export {
  getTasks, getTask, updateTask, createTask, deleteTask,
};
