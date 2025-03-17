import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../api/task';
import { Task } from '../types';

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: (data: Task | void) => {
      if (data?.parentTaskId) {
        queryClient.invalidateQueries({ queryKey: ['task', data?.parentTaskId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
    },
  });
};

export default useDeleteTask;
