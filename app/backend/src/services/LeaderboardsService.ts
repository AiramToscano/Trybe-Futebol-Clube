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

  async findmatchesall(routes: string):Promise<Array<Matchestimes>> {
    const listteams = await this.model.findmatchesall();
    const teams = await this.modeltimes.findTeams();
    if (routes === 'home') {
      const matchesHome = this.returnMatchesHome(teams, listteams);
      return matchesHome;
    }
    if (routes === 'away') {
      const matchesAway = this.returnMatchesAway(teams, listteams);
      return matchesAway;
    }
    const matchesHome = this.returnMatchesHome(teams, listteams);
    const matchesAway = this.returnMatchesAway(teams, listteams);
    const matchesAll = [...matchesHome, ...matchesAway];
    return matchesAll;
  }

  returnMatchesHome = (Teams: Array<any>, ListTeam: Array<any>) => {
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

  returnMatchesAway = (Teams: Array<any>, ListTeam: Array<any>) => {
    const awaytimes: Array<Matchestimes> = [];
    Teams.forEach((teams) => {
      ListTeam.forEach((e) => {
        if (teams.id === e.awayTeam) {
          awaytimes.push({
            name: teams.teamName,
            goalsFavor: e.awayTeamGoals,
            goalsOwn: e.homeTeamGoals,
            totalVictories: e.awayTeamGoals > e.homeTeamGoals ? +1 : 0,
            totalLosses: e.awayTeamGoals < e.homeTeamGoals ? +1 : 0,
            totalDraws: e.homeTeamGoals === e.awayTeamGoals ? +1 : 0,
          });
        }
      });
    });
    return awaytimes;
  };
}
