import Matches from '../database/models/Matches';

export interface IModelMatches {
  findmatchesall():Promise<Matches[]>
  createMatches(homeTeam: number,
    awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Matches>
  updatematchesInProgress(teamid:number):Promise<boolean>
  findmatches(matchesid:number):Promise<boolean>
  updatematchesScore(idMatche: number, homeTeamGoals:number, awayTeamGoals: number):Promise<boolean>
}

export interface IserviceMatches {
  findmatchesall():Promise<Matches[]>
  createMatches(homeTeam: number,
    awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Matches>
  updatematchesInProgress(teamid:number):Promise<boolean>
  findmatches(matchesid:number):Promise<boolean>
  updatematchesScore(idMatche: number, homeTeamGoals:number, awayTeamGoals: number):Promise<boolean>
}
