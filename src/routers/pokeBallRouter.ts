import { Router } from 'express';
import {
  getAllPokeBalls,
  getPokeBall,
} from '../controllers/pokeBallController';

const pokeBallRouter = Router();

pokeBallRouter.route('/poke-balls/all').get(getAllPokeBalls);

pokeBallRouter.route('/down/poke-balls/get-poke-ball').get(getPokeBall);
pokeBallRouter.route('/up/poke-balls/get-poke-ball').get(getPokeBall);

export { pokeBallRouter };
