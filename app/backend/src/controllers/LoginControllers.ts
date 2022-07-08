import { Request, Response } from 'express';
import { Iservice } from '../interfaces/LoginInterfaces';

export default class LoginController {
  constructor(private service: Iservice) {
    this.service = service;
  }

  public getUsers = async (req: Request, res: Response): Promise<object> => {
    try {
      const { email, password } = req.body;
      const user = await this.service.findUser(email, password);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
    }
  };
}
