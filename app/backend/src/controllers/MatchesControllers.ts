import { Request, Response } from 'express';
import { IserviceMatches } from '../interfaces/Matchesinterfaces';

export default class TeamInterfaces {
  constructor(private service: IserviceMatches) {
    this.service = service;
  }

  public getMatches = async (_req: Request, res: Response): Promise<object> => {
    const getmatches = await this.service.findMatches();
    return res.status(200).json(getmatches);
  };
}
