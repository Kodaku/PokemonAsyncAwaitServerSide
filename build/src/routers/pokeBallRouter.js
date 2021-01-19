"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeBallRouter = void 0;
var express_1 = require("express");
var pokeBallController_1 = require("../controllers/pokeBallController");
var pokeBallRouter = express_1.Router();
exports.pokeBallRouter = pokeBallRouter;
pokeBallRouter.route('poke-balls/all').get(pokeBallController_1.getAllPokeBalls);
pokeBallRouter.route('poke-balls/get-poke-ball/:pokeballname').get(pokeBallController_1.getPokeBall);
