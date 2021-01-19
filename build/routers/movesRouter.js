"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movesRouter = void 0;
var express_1 = require("express");
var movesController_1 = require("../controllers/movesController");
var movesRouter = express_1.Router();
exports.movesRouter = movesRouter;
movesRouter.route('/moves/all').get(movesController_1.getAllMoves);
movesRouter.route('/moves/get-move').get(movesController_1.getMove);
