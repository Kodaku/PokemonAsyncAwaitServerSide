"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleRouter = void 0;
var express_1 = require("express");
var battleController_1 = require("../controllers/battleController");
var battleRouter = express_1.Router();
exports.battleRouter = battleRouter;
battleRouter.route('/battle/reset-intro-data').post(battleController_1.resetIntro);
battleRouter.route('/battle/reset-choice-data').post(battleController_1.resetChoices);
battleRouter
    .route('/battle/notify-intro-upper/:id')
    .post(battleController_1.postUserIntroNotificationUpper);
battleRouter
    .route('/battle/notify-intro-lower/:id')
    .post(battleController_1.postUserIntroNotificationLower);
battleRouter
    .route('/battle/wait-intro-lower/:id')
    .get(battleController_1.getUserIntroNotificationLower);
battleRouter
    .route('/battle/wait-intro-upper')
    .get(battleController_1.getUserIntroNotificationUpper);
battleRouter
    .route('/battle/notify-choice-upper/:id/:data')
    .post(battleController_1.postChoiceNotificationUpper);
battleRouter
    .route('/battle/notify-choice-lower/:id/:data')
    .post(battleController_1.postChoiceNotificationLower);
battleRouter
    .route('/battle/wait-choice-upper')
    .get(battleController_1.getUserChoiceNotificationUpper);
battleRouter
    .route('/battle/wait-choice-lower/:id')
    .get(battleController_1.getUserChoiceNotificationLower);
battleRouter.route('/battle/get-choice/:opponentid').get(battleController_1.getOpponentChoice);
battleRouter.route('/battle/get-serial-number').get(battleController_1.getSerialNumber);
battleRouter
    .route('/battle/pokemon-fainted/:fainted/:id')
    .post(battleController_1.postPokemonFainted);
battleRouter.route('/battle/pokemon-fainted/:id').get(battleController_1.getPokemonFainted);
battleRouter
    .route('/battle/notify-choice-fainted/:id/:data')
    .post(battleController_1.postNewOpponentPokemon);
battleRouter
    .route('/battle/wait-choice-fainted/:id')
    .get(battleController_1.getNewOpponentPokemon);
battleRouter.route('/battle/emergency-reset/:id').post(battleController_1.resetAll);
