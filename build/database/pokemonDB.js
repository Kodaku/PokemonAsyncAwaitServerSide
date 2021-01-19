"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var pokemonSchema = new mongoose_1.default.Schema({
    pokedexNumber: {
        type: String,
        required: [true, 'A Pokémon must have a Pokedex number'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'A Pokémon must have a name'],
    },
    type: {
        type: [String],
        required: [true, 'A Pokémon must have a type'],
    },
    evolutions: {
        type: [String],
        default: [],
    },
    evolvesFrom: {
        type: String,
        default: -1,
    },
    description: {
        type: String,
        required: [true, 'Please type a description for this Pokémon'],
    },
    weaknesses: {
        type: [String],
        required: [true, 'A Pokémon must be weakness to at least one type'],
    },
    immunities: {
        type: [String],
        required: [true, 'Specify if the Pokémon is immune to some types'],
    },
    resistances: {
        type: [String],
        required: [true, 'A Pokémon must be resistant to at least one type'],
    },
    pokemonFamily: {
        type: String,
        trim: true,
        required: [true, 'Please indicate the Pokémon family'],
    },
    catchRate: {
        type: String,
        required: [true, 'A Pokémon must have a catch rate'],
    },
    ability: {
        type: String,
        required: [true, 'A Pokémon must have a personal ability'],
    },
    pokedexColor: {
        type: String,
    },
    baseExp: {
        type: String,
    },
    levelingRate: {
        type: [String],
    },
    moveNames: {
        type: [String],
    },
    moveLevels: {
        type: [Number],
    },
    ps: {
        type: String,
    },
    attack: {
        type: String,
    },
    specialAttack: {
        type: String,
    },
    defense: {
        type: String,
    },
    specialDefense: {
        type: String,
    },
    speed: {
        type: String,
    },
});
pokemonSchema.pre('save', function (next) {
    console.log('Will save document Pokemon...');
    next();
});
var Pokemon = mongoose_1.default.model('Pokemon', pokemonSchema);
exports.Pokemon = Pokemon;
