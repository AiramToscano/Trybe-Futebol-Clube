import { Router } from 'express';
import LeaderboadsController from '../controllers/LeaderboardsController';
import Leaderboadsservices from '../services/LeaderboardsService';
import LeaderboadsRepository from '../repository/LeaderboardsRepository';
import TeamsRepository from '../repository/TeamsRepository';
import GetTeams from '../utils/getTeams';

const LeaderboadsRoute = Router();

const Leaderboardscontroller = new LeaderboadsController(
  new GetTeams(
    new Leaderboadsservices(
      new LeaderboadsRepository(),
      new TeamsRepository(),
    ),
    new TeamsRepository(),
  ),
);

LeaderboadsRoute.get('/leaderboard/home', Leaderboardscontroller.getMatches);

export default LeaderboadsRoute;
