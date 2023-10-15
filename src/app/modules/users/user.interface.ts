/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

//using instance methods
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string,
//   ): Promise<boolean>;
// };

//using static methods
export type UserModel = {
  isUserExist(
    id: string,
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
