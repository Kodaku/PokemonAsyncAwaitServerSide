import { Router } from 'express';
import {
  delayedLowerScreenNotification,
  delayedUpperScreenNotification,
  notificationLowerToUpper,
  notificationUpperToLower,
} from '../../controllers/upperLower/upperLowerController';

const upperLowerRouter = Router();

upperLowerRouter.route('/real-time/notify-upper').get(notificationLowerToUpper);
upperLowerRouter.route('/real-time/notify-lower').get(notificationUpperToLower);

upperLowerRouter
  .route('/delayed/notify-upper')
  .get(delayedUpperScreenNotification);
upperLowerRouter
  .route('/delayed/notify-lower')
  .get(delayedLowerScreenNotification);

export { upperLowerRouter };
