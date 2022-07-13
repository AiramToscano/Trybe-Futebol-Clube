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
}
