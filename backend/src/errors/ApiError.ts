export class ApiError extends Error {
    status: number;
    errors: {};
    constructor(
        status: number, 
        message: string, 
        errors = {},
    ) {
      super(message);
  
      this.status = status;
      this.errors = errors;
    }
  
    static BadRequest(message: string, errors: {} = {}) {
      return new ApiError(400, message, errors)
    }
  
    static NotFound() {
      return new ApiError(404, 'Not found')
    }
  }