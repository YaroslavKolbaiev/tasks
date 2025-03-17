import { Request, Response, NextFunction } from 'express';

type ActionType = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void | Promise<void>;

export function catchError(action: ActionType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await action(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  }