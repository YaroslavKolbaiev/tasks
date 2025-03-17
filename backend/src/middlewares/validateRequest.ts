import { Request, Response, NextFunction } from 'express';  
import { ApiError } from '../errors/ApiError';
import { ValidateRequest, TaskStatus } from '../enums';
import { ValidateRequest as ValidateRequestType } from '../types/task';;

export function validateRequest(req: Request<any, any, ValidateRequestType>, res: Response, next: NextFunction) {
    const { title, description, parentTaskId, status } = req.body;

    if (!title) {
        throw ApiError.BadRequest(ValidateRequest.TITLE_REQUIRED);
    }

    if (description && typeof description !== 'string') {
        throw ApiError.BadRequest(ValidateRequest.INVALID_DESCRIPTION);
    }

    if (parentTaskId && isNaN(Number(parentTaskId))) {
        throw ApiError.BadRequest(ValidateRequest.INVALID_PARENT_TASK_ID);
    }

    if (status && !Object.values(TaskStatus).includes(status)) {
        throw ApiError.BadRequest(ValidateRequest.INVALID_STATUS);
    }

    next();
}