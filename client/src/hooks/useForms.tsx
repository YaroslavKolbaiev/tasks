import { useForm, zodResolver } from '@mantine/form';
import { CreateTaskForm } from '../types';
import { TaskStatus } from '../enums';
import { createTaskFormSchema } from '../schema/task';

const useCreateForm = () => {
  const createTaskForm = useForm<CreateTaskForm>({
    initialValues: {
      title: '',
      description: '',
      status: TaskStatus.TODO,
    },
    validate: zodResolver(createTaskFormSchema),
  });

  return { createTaskForm };
};

const useUpdateForm = ({ title, description, status }: CreateTaskForm) => {
  const updateTaskForm = useForm<CreateTaskForm>({
    initialValues: {
      title,
      description,
      status,
    },
    validate: zodResolver(createTaskFormSchema),
  });

  return { updateTaskForm };
};

export { useCreateForm, useUpdateForm };
