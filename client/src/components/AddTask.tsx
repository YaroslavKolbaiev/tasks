import { useState } from 'react';
import {
  Alert, Button, TextInput, Modal,
} from '@mantine/core';
import { useCreateForm } from '../hooks/useForms';
import useCreateTask from '../hooks/useCreateTask';

type Props = {
  isSubtask: boolean;
  id?: number;
};

function AddTask({ isSubtask, id }: Props) {
  const { createTaskForm } = useCreateForm();
  const { mutate, isPending, error } = useCreateTask();
  const [addTask, setAddTask] = useState(false);

  const handleSubmitTask = async (values: typeof createTaskForm.values) => {
    if (createTaskForm.isValid()) {
      mutate(values, {
        onSuccess: () => {
          setAddTask(false);
        },
      });
    }
  };

  const handleSubmitSubtask = async (values: typeof createTaskForm.values) => {
    if (createTaskForm.isValid()) {
      mutate({ ...values, parentTaskId: id }, {
        onSuccess: () => {
          setAddTask(false);
        },
      });
    }
  };

  return (
    <>
      <Button
        mt={10}
        onClick={() => setAddTask(true)}
      >
        {isSubtask ? 'Add Subtask' : 'Add Task'}
      </Button>

      <Modal
        opened={addTask}
        onClose={() => setAddTask(false)}
        title="Add Task"
      >
        <form onSubmit={createTaskForm.onSubmit(
          isSubtask ? handleSubmitSubtask : handleSubmitTask,
        )}
        >
          <TextInput
            label="Title"
            placeholder="enter title"
            {...createTaskForm.getInputProps('title')}
          />

          <TextInput
            label="Description"
            placeholder="enter description"
            {...createTaskForm.getInputProps('description')}
          />

          <Button
            type="submit"
            mt={15}
            loading={isPending}
          >
            {isSubtask ? 'Add Subtask' : 'Add Task'}
          </Button>

          {error && (
          <Alert
            mt={15}
            variant="light"
            color="red"
            radius="md"
            title={error.message}
          />
          )}
        </form>
      </Modal>
    </>
  );
}

export default AddTask;
