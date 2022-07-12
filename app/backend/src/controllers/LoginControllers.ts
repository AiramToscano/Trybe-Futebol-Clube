import { Request, Response } from 'express';
import { Iservice, Ijwt } from '../interfaces/LoginInterfaces';

export default class LoginController {
  constructor(private service: Iservice, private jwt: Ijwt) {
    this.service = service;
  }

  public AuthUser = async (req: Request, res: Response): Promise<object> => {
    try {
      const { email } = req.body;
      const createjwt = await this.jwt.createJwt(email);
      return res.status(200).json({ token: createjwt });
    } catch (err) {
      return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
    }
  };

  public AuthToken = async (req: Request, res: Response): Promise<object> => {
    try {
      const { authorization } = req.headers;
      const user = await this.jwt.validJwt(authorization);
      if(!user) return res.status(400).json({ message: 'Token expired or invalid'})
      return res.status(200).json({ role: user });
    } catch (err) {
      return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
    }
  };
}
