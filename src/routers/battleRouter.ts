import { Router } from 'express';
import {
  getNewOpponentPokemon,
  getOpponentChoice,
  getPokemonFainted,
  getSerialNumber,
  getUserChoiceNotificationLower,
  getUserChoiceNotificationUpper,
  getUserIntroNotificationLower,
  getUserIntroNotificationUpper,
  postChoiceNotificationLower,
  postChoiceNotificationUpper,
  postNewOpponentPokemon,
  postPokemonFainted,
  postUserIntroNotificationLower,
  postUserIntroNotificationUpper,
  resetChoices,
  resetIntro,
} from '../controllers/battleController';

const battleRouter = Router();

battleRouter.route('/battle/reset-intro-data').post(resetIntro);
battleRouter.route('/battle/reset-choice-data').post(resetChoices);

battleRouter
  .route('/battle/notify-intro-upper/:id')
  .post(postUserIntroNotificationUpper);

battleRouter
  .route('/battle/notify-intro-lower/:id')
  .post(postUserIntroNotificationLower);

battleRouter
  .route('/battle/wait-intro-lower/:id')
  .get(getUserIntroNotificationLower);

battleRouter
  .route('/battle/wait-intro-upper')
  .get(getUserIntroNotificationUpper);

battleRouter
  .route('/battle/notify-choice-upper/:id/:data')
  .post(postChoiceNotificationUpper);
battleRouter
  .route('/battle/notify-choice-lower/:id')
  .post(postChoiceNotificationLower);

battleRouter
  .route('/battle/wait-choice-upper')
  .get(getUserChoiceNotificationUpper);
battleRouter
  .route('/battle/wait-choice-lower/:id')
  .get(getUserChoiceNotificationLower);

battleRouter.route('/battle/get-choice/:opponentid').get(getOpponentChoice);

battleRouter.route('/battle/get-serial-number').get(getSerialNumber);

battleRouter
  .route('/battle/pokemon-fainted/:fainted/:id')
  .post(postPokemonFainted);

battleRouter.route('/battle/pokemon-fainted/:id').get(getPokemonFainted);

battleRouter
  .route('/battle/notify-choice-fainted/:id/:data')
  .post(postNewOpponentPokemon);
battleRouter.route('/battle/wait-choice-fainted/:id').get(getNewOpponentPokemon);

export { battleRouter };
