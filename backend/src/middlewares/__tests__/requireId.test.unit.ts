import { requireId } from '../requireId';
import {  req, res, next } from '../../../singleton';
import { ApiError } from '../../errors/ApiError';
import { RequireId } from '../../enums';

describe('REQUIRE_ID_MIDDLEWARE', () => {
    it('should throw 400 if id is not provided', async () => {
        req.params = {};
    
        try {
            requireId(req, res, next);
        } catch (error: ApiError | any) {
            expect(error.status).toBe(400);
            expect(error.message).toBe(RequireId.ID_REQUIRED);
        }
    });

    it('should throw 400 if id is invalid', async () => {
        req.params = { id: 'invalid' };
    
        try {
            requireId(req, res, next);
        } catch (error: ApiError | any) {
            expect(error.status).toBe(400);
            expect(error.message).toBe(RequireId.INVALID_ID);
        }
    });
});