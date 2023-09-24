import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';
// import { z } from 'zod'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    try {
      const result = await AcademicSemesterService.createSemester(
        academicSemesterData,
      );
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester created successfully',
        data: result,
      });
      next();
    } catch (error) {
      next(error);
    }
  },
);
//   async (req: Request, res: Response, next: NextFunction) => {
//     const filters = pick(req.query, academicSemesterFilterableFields);
//     const paginationOptions = pick(req.query, paginationFields);

//     // ...

//     const result = await AcademicSemesterService.getAllSemesters(
//       filters,
//       paginationOptions,
//     );
//     sendResponse<IAcademicSemester[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semesters retrieved successfully',
//       meta: result.meta,
//       data: result.data,
//     });
//     next();
//   },
// );

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    // ...

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions,
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

// Remove next() call in getSingleSemester as well

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = AcademicSemesterService.getSingleSemester(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'retrieved single semester successfully',
      data: result,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
