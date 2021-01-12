import { Router } from 'express';
import {
  delayedLowerScreenNotification,
  delayedUpperScreenNotification,
  notificationLowerToUpper,
  notificationUpperAttack,
  notificationUpperCure,
  notificationUpperFainted,
  notificationUpperHealth,
  notificationUpperPokeBall,
  notificationUpperStats,
  notificationUpperSwitch,
  notificationUpperToLower,
} from '../../controllers/upperLower/upperLowerController';

const upperLowerRouter = Router();

upperLowerRouter
  .route('/real-time/notify-upper/:id')
  .get(notificationLowerToUpper);
upperLowerRouter
  .route('/real-time/notify-lower/:pokemonstate/:id')
  .get(notificationUpperToLower);
upperLowerRouter
  .route('/real-time/notify-upper/increase-health/:quantity/:pokemonindex/:id')
  .get(notificationUpperHealth);
upperLowerRouter
  .route('/real-time/notify-upper/cure/:type/:id')
  .get(notificationUpperCure);
upperLowerRouter
  .route('/real-time/notify-upper/stats/:type/:id')
  .get(notificationUpperStats);
upperLowerRouter
  .route('/real-time/notify-upper/poke-ball/:type/:id')
  .get(notificationUpperPokeBall);

upperLowerRouter
  .route('/real-time/notify-upper/attack/:attackinfo/:id')
  .get(notificationUpperAttack);

upperLowerRouter
  .route('/real-time/notify-upper/switch/:pokemoninfo/:id')
  .get(notificationUpperSwitch);

upperLowerRouter
  .route('/real-time/notify-upper/fainted/:pokemoninfo/:id')
  .get(notificationUpperFainted);

upperLowerRouter
  .route('/delayed/notify-upper/:id')
  .get(delayedUpperScreenNotification);
upperLowerRouter
  .route('/delayed/notify-lower/:id')
  .get(delayedLowerScreenNotification);

export { upperLowerRouter };
