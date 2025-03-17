import { queryOptions, useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/task';

const buildTasksQueryOptions = () => queryOptions({
  queryKey: ['tasks'],
  queryFn: getTasks,
  staleTime: 1000 * 20,
});

const useGetTasks = () => {
  const { data, isLoading, error } = useQuery(buildTasksQueryOptions());

  return { data, isLoading, error };
};

export default useGetTasks;
