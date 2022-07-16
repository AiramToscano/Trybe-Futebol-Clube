import { Request, Response } from 'express';
import { Itteamsutils } from '../interfaces/LeaderboardsRepositoryInterface';

export default class TeamInterfaces {
  constructor(private utils: Itteamsutils) {
    this.utils = utils;
  }

  public getMatchesHome = async (_req: Request, res: Response): Promise<object> => {
    try {
      const getmatches = await this.utils.getteams('home');
      return res.status(200).json(getmatches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  public getMatchesAway = async (_req: Request, res: Response): Promise<object> => {
    try {
      const getmatches = await this.utils.getteams('away');
      return res.status(200).json(getmatches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  public getMatchesAll = async (_req: Request, res: Response): Promise<object> => {
    try {
      const getmatches = await this.utils.getteams('all');
      return res.status(200).json(getmatches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
}
