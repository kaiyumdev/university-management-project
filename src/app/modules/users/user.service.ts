import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
// import { AcademicSemester } from '../academicSemester/academicSemesterModel';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generate studentId
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    //set student -> id into to user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user -> student -> academicSemester, academicDepartment, academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
  // const createdUser = await User.create(user);
  // if (!createdUser) {
  //   throw new ApiError(400, 'Failed to create user');
  // }
  // return createdUser;
};

export const UserService = {
  createStudent,
};
