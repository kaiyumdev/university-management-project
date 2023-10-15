/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
