import Matches from '../database/models/Matches';

export interface IModelMatches {
  findMatches():Promise<Matches[]>
  createMatches(homeTeam: number,
    awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Matches>
}

export interface IserviceMatches {
  findMatches():Promise<Matches[]>
  createMatches(homeTeam: number,
    awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Matches>
}
