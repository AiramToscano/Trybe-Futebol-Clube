import * as Sequelize from 'sequelize';
import Matches from '../database/models/Matches';
import Team from '../database/models/Teams';
import { IModelMatches } from '../interfaces/Matchesinterfaces';

export default class MatchesRepository implements IModelMatches {
  constructor(private model = Matches) {
    this.model = model;
  }

  async findmatchesall():Promise<Matches[]> {
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

  async updatematchesInProgress(matchesid:number):Promise<boolean> {
    await this.model.update(
      {
        inProgress: false,
      },
      {
        where: { id: matchesid },
      },
    );
    return true;
  }

  async findmatches(matchesid:number):Promise<boolean> {
    const Findmatches = await this.model.findOne({
      where: { id: matchesid } });
    if (Findmatches === null) {
      return false;
    }
    return true;
  }

  async updatematchesScore(
    matchesid: number,
    homeTeamGoals:number,
    awayTeamGoals: number,
  ):Promise<boolean> {
    await this.model.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id: matchesid },
      },
    );
    return true;
  }
}
