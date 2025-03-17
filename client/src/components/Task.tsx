import {
  Accordion,
  Text,
  Group,
} from '@mantine/core';
import { useState } from 'react';
import { formatDate } from '../utils';
import { Task as TaskInterface } from '../types';
import { TaskStatus } from '../enums';
import AccordionMenu from './AccordionMenu';
import useGetTask from '../hooks/useGetTask';
import AddTask from './AddTask';
import TitleBlock from './UpdateTask';
import DeleteTask from './DeleteTask';

type Props = {
  title: string;
  status: TaskStatus;
  createdAt: Date;
  description: string | undefined;
  id: number;
  subtasks?: TaskInterface[];
};

function Task({
  title, status, createdAt, id, description,
}: Props) {
  const [openSubtasks, setOpenSubtasks] = useState(false);
  const { data } = useGetTask(id);

  return (
    <Accordion.Item
      value={title}
      onClick={() => setOpenSubtasks(true)}
    >

      <Group justify="space-between">
        <AccordionMenu
          status={status}
          title={title}
          description={description}
          taskId={id}
        />

        <span>
          <Accordion.Control p={5} />
        </span>
      </Group>

      <TitleBlock
        title={title}
        status={status}
        description={description}
        id={id}
        isTitle
      />

      <Group
        pl={16}
      >

        <Text
          size="sm"
          c="dimmed"
          fw={400}
        >
          {formatDate(createdAt.toString())}
        </Text>

        <DeleteTask id={id} />
      </Group>

      <Accordion.Panel>
        <TitleBlock
          title={title}
          status={status}
          description={description}
          id={id}
          isTitle={false}
        />

        <AddTask
          isSubtask
          id={id}
        />

        <Text
          mt={10}
          c="blue"
        >
          Subtasks:
        </Text>

        {openSubtasks && (
          data?.subtasks?.map(({
            title: subtaskTitle,
            status: subtaskStatus,
            createdAt: subtaskCreatedAt,
            description: subtaskDescription,
            id: subtaskId,
            subtasks: subtaskSubtasks,
          }) => (
            <Accordion
              chevronPosition="right"
              variant="contained"
              key={subtaskId}
            >
              <Task
                id={subtaskId}
                title={subtaskTitle}
                status={subtaskStatus}
                createdAt={subtaskCreatedAt}
                description={subtaskDescription}
                subtasks={subtaskSubtasks}
              />
            </Accordion>
          ))
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default Task;
