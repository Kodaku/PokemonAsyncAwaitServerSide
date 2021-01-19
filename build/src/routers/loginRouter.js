"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
var express_1 = require("express");
var loginController_1 = require("../controllers/loginController");
var loginRouter = express_1.Router();
exports.loginRouter = loginRouter;
loginRouter.route('/login').post(loginController_1.checkName);
loginRouter.route('/players/id/:name').get(loginController_1.getID);
