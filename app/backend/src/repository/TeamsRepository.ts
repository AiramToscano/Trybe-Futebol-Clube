import Teams from '../database/models/Teams';
import { IModelTeams } from '../interfaces/TeamInterfaces';

export default class TeamsRepository implements IModelTeams {
  constructor(private model = Teams) {
    this.model = model;
  }

  async findTeams():Promise<Teams[]> {
    const findteams = await this.model.findAll({
      attributes: ['id', ['team_Name', 'teamName']],
    });
    return findteams as Teams[];
  }

  async findTeamsbyId(teamid:string):Promise<Teams> {
    const team = await this.model.findOne({
      attributes: ['id', ['team_Name', 'teamName']],
      where: { id: teamid } });
    return team as Teams;
  }
}
