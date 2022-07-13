import { Router } from 'express';
import TeamsController from '../controllers/TeamsControllers';
import Teamsservices from '../services/TeamsServices';
import TeamsRepository from '../repository/TeamsRepository';

const TeamsRoute = Router();

const Teamscontroller = new TeamsController(
  new Teamsservices(new TeamsRepository()),
);

TeamsRoute.get('/teams', Teamscontroller.getTeams);
TeamsRoute.get('/teams/:id', Teamscontroller.getTeamsbyId);

export default TeamsRoute;
