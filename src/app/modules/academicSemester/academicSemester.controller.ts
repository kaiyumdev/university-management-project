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

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
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
  // next();
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);
  sendResponse<IAcademicSemester | null | undefined>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'retrieved single semester successfully',
    data: result,
  });
  // next();
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);
  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated semester successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  });
});

// const deleteSemester = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await AcademicSemesterService.deleteSemester(id);
//   sendResponse<IAcademicSemester | null>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Semester deleted successfully',
//     data: result,
//   });
// });

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
