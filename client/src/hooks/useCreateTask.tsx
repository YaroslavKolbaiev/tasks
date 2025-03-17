import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutateTask, Task } from '../types';
import { createTask } from '../api/task';

const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MutateTask) => createTask(data),
    onSuccess: (data: Task | void) => {
      if (data?.parentTaskId) {
        queryClient.invalidateQueries({ queryKey: ['task', data?.parentTaskId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
    },
  });
};

export default useCreateTask;
