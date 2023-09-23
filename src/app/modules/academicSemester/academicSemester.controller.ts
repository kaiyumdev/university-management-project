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

// const createSemester = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { ...academicSemesterData } = req.body;
//     const result = await AcademicSemesterService.createSemester(
//       academicSemesterData,
//     );
//     // res.status(200).json({
//     //   success: true,
//     //   message: 'Academic semester is created successfully',
//     //   data: result,
//     // });
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic Semester created successfully',
//       data: result,
//     });
//     next();
//   },
// );

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
    } catch (error) {
      next(error);
    }
  },
);

// const getAllSemesters = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const filters = pick(req.query, academicSemesterFilterableFields);
//     const paginationOptions = pick(req.query, paginationFields);

//     console.log(filters);

//     // const paginationOptions = {
//     //   page: Number(req.query.page),
//     //   limit: Number(req.query.limit),
//     //   sortBy: Number(req.query.sortBy),
//     //   sortOrder: Number(req.query.sortOrder),
//     // };

//     console.log(paginationOptions);

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

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
