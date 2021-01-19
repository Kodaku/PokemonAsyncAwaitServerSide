"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var moveSchema = new mongoose_1.default.Schema({
    index: {
        type: Number,
        required: [true, 'Insert the move index'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Enter the move name'],
    },
    pp: {
        type: Number,
        required: [true, 'A move must have its PP'],
    },
    power: {
        type: Number,
        required: [true, 'You must specify the move power'],
    },
    type: {
        type: String,
        required: [true, 'Enter the move type'],
    },
    accuracy: {
        type: Number,
        required: [true, 'Enter the move accuracy'],
    },
    typology: {
        type: String,
        required: [true, 'Specify if the move is SPECIAL or PHYSICAL'],
    },
});
moveSchema.pre('save', function (next) {
    console.log('Will save document Moves...');
    next();
});
var Move = mongoose_1.default.model('Move', moveSchema);
exports.Move = Move;
