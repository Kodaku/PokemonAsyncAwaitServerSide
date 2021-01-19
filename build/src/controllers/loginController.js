"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getID = exports.checkName = void 0;
var constants_1 = require("../constants/constants");
var names = [];
exports.checkName = function (req, res, next) {
    var name = req.body.name;
    var present = contained(name);
    if (present) {
        res.status(500).json({
            message: 'This name already exists, try with another',
        });
    }
    else if (names.length >= constants_1.spriteNames.length) {
        res.status(400).json({
            message: 'Already four players are playing right now...try in another moment',
        });
    }
    else {
        names.push(name);
        console.log(names);
        res.status(200).json({
            message: 'true',
        });
    }
};
exports.getID = function (req, res) {
    var userName = req.params.name;
    var id = 0;
    for (var i = 0; i < names.length; i++) {
        var name_1 = names[i];
        if (name_1 === userName) {
            id = i;
            break;
        }
    }
    res.status(200).json({
        id: id,
    });
};
function contained(name) {
    for (var i = 0; i < names.length; i++) {
        if (name === names[i]) {
            return true;
        }
    }
    return false;
}
