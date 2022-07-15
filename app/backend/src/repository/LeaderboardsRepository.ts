import * as Sequelize from 'sequelize';
import Matches from '../database/models/Matches';
import Team from '../database/models/Teams';

export default class LeaderboardsRepository {
  constructor(private model = Matches) {
    this.model = model;
  }

  async findmatchesall():Promise<Matches[]> {
    const findmatches = await this.model.findAll({
      where: { inProgress: false },
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
