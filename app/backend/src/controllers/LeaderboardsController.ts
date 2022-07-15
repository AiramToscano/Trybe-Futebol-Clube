import { Request, Response } from 'express';
import { Itteamsutils } from '../interfaces/LeaderboardsRepositoryInterface';

export default class TeamInterfaces {
  constructor(private utils: Itteamsutils) {
    this.utils = utils;
  }

  public getMatches = async (_req: Request, res: Response): Promise<object> => {
    try {
      const getmatches = await this.utils.getteams();
      return res.status(200).json(getmatches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
}
