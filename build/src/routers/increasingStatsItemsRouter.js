"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increasingStatsRouter = void 0;
var express_1 = require("express");
var increaseStatsItemController_1 = require("../controllers/increaseStatsItemController");
var increasingStatsRouter = express_1.Router();
exports.increasingStatsRouter = increasingStatsRouter;
increasingStatsRouter
    .route('increasing-stats-item/all')
    .get(increaseStatsItemController_1.getAllIncreaseStatsItems);
increasingStatsRouter
    .route('increasing-stats-item/get-item/:itemname')
    .get(increaseStatsItemController_1.getIncreaseStatsItem);
