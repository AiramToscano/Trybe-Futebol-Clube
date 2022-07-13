import Matches from '../database/models/Matches';

export interface IModelMatches {
  findMatches():Promise<Matches[]>
}

export interface IserviceMatches {
  findMatches():Promise<Matches[]>
}
