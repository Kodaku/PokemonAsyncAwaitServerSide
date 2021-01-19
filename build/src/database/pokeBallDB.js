"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokeBall = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var pokeBallSchema = new mongoose_1.default.Schema({
    index: {
        type: Number,
        required: [true, 'An item must have a unique index'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'An item must a name'],
    },
    description: {
        type: String,
        required: [true, 'An item must have a description'],
    },
    category: {
        type: String,
        required: [true, 'Please specify if this is an ITEM, MEDICINE or BERRIES'],
    },
    catchProbability: {
        type: [Number],
        required: [true, 'A Poké Ball must indicate the catch probability'],
    },
});
pokeBallSchema.pre('save', function (next) {
    console.log('Will save document Poke Balls...');
    next();
});
var PokeBall = mongoose_1.default.model('PokeBall', pokeBallSchema);
exports.PokeBall = PokeBall;
