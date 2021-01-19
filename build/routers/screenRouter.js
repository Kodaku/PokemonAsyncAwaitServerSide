"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenRouter = void 0;
var express_1 = require("express");
var screenController_1 = require("../controllers/screenController");
var screenRouter = express_1.Router();
exports.screenRouter = screenRouter;
//this request comes from the upper screen
screenRouter.route('/screen/request-change/:id').get(screenController_1.requireScreenChange);
//this notify goes to the lower screen
screenRouter.route('/screen/notify-change/:id').get(screenController_1.notifyScreenChange);
screenRouter.route('/screen/restart-play/:id').get(screenController_1.restartPlay);
screenRouter.route('/screen/notify-restart/:id').get(screenController_1.notifyRestart);
