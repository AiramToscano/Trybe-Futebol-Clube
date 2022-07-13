import { Router } from 'express';
import MatchesController from '../controllers/MatchesControllers';
import Matchesservices from '../services/MatchesService';
import MatchesRepository from '../repository/MatchesRepository';
import LoginRepository from '../repository/LoginRepository';
import CreateJWT from '../utils/CreateJwt';

const MatchesRoute = Router();

const Teamscontroller = new MatchesController(
  new Matchesservices(new MatchesRepository()),
  new CreateJWT(new LoginRepository()),
);

MatchesRoute.get('/matches', Teamscontroller.getMatches);
MatchesRoute.post('/matches', Teamscontroller.createMatches);

export default MatchesRoute;
