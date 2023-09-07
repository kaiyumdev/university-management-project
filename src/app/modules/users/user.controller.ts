import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
// import { z } from 'zod'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    next();
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  },
);
export const UserController = { createUser };
