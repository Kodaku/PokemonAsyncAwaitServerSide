"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokemonRouter = void 0;
var express_1 = require("express");
var pokemonController_1 = require("../controllers/pokemonController");
var pokemonRouter = express_1.Router();
exports.pokemonRouter = pokemonRouter;
pokemonRouter.route('/pokemons/all').get(pokemonController_1.getAllPokemon);
pokemonRouter.route('pokemons/get-pokemon/:pokemonname').get(pokemonController_1.getPokemon);
