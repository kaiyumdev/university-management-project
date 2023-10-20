/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
// import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { JwtPayload, Secret } from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

//loginUser setUp
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

//verify token validity
let verifyToken = null;
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  try {
    verifyToken = await jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret,
    );
    console.log(verifyToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { userId } = verifyToken;
  //checking deleted user's refresh token
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new access token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

//change password to new password
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword } = payload;

  // const { oldPassword, newPassword } = payload;

  //checking is ser exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way to check change password
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password',
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  // //hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds as string),
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(),
  // };

  // //update password
  // await User.findOneAndUpdate(query, updatedData);

  isUserExist.needsPasswordChange = false;
  //updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
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
