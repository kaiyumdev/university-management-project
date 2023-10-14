/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import { hash } from 'bcrypt';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.methods.isUserExist = async function (
  id: string,
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 },
  );

  return user;
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  const matched = await bcrypt.compare(givenPassword, savedPassword);
  return matched;
};

//User.create() | user.save()
userSchema.pre('save', async function (next) {
  //hashing user password
  const user = this;

  user.password = await hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
