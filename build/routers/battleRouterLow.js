"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleRouter = void 0;
var express_1 = require("express");
var battleControllerLow_1 = require("../controllers/battleControllerLow");
var battleRouter = express_1.Router();
exports.battleRouter = battleRouter;
battleRouter.route('/battle/notify-intro/:id').post(battleControllerLow_1.postUserIntroNotification);
battleRouter
    .route('/battle/wait-intro-lower/:id')
    .get(battleControllerLow_1.getUserIntroNotification);
battleRouter
    .route('/battle/wait-intro-upper/:id')
    .get(battleControllerLow_1.getUserIntroNotification);
