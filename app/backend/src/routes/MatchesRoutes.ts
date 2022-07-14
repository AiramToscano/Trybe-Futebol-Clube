import { Router } from 'express';
import MatchesController from '../controllers/MatchesControllers';
import Matchesservices from '../services/MatchesService';
import MatchesRepository from '../repository/MatchesRepository';
import LoginRepository from '../repository/LoginRepository';
import ValidatorMatches from '../utils/ValidatorMatches';
import CreateJWT from '../utils/CreateJwt';

const MatchesRoute = Router();

const Validatematches = new ValidatorMatches(
  new Matchesservices(new MatchesRepository()),
  new CreateJWT(new LoginRepository()),
);

const Matchescontroller = new MatchesController(
  new Matchesservices(new MatchesRepository()),
);

MatchesRoute.get('/matches', Matchescontroller.getMatches);
MatchesRoute.post(
  '/matches',
  Validatematches.MatchesNojwt,
  Validatematches.MatchesNotFound,
  Validatematches.MatchesNoiquals,
  Matchescontroller.createMatches,
);
MatchesRoute.patch(
  '/matches/:id/finish',
  Matchescontroller.updatematches,
);
MatchesRoute.patch(
  '/matches/:id',
  Matchescontroller.updatematchesbyId,
);

export default MatchesRoute;
