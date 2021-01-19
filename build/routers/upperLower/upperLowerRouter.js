"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperLowerRouter = void 0;
var express_1 = require("express");
var upperLowerController_1 = require("../../controllers/upperLower/upperLowerController");
var upperLowerRouter = express_1.Router();
exports.upperLowerRouter = upperLowerRouter;
upperLowerRouter
    .route('/real-time/notify-upper/:id')
    .get(upperLowerController_1.notificationLowerToUpper);
upperLowerRouter
    .route('/real-time/notify-lower/:pokemonstate/:id')
    .get(upperLowerController_1.notificationUpperToLower);
upperLowerRouter
    .route('/real-time/notify-upper/increase-health/:quantity/:pokemonindex/:id')
    .get(upperLowerController_1.notificationUpperHealth);
upperLowerRouter
    .route('/real-time/notify-upper/cure/:type/:id')
    .get(upperLowerController_1.notificationUpperCure);
upperLowerRouter
    .route('/real-time/notify-upper/stats/:type/:id')
    .get(upperLowerController_1.notificationUpperStats);
upperLowerRouter
    .route('/real-time/notify-upper/poke-ball/:type/:id')
    .get(upperLowerController_1.notificationUpperPokeBall);
upperLowerRouter
    .route('/real-time/notify-upper/attack/:attackinfo/:id')
    .get(upperLowerController_1.notificationUpperAttack);
upperLowerRouter
    .route('/real-time/notify-upper/switch/:pokemoninfo/:id')
    .get(upperLowerController_1.notificationUpperSwitch);
upperLowerRouter
    .route('/real-time/notify-upper/fainted/:pokemoninfo/:id')
    .get(upperLowerController_1.notificationUpperFainted);
upperLowerRouter
    .route('/delayed/notify-upper/:id')
    .get(upperLowerController_1.delayedUpperScreenNotification);
upperLowerRouter
    .route('/delayed/notify-lower/:id')
    .get(upperLowerController_1.delayedLowerScreenNotification);
