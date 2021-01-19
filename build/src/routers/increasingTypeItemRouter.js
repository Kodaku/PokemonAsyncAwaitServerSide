"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increasingItemRouter = void 0;
var express_1 = require("express");
var increasingItemsController_1 = require("../controllers/increasingItemsController");
var increasingItemRouter = express_1.Router();
exports.increasingItemRouter = increasingItemRouter;
increasingItemRouter
    .route('increasing-type-items/all')
    .get(increasingItemsController_1.getAllIncreasingItems);
increasingItemRouter
    .route('increasing-type-items/get-item/:itemname')
    .get(increasingItemsController_1.getIncreasingItem);
