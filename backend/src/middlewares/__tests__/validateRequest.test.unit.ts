import { validateRequest } from '../validateRequest';
import {  req, res, next } from '../../../singleton';
import { ApiError } from '../../errors/ApiError';
import { ValidateRequest } from '../../enums';

describe('VALIDATE_REQUEST_MIDDLEWARE', () => {
    it('should throw 400 if title is not provided', async () => {
        req.body = {};

        try {
            validateRequest(req, res, next);
        } catch (error: ApiError | any) {
            expect(error.status).toBe(400);
            expect(error.message).toBe(ValidateRequest.TITLE_REQUIRED);
        }
    });
});