import { IModelMatches, IserviceMatches } from '../interfaces/Matchesinterfaces';
import Matches from '../database/models/Matches';

export default class MatchesService implements IserviceMatches {
  constructor(private model: IModelMatches) {
    this.model = model;
  }

  async findMatches():Promise<Matches[]> {
    const listteams = await this.model.findMatches();
    return listteams;
  }
}
