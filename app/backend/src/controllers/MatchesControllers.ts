import { Request, Response } from 'express';
import { IserviceMatches } from '../interfaces/Matchesinterfaces';

export default class TeamInterfaces {
  constructor(private service: IserviceMatches) {
    this.service = service;
  }

  public getMatches = async (_req: Request, res: Response): Promise<object> => {
    try {
      const getmatches = await this.service.findmatchesall();
      return res.status(200).json(getmatches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  public createMatches = async (req: Request, res: Response): Promise<object> => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const matches = await this.service
        .createMatches(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
      return res.status(201).json(matches);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  updatematchesInProgress = async (req: Request, res: Response): Promise<object | undefined> => {
    try {
      const { id } = req.params;
      await this.service.updatematchesInProgress(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  public updatematchesScore = async (req: Request, res: Response): Promise<object | undefined> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const updatematches = await this.service
        .updatematchesScore(Number(id), homeTeamGoals, awayTeamGoals);
      if (updatematches != null) {
        return res.status(200).json({ message: 'Atualizou' });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
}
