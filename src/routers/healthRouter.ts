import { Router } from 'express';
import {
  getPokemonHealth,
  postPokemonHealth,
} from '../controllers/healthController';

const healthRouter = Router();

// healthRouter.route('/health/get-all/:id');

healthRouter.route('/health/get-one/:id/:index').get(getPokemonHealth);

// healthRouter.route('/health/post-all/:id');

healthRouter
  .route('/health/post-one/:id/:index/:quantity')
  .post(postPokemonHealth);

export { healthRouter };
