import { IModelMatchesLeaderboards,
  Matchestimes } from '../interfaces/LeaderboardsRepositoryInterface';
import { IModelTeams } from '../interfaces/TeamInterfaces';

export default class LeaderboardsService {
  constructor(
    private model: IModelMatchesLeaderboards,
    private modeltimes: IModelTeams,
  ) {
    this.model = model;
    this.modeltimes = modeltimes;
  }

  async findmatchesall():Promise<Array<Matchestimes>> {
    const listteams = await this.model.findmatchesall();
    const teams = await this.modeltimes.findTeams();
    const matches = this.returnMatches(teams, listteams);
    return matches;
  }

  returnMatches = (Teams: Array<any>, ListTeam: Array<any>) => {
    const hometimes: Array<Matchestimes> = [];
    Teams.forEach((teams) => {
      ListTeam.forEach((e) => {
        if (teams.id === e.homeTeam) {
          hometimes.push({
            name: teams.teamName,
            goalsFavor: e.homeTeamGoals,
            goalsOwn: e.awayTeamGoals,
            totalVictories: e.homeTeamGoals > e.awayTeamGoals ? +1 : 0,
            totalLosses: e.homeTeamGoals < e.awayTeamGoals ? +1 : 0,
            totalDraws: e.homeTeamGoals === e.awayTeamGoals ? +1 : 0,
          });
        }
      });
    });
    return hometimes;
  };
}
