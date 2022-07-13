import { Router } from 'express';
import MatchesController from '../controllers/MatchesControllers';
import Matchesservices from '../services/MatchesService';
import MatchesRepository from '../repository/MatchesRepository';

const MatchesRoute = Router();

const Teamscontroller = new MatchesController(
  new Matchesservices(new MatchesRepository()),
);

MatchesRoute.get('/matches', Teamscontroller.getMatches);

export default MatchesRoute;
