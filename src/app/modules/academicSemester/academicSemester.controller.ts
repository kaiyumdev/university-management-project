import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
// import { z } from 'zod'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    );
    next();
    res.status(200).json({
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });
  },
);
export const AcademicSemesterController = {
  createSemester,
};
