import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
// import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //creating instance of user
  // const user = new User();
  // const isUserExist = await user.isUserExist(id)

  //applying static methods
  const isUserExist = await User.isUserExist(id);

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
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  //create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as string,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_token as string,
    config.jwt.refresh_expires_in as string,
  );

  return { accessToken, refreshToken, needsPasswordChange };
};

export const AuthService = {
  loginUser,
};

//create access token & refresh token
// const accessToken = jwt.sign(
//   {
//     id: isUserExist?.id,
//     role: isUserExist.role,
//   },
//   config.jwt.secret as Secret,
//   {
//     expiresIn: config.jwt.expires_in,
//   },
// );

// const refreshToken = jwt.sign(
//   {
//     id: isUserExist?.id,
//     role: isUserExist.role,
//   },
//   config.jwt.refresh_token as Secret,
//   {
//     expiresIn: config.jwt.refresh_expires_in,
//   },
// );
