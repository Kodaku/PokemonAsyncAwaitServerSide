"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playersRouter = void 0;
var express_1 = require("express");
var playerController_1 = require("../controllers/playerController");
var playersRouter = express_1.Router();
exports.playersRouter = playersRouter;
playersRouter.route('/test/:id/:name').get(function (req, res) {
    console.log(req.params);
    res.status(200).json({
        message: 'Hello from the server',
    });
});
playersRouter.route('/players/total').get(playerController_1.getTotalPlayers);
playersRouter.route('/create/:id/:name').get(playerController_1.createUser);
playersRouter.route('/wait-players').get(playerController_1.waitPlayers);
playersRouter.route('/players/items/down/:id').get(playerController_1.getPlayerItems);
playersRouter.route('/players/items/up/:id').get(playerController_1.getPlayerItems);
playersRouter.route('/players/pokemons/:id').get(playerController_1.getPlayerPokemons);
playersRouter
    .route('/players/items/:id/:itemindex/:pokemonindex')
    .get(playerController_1.reduceItemQuantity);
playersRouter
    .route('/players/itemsincrease/:id/:itemindex/:pokemonindex')
    .get(playerController_1.increaseItemQuantity);
playersRouter
    .route('/players/switchpokemon/:id/:fromindex/:toindex')
    .get(playerController_1.switchPokemonIndex);
playersRouter
    .route("/players/user/move/:id")
    .get(playerController_1.getPlayerInfo)
    .put(playerController_1.postPlayerInfo);
playersRouter.route('/players/notify-empty/:id/:message').get(playerController_1.messageFromUpper);
playersRouter.route('/players/notify/delayed/:id').get(playerController_1.notifyLowerMenu);
playersRouter
    .route('/battle/pokemon-index/:pokemonindex/:id')
    .post(playerController_1.postPlayerPokemonIndex);
playersRouter.route('/battle/pokemon-index/:id').get(playerController_1.getPlayerPokemonIndex);
