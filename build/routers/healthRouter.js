"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
var express_1 = require("express");
var healthController_1 = require("../controllers/healthController");
var healthRouter = express_1.Router();
exports.healthRouter = healthRouter;
// healthRouter.route('/health/get-all/:id');
healthRouter.route('/health/get-one/:id/:index').get(healthController_1.getPokemonHealth);
// healthRouter.route('/health/post-all/:id');
healthRouter
    .route('/health/post-one/:id/:index/:quantity')
    .post(healthController_1.postPokemonHealth);
