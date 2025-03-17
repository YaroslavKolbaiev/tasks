import {
  TextInput, Text, Button, Textarea,
  ActionIcon, Image,
} from '@mantine/core';
import { useState } from 'react';
import { useUpdateForm } from '../hooks/useForms';
import { MutateTask } from '../types';
import useUpdateTask from '../hooks/useUpdateTask';

type Props = MutateTask & {
  id: number;
  isTitle: boolean;
};

function TitleBlock({
  title, description, status, id, isTitle,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTaskForm } = useUpdateForm({ title, description, status });
  const { mutate, isPending } = useUpdateTask();

  const handleUpdateTitle = async (values: typeof updateTaskForm.values) => {
    if (updateTaskForm.isValid()) {
      mutate({
        data: {
          status,
          description,
          title: values.title,
        },
        id,
      }, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
    }
  };

  const handleUpdateDescription = async (values: typeof updateTaskForm.values) => {
    if (updateTaskForm.isValid()) {
      mutate({
        data: {
          status,
          description: values.description,
          title,
        },
        id,
      }, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
    }
  };
  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={updateTaskForm.onSubmit(
            isTitle ? handleUpdateTitle : handleUpdateDescription,
          )}
        >
          <Button
            color="red"
            size="compact-xs"
            mr={5}
            disabled={isPending}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Close
          </Button>

          <Button
            type="submit"
            color="green"
            size="compact-xs"
            loading={isPending}
          >
            Save
          </Button>

          {isTitle ? (
            <TextInput
              disabled={isPending}
              placeholder="edit title"
              {...updateTaskForm.getInputProps('title')}
            />
          ) : (
            <Textarea
              disabled={isPending}
              placeholder="edit description"
              {...updateTaskForm.getInputProps('description')}
            />
          )}
        </form>
      ) : (
        <Text
          px={isTitle ? 16 : 0}
          size={isTitle ? 'lg' : 'sm'}
        >
          {isTitle ? title : description}

          <ActionIcon
            size={16}
            variant="default"
            aria-label="Pencil Button"
            ml={5}
            onClick={() => setIsEditing(true)}
          >
            <Image src="/icons8-pencil-50.png" />
          </ActionIcon>
        </Text>
      )}
    </div>
  );
}

export default TitleBlock;
