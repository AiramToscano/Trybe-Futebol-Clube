import { sign, SignOptions } from 'jsonwebtoken';
import { IModel } from '../interfaces/LoginInterfaces';

export default class CreateJWT {
  constructor(private model: IModel) {
    this.model = model;
  }

  async createJwt(email: string) {
    const listUser = await this.model.findOne(email);
    const secret = String(process.env.JWT_SECRET)
    const signInOptions: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '1h',
    };
    const payload = {
      name: listUser.email,
    };
    return sign(payload, secret, signInOptions);
  }
}
