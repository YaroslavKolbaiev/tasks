import {
  Accordion, Skeleton, Text,
} from '@mantine/core';
import useGetTasks from './hooks/useGetTasks';
import Task from './components/Task';
import AddTask from './components/AddTask';

function App() {
  const { data } = useGetTasks();

  return (
    <main>
      <h1>Tasks Tracker</h1>

      <section className="task">
        {data ? (
          <Accordion
            chevronPosition="right"
            variant="contained"
          >
            {data.map(({
              title, id, status, createdAt, description, subtasks,
            }) => (
              <Task
                key={id}
                title={title}
                status={status}
                createdAt={createdAt}
                description={description}
                id={id}
                subtasks={subtasks}
              />
            ))}
          </Accordion>
        ) : (
          <Skeleton
            h={300}
            visible
          />
        )}

        {!data?.length && <Text ta="center">No tasks available. Add one</Text>}
      </section>

      <AddTask isSubtask={false} />
    </main>
  );
}

export default App;
