import {
  ActionIcon, Alert, Button, Modal, Image,
} from '@mantine/core';
import { useState } from 'react';
import useDeleteTask from '../hooks/useDeleteTask';

type Props = {
  id: number;
};

function DeleteTask({ id }: Props) {
  const [deleteTask, setDelete] = useState(false);
  const { mutate, isPending, error } = useDeleteTask();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => setDelete(false),
    });
  };

  return (
    <>
      <ActionIcon
        size={18}
        p={1}
        variant="default"
        aria-label="Trash Button"
        onClick={() => setDelete(true)}
      >
        <Image src="/icons8-trash-50.png" />
      </ActionIcon>

      <Modal
        opened={deleteTask}
        onClose={() => setDelete(false)}
        title="Delete Task ?"
      >

        <Button
          onClick={handleDelete}
          color="red"
          loading={isPending}
        >
          Delete
        </Button>

        <Button
          onClick={() => setDelete(false)}
          ml={10}
          disabled={isPending}
        >
          Cancel
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
      </Modal>
    </>
  );
}

export default DeleteTask;
