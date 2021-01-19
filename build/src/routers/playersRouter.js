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
playersRouter
    .route("/players/user/move/:id")
    .get(playerController_1.getPlayerInfo)
    .put(playerController_1.postPlayerInfo);
