import { Router } from 'express';
import LoginController from '../controllers/LoginControllers';
import Loginservices from '../services/LoginService';
import LoginRepository from '../repository/LoginRepository';
import ValidatorLogin from '../utils/ValidatorLogin';

const LoginRoute = Router();
const LoginValidade = new ValidatorLogin(new Loginservices(new LoginRepository()));
const Logincontroller = new LoginController(new Loginservices(new LoginRepository()));

LoginRoute.post(
  '/login',
  ValidatorLogin.validatEmail,
  LoginValidade.validaPassword,
  Logincontroller.getUsers,
);

export default LoginRoute;
