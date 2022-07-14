import { IModelMatches, IserviceMatches } from '../interfaces/Matchesinterfaces';
import Matches from '../database/models/Matches';

export default class MatchesService implements IserviceMatches {
  constructor(private model: IModelMatches) {
    this.model = model;
  }

  async findMatches():Promise<Matches[]> {
    const listteams = await this.model.findMatches();
    return listteams;
  }

  async createMatches(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ):Promise<Matches> {
    const cratematches = await this.model
      .createMatches(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return cratematches;
  }

  async updatematches(matchesid: number):Promise<Matches | null> {
    const listteams = await this.model.updatematches(matchesid);
    return listteams;
  }

  async updatematchesbyId(
    idMatche: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ):Promise<boolean> {
    await this.model.updatematchesbyId(idMatche, homeTeamGoals, awayTeamGoals);
    return true;
  }
}
