import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

//create login
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);

//create refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
);

//change password
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  AuthController.changePassword,
);
// router.get('/', AdminController.getAllAdmins);

// router.delete('/:id', AdminController.deleteAdmin);

// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdmin),
//   AdminController.updateAdmin,
// );

export const AuthRoutes = router;
