import { NextFunction, Response, Request } from 'express';
import * as Joi from 'joi';

export default class ValidatorLogin {
  static validatEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const emailValid = Joi.object().keys({
      email: Joi.string().email(),
    });
    const validEmail = emailValid.validate({ email });
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (validEmail.error) return res.status(400).json({ message: 'Incorrect email or password' });
    next();
  };

  static validaPassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
