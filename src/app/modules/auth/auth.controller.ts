/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
});

export const AuthController = {
  loginUser,
};
