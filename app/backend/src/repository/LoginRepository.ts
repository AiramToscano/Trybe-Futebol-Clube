import Users from '../database/models/Users';
import { IModel } from '../interfaces/LoginInterfaces';

export default class LoginRepository implements IModel {
  constructor(private model = Users) {
    this.model = model;
  }

  async findOne(email: string, password: string):Promise<Users> {
    const listUser = await this.model.findOne({ where: { email, password } });
    return listUser as Users;
  }
}
