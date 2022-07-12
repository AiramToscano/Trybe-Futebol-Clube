import { sign, SignOptions, decode } from 'jsonwebtoken';
import { IModel, JwtPayloadHandler } from '../interfaces/LoginInterfaces';

export default class CreateJWT {
  constructor(private model: IModel) {
    this.model = model;
  }

  async createJwt(email: string) {
    const listUser = await this.model.findOne(email);
    const secret = String(process.env.JWT_SECRET);
    const signInOptions: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '1h',
    };
    const payload = {
      name: listUser.email,
    };
    return sign(payload, secret, signInOptions);
  }

  async validJwt(token: string) {
    const validToken = decode(token);
    if (validToken != null) {
      const { name } = validToken as JwtPayloadHandler;
      const listUser = await this.model.findOne(name);
      return listUser.role;
    }
    return false;
  }
}
