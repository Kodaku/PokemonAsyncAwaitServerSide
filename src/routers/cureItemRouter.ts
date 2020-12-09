import { Router } from 'express';
import {
  getAllCureItems,
  getCureItem,
} from '../controllers/cureItemController';

const cureRouter = Router();

cureRouter.route('/cure-items/all').get(getAllCureItems);

cureRouter.route('/down/cure-items/get-item').get(getCureItem);
cureRouter.route('/up/cure-items/get-item').get(getCureItem);

export { cureRouter };
