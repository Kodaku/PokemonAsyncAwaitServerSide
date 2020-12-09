import { Router } from 'express';
import {
  notifyRestart,
  notifyScreenChange,
  requireScreenChange,
  restartPlay,
} from '../controllers/screenController';

const screenRouter = Router();

//this request comes from the upper screen
screenRouter.route('/screen/request-change/:id').get(requireScreenChange);

//this notify goes to the lower screen
screenRouter.route('/screen/notify-change/:id').get(notifyScreenChange);

screenRouter.route('/screen/restart-play/:id').get(restartPlay);

screenRouter.route('/screen/notify-restart/:id').get(notifyRestart);

export { screenRouter };
