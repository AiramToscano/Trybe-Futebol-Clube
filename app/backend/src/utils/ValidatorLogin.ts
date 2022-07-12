import { NextFunction, Response, Request } from 'express';
import * as Joi from 'joi';
import { Iservice } from '../interfaces/LoginInterfaces';

export default class ValidatorLogin {
  constructor(private service: Iservice) {
    this.service = service;
  }

  validEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const emailValid = Joi.object().keys({
      email: Joi.string().email(),
    });
    const validEmail = emailValid.validate({ email });
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (validEmail.error) return res.status(401).json({ message: 'Incorrect email or password' });
    next();
  };

  validPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const user = await this.service.findUser(email, password);
    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
    next();
  };
}
