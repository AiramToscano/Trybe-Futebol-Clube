import { Router } from 'express';
import LoginController from '../controllers/LoginControllers';
import Loginservices from '../services/LoginService';
import LoginRepository from '../repository/LoginRepository';
import validatorLogin from '../utils/ValidatorLogin';

const LoginRoute = Router();

const Logincontroller = new LoginController(new Loginservices(new LoginRepository()));

LoginRoute.post(
  '/login',
  validatorLogin.validatEmail,
  validatorLogin.validaPassword,
  Logincontroller.getUsers,
);

export default LoginRoute;
