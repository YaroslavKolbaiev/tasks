import { Button, Menu } from '@mantine/core';
import { TaskStatus } from '../enums';
import { setColor } from '../utils';
import useUpdateTask from '../hooks/useUpdateTask';

type Props = {
  status: TaskStatus,
  title: string,
  description: string | undefined,
  taskId: number,
};

function AccordionMenu({
  status, title, description, taskId,
}: Props) {
  const { mutate, isPending } = useUpdateTask();

  const handleStatusChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    mutate({
      data: {
        status: e.currentTarget.value as TaskStatus,
        title,
        description,
      },
      id: taskId,
    });
  };
  return (
    <Menu
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Button
          size="compact-xs"
          color={setColor(status)}
          type="button"
          loading={isPending}
          ml={16}
        >
          {status === TaskStatus.IN_PROGRESS ? 'in progress' : status}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          value={TaskStatus.IN_PROGRESS}
          onClick={handleStatusChange}
          disabled={status === TaskStatus.IN_PROGRESS}
        >
          Mark as in progress
        </Menu.Item>

        <Menu.Item
          value={TaskStatus.DONE}
          onClick={handleStatusChange}
          disabled={status === TaskStatus.DONE}
        >
          Mark as done
        </Menu.Item>

        <Menu.Item
          value={TaskStatus.TODO}
          onClick={handleStatusChange}
          disabled={status === TaskStatus.TODO}
        >
          Mark as to do
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default AccordionMenu;
