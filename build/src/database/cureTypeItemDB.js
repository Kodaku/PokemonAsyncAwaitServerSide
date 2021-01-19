"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CureItem = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var cureTypeSchema = new mongoose_1.default.Schema({
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
        required: [true, 'Please specify if this is an ITEM, MEDICINES or BERRIES'],
    },
    stateCured: {
        type: String,
        required: [
            true,
            'This type of Item must specify what kind of disease will cure',
        ],
        enum: {
            values: ['POISONED', 'PARALYZED', 'BURNED', 'ASLEEP', 'FREEZED', 'ALL'],
            message: 'The state cured must be POISONED, PARALYZED, BURNED, ASLEEP, FREEZED, ALL',
        },
    },
});
cureTypeSchema.pre('save', function (next) {
    console.log('Will save document Cure Items...');
    next();
});
var CureItem = mongoose_1.default.model('Cure', cureTypeSchema);
exports.CureItem = CureItem;
