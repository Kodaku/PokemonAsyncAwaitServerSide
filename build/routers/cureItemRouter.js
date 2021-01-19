"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cureRouter = void 0;
var express_1 = require("express");
var cureItemController_1 = require("../controllers/cureItemController");
var cureRouter = express_1.Router();
exports.cureRouter = cureRouter;
cureRouter.route('/cure-items/all').get(cureItemController_1.getAllCureItems);
cureRouter.route('/down/cure-items/get-item').get(cureItemController_1.getCureItem);
cureRouter.route('/up/cure-items/get-item').get(cureItemController_1.getCureItem);
