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
      attributes: ['id', ['home_Team', 'homeTeam'], ['home_Team_Goals', 'homeTeamGoals'],
        ['away_Team', 'awayTeam'], ['away_Team_Goals',
          'awayTeamGoals'], ['in_Progress', 'inProgress']],
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
}
