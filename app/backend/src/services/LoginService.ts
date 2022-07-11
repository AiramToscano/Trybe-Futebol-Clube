import * as bcrypt from 'bcryptjs';
import { IModel, Iservice } from '../interfaces/LoginInterfaces';
import Users from '../database/models/Users';

export default class LoginService implements Iservice {
  constructor(private model: IModel) {
    this.model = model;
  }

  async findUser(email: string, password: string):Promise<Users | boolean> {
    const listUser = await this.model.findOne(email);
    const validPassword = bcrypt.compareSync(password, listUser.password);
    if (validPassword) return listUser;
    return false;
  }
}
