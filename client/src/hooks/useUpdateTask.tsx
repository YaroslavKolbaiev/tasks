import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutateTask, Task } from '../types';
import { updateTask } from '../api/task';

const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: MutateTask; id: number }) => updateTask(data, id),
    onSuccess: (data: Task | void) => {
      if (data?.parentTaskId) {
        queryClient.invalidateQueries({ queryKey: ['task', data?.parentTaskId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
    },
  });
};

export default useUpdateTask;
