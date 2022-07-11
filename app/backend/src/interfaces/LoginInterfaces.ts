import Users from '../database/models/Users';

export interface IModel {
  findOne(email: string):Promise<Users>
}

export interface Iservice {
  findUser(email: string, password: string):Promise<string | boolean>
}

export interface Ijwt {
  createJwt(email: string):Promise<string>
}
