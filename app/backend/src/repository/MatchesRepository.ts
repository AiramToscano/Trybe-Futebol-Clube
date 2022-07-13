import * as Sequelize from 'sequelize';
import Matches from '../database/models/Matches';
import Team from '../database/models/Teams';
import { IModelMatches } from '../interfaces/Matchesinterfaces';

export default class MatchesRepository implements IModelMatches {
  constructor(private model = Matches) {
    this.model = model;
  }

  async findMatches():Promise<Matches[]> {
    const findmatches = await this.model.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: [['team_Name', 'teamName']],
        where: { homeTeam: Sequelize.col('teamHome.id') },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: [['team_Name', 'teamName']],
        where: { awayTeam: Sequelize.col('teamAway.id') },
      }],
    });
    return findmatches as Matches[];
  }

  async createMatches(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ):Promise<Matches> {
    const creatematches = await this.model.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return creatematches as Matches;
  }
}
