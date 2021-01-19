"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemonHealth = exports.postPokemonHealth = void 0;
var healths = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];
exports.postPokemonHealth = function (req, res) {
    var id = parseInt(req.params.id);
    var index = parseInt(req.params.index);
    var quantity = parseInt(req.params.quantity);
    healths[id][index] = quantity;
    res.status(200).json({
        status: 'success',
        data: healths[id][index],
    });
};
exports.getPokemonHealth = function (req, res) {
    var id = parseInt(req.params.id);
    var index = parseInt(req.params.index);
    res.status(200).json({
        status: 'success',
        data: healths[id][index],
    });
};
