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
}
