import { Router } from 'express';
import {
  createCouples,
  getAllCoupleReplys,
  getCoupleReplys,
  getCoupleUser,
  knowOpponent,
  postCoupleReply,
  postUserOnCouple,
  resetReplys,
} from '../controllers/coupleController';

const coupleRouter = Router();

coupleRouter.route('/couples/create').get(createCouples);

coupleRouter.route('/couples/post/:id').post(postUserOnCouple);

coupleRouter.route('/couples/user/:id').get(getCoupleUser);

coupleRouter.route('/couples/user/known/:opponentid').get(knowOpponent);

coupleRouter.route('/couples/replys/post/:coupleid').post(postCoupleReply);

coupleRouter.route('/couples/replys/get/:coupleid').get(getCoupleReplys);

coupleRouter.route('/couples/all-replys/:coupleid').get(getAllCoupleReplys);

coupleRouter.route('/couples/reset-replys/:coupleid').get(resetReplys);

export { coupleRouter };
