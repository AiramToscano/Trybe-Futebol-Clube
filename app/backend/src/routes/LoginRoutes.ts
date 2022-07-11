import { Router } from 'express';
import LoginController from '../controllers/LoginControllers';
import Loginservices from '../services/LoginService';
import LoginRepository from '../repository/LoginRepository';
import ValidatorLogin from '../utils/ValidatorLogin';
import CreateJWT from '../utils/CreateJwt';

const LoginRoute = Router();
const LoginValidade = new ValidatorLogin(new Loginservices(new LoginRepository()));
const Logincontroller = new LoginController(
  new Loginservices(new LoginRepository()),
  new CreateJWT(new LoginRepository()),
);

LoginRoute.post(
  '/login',
  LoginValidade.validatEmail,
  LoginValidade.validaPassword,
  Logincontroller.AuthUser,
);

export default LoginRoute;
