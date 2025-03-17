import { queryOptions, useQuery } from '@tanstack/react-query';
import { getTask } from '../api/task';

const buildTaskQueryOptions = (taskId: number) => queryOptions({
  queryKey: ['task', taskId],
  queryFn: () => getTask(taskId),
  staleTime: 1000 * 20,
});

const useGetTask = (taskId: number) => {
  const {
    data, isLoading, error, refetch,
  } = useQuery(buildTaskQueryOptions(taskId));

  return {
    data, isLoading, error, refetch,
  };
};

export default useGetTask;
