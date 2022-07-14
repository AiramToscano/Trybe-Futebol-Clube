import { IModelMatches, IserviceMatches } from '../interfaces/Matchesinterfaces';
import Matches from '../database/models/Matches';

export default class MatchesService implements IserviceMatches {
  constructor(private model: IModelMatches) {
    this.model = model;
  }

  async findmatchesall():Promise<Matches[]> {
    const listteams = await this.model.findmatchesall();
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

  async updatematchesInProgress(matchesid: number):Promise<boolean> {
    await this.model.updatematchesInProgress(matchesid);
    return true;
  }

  async findmatches(matchesid:number):Promise<boolean> {
    const Findmatches = await this.model.findmatches(matchesid);
    if (!Findmatches) return false;
    return true;
  }

  async updatematchesScore(
    idMatche: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ):Promise<boolean> {
    await this.model.updatematchesScore(idMatche, homeTeamGoals, awayTeamGoals);
    return true;
  }
}
