import * as bcrypt from 'bcryptjs';
import { IModel, Iservice } from '../interfaces/LoginInterfaces';

export default class LoginService implements Iservice {
  constructor(private model: IModel) {
    this.model = model;
  }

  async findUser(email: string, password: string):Promise<boolean> {
    const listUser = await this.model.findOne(email);
    const validPassword = bcrypt.compareSync(password, listUser.password);
    if (validPassword) return true;
    return false;
  }
}
