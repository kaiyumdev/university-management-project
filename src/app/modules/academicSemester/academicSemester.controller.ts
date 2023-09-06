import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
// import { z } from 'zod'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    );
    res.status(200).json({
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
