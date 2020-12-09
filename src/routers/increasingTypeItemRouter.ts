import { Router } from 'express';
import {
  getAllIncreasingItems,
  getIncreasingItem,
} from '../controllers/increasingItemsController';

const increasingItemRouter = Router();

increasingItemRouter
  .route('/increasing-type-items/all')
  .get(getAllIncreasingItems);

increasingItemRouter
  .route('/down/increasing-type-items/get-item')
  .get(getIncreasingItem);
increasingItemRouter
  .route('/up/increasing-type-items/get-item')
  .get(getIncreasingItem);

export { increasingItemRouter };
