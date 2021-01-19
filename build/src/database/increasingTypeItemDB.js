"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncreasingItem = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var increasingTypeSchema = new mongoose_1.default.Schema({
    index: {
        type: Number,
        required: [true, 'An item must have a unique index'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'An item must a name'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'An item must have a description'],
    },
    category: {
        type: String,
        required: [true, 'Please specify if this is an ITEM, MEDICINE or BERRIES'],
    },
    incrementAmount: {
        type: String,
        required: [true, 'Please specify how much PS or PP this item increase'],
    },
    increaseType: {
        type: String,
        required: [true, 'What does this item increment PS or PP?'],
        enum: {
            values: ['PS', 'PP'],
            message: 'The type must be PS or PP',
        },
    },
});
increasingTypeSchema.pre('save', function (next) {
    console.log('Will save document Increasing Types...');
    next();
});
var IncreasingItem = mongoose_1.default.model('IncreasingItem', increasingTypeSchema);
exports.IncreasingItem = IncreasingItem;
