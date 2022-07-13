import { Request, Response } from 'express';
import { IserviceTeams } from '../interfaces/TeamInterfaces';

export default class TeamInterfaces {
  constructor(private service: IserviceTeams) {
    this.service = service;
  }

  public getTeams = async (_req: Request, res: Response): Promise<object> => {
    try {
      const getteams = await this.service.findTeams();
      return res.status(200).json(getteams);
    } catch (err) {
      return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
    }
  };

  public getTeamsbyId = async (req: Request, res: Response): Promise<object> => {
    try {
      const { id } = req.params;
      const getteam = await this.service.findTeamsbyId(id);
      return res.status(200).json(getteam);
    } catch (err) {
      return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
    }
  };
}
