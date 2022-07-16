import { IserviceMatchesLeaderboards,
  MatchestimesOk } from '../interfaces/LeaderboardsRepositoryInterface';
import { IModelTeams } from '../interfaces/TeamInterfaces';

export default class getTeams {
  constructor(
    private service: IserviceMatchesLeaderboards,
    private modeltimes: IModelTeams,
  ) {
    this.service = service;
    this.modeltimes = modeltimes;
  }

  async getteams(routes: string):Promise<Array<object>> {
    const teams = await this.modeltimes.findTeams();
    const litsteams = await this.service.findmatchesall(routes);
    const matches = this.returnMatches(teams, litsteams);
    const teste = matches.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      return 0;
    });
    return teste;
  }

  returnMatches = (Teams: Array<any>, ListTeam: Array<any>) => {
    const teamsClassific: Array<MatchestimesOk> = [];
    Teams.forEach((e) => {
      const teste = ListTeam.filter((elist) => e.teamName === elist.name);
      const teste2 = teste.reduce(this.returnMatchesReduce);
      teamsClassific.push(teste2);
    });
    const objeccorret = this.returnMatchesCorret(teamsClassific);
    return objeccorret;
  };

  returnMatchesReduce = (prev: any, curr: any) => {
    const obj = {
      name: prev.name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: prev.totalVictories + curr.totalVictories,
      totalDraws: prev.totalDraws + curr.totalDraws,
      totalLosses: prev.totalLosses + curr.totalLosses,
      goalsFavor: prev.goalsFavor + curr.goalsFavor,
      goalsOwn: prev.goalsOwn + curr.goalsOwn,
      goalsBalance: 0,
      efficiency: 0,
    };
    return obj;
  };

  returnMatchesCorret = (objMatches: Array<any>) => {
    const teamsClassific: Array<MatchestimesOk> = [];
    objMatches.forEach((e) => {
      const totalPontos = (e.totalVictories * 3) + e.totalDraws;
      const totalgame = e.totalVictories + e.totalDraws + e.totalLosses;
      teamsClassific.push({
        name: e.name,
        totalPoints: totalPontos,
        totalGames: totalgame,
        totalVictories: e.totalVictories,
        totalDraws: e.totalDraws,
        totalLosses: e.totalLosses,
        goalsFavor: e.goalsFavor,
        goalsOwn: e.goalsOwn,
        goalsBalance: e.goalsFavor - e.goalsOwn,
        efficiency: Number(((totalPontos / (totalgame * 3)) * 100).toFixed(2)),
      });
    });
    return teamsClassific;
  };
}
