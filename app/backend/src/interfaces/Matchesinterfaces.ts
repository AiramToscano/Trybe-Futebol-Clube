import Matches from '../database/models/Matches';

export interface IModelMatches {
  findMatches():Promise<Matches[]>
  createMatches(homeTeam: number,
    awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Matches>
  updatematches(teamid:number):Promise<Matches | null>
  findmatches(matchesid:number):Promise<boolean>
  updatematchesbyId(idMatche: number, homeTeamGoals:number, awayTeamGoals: number):Promise<Matches>
}

export interface IserviceMatches {
  findMatches():Promise<Matches[]>
  createMatches(homeTeam: number,
    awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Matches>
  updatematches(teamid:number):Promise<Matches | null>
  updatematchesbyId(idMatche: number, homeTeamGoals:number, awayTeamGoals: number):Promise<boolean>
}
