import Matches from '../database/models/Matches';

export interface IModelMatchesLeaderboards {
  findmatchesall():Promise<Matches[]>
}
export type Matchestimes = {
  name: string;
  goalsFavor: number;
  goalsOwn: number;
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
};

export interface MatchestimesOk extends Matchestimes {
  totalPoints: number,
  totalGames: number;
  goalsBalance: number,
  efficiency: number,
}

export interface IserviceMatchesLeaderboards {
  findmatchesall():Promise<Array<Matchestimes>>
}

export interface Itteamsutils {
  getteams():Promise<Array<object>>
}
