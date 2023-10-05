import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const academicSemester = {
    code: '01',
    year: '2025',
  };
  //auto generated users id
  const id = await generateStudentId(academicSemester);
  user.id = id;

  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
