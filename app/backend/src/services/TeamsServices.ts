import { IModelTeams, IserviceTeams } from '../interfaces/TeamInterfaces';
import Teams from '../database/models/Teams';

export default class TeamsServices implements IserviceTeams {
  constructor(private model: IModelTeams) {
    this.model = model;
  }

  async findTeams():Promise<Teams[]> {
    const listteams = await this.model.findTeams();
    return listteams;
  }

  async findTeamsbyId(id:string):Promise<Teams | boolean> {
    const listteam = await this.model.findTeamsbyId(id);
    if (listteam === null) return false;
    return listteam;
  }
}
