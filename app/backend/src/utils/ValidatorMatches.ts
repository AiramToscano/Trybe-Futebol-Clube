import { NextFunction, Response, Request } from 'express';
import { IserviceTeams } from '../interfaces/TeamInterfaces';
import { Ijwt } from '../interfaces/LoginInterfaces';

export default class ValidatorMatches {
  constructor(private service: IserviceTeams, private jwt: Ijwt) {
    this.service = service;
  }

  MatchesNotFound = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    const hometeam = await this.service.findTeamsbyId(homeTeam);
    const awayteam = await this.service.findTeamsbyId(awayTeam);
    if (!hometeam || !awayteam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  };

  MatchesNoiquals = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };

  MatchesNojwt = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const user = await this.jwt.validJwt(authorization);
    if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
    next();
  };
}
