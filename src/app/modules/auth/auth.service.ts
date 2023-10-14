import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const user = new User();
  const isUserExist = await user.isUserExist(id);

  //another way to solve
  //   const isUserExist = await User.findOne(
  //     { id },
  //     { id: 1, password: 1, needsPasswordChange: 1 },
  //   ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //Matched password
  //   const isPasswordMatched = await bcrypt.compare(
  //     password,
  //     isUserExist?.password,
  //   );
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }
  return {};
};

export const AuthService = {
  loginUser,
};
