import { Router } from 'express';
import {
  getAllIncreaseStatsItems,
  getIncreaseStatsItem,
} from '../controllers/increaseStatsItemController';

const increasingStatsRouter = Router();

increasingStatsRouter
  .route('/increasing-stats-item/all')
  .get(getAllIncreaseStatsItems);

increasingStatsRouter
  .route('/down/increasing-stats-item/get-item')
  .get(getIncreaseStatsItem);
increasingStatsRouter
  .route('/up/increasing-stats-item/get-item')
  .get(getIncreaseStatsItem);

export { increasingStatsRouter };
