import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
import { RequireId } from '../enums';

export function requireId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    throw ApiError.BadRequest(RequireId.ID_REQUIRED);
  }

  if (isNaN(Number(id))) {
    throw ApiError.BadRequest(RequireId.INVALID_ID);
  }

  next();
}