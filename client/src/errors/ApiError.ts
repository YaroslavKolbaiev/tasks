import { AxiosError } from 'axios';

class ApiErrorHandler extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.status = status;
    this.name = 'ApiErrorHandler';
  }

  static handle(error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiErrorHandler(
        error.response.data.message,
        error.response.status,
      );
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export { ApiErrorHandler };
