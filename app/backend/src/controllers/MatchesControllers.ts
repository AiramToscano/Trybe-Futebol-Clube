import { Request, Response } from 'express';
import { IserviceMatches } from '../interfaces/Matchesinterfaces';
import { Ijwt } from '../interfaces/LoginInterfaces';

export default class TeamInterfaces {
  constructor(private service: IserviceMatches, private jwt: Ijwt) {
    this.service = service;
  }

  public getMatches = async (_req: Request, res: Response): Promise<object> => {
    try {
      const getmatches = await this.service.findMatches();
      return res.status(200).json(getmatches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  public createMatches = async (req: Request, res: Response): Promise<object> => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const { authorization } = req.headers;
      const user = await this.jwt.validJwt(authorization);
      if (!user) return res.status(400).json({ message: 'Token expired or invalid' });
      const matches = await this.service
        .createMatches(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
      return res.status(201).json(matches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
}
