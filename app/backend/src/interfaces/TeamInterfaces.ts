import Teams from '../database/models/Teams';

export interface IModelTeams {
  findTeams():Promise<Teams[]>
  findTeamsbyId(id:string):Promise<Teams>
}

export interface IserviceTeams {
  findTeams():Promise<Teams[]>
  findTeamsbyId(id:string):Promise<Teams>
}
