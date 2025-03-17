import { TaskStatus } from '../enums';

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const setColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.IN_PROGRESS:
      return 'blue';
    case TaskStatus.DONE:
      return 'green';
    default:
      return 'red';
  }
};

export { formatDate, setColor };
