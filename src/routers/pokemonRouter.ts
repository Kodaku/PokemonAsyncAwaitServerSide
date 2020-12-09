import { Router } from 'express';
import { getAllPokemon, getPokemon } from '../controllers/pokemonController';

const pokemonRouter = Router();

pokemonRouter.route('/pokemons/all').get(getAllPokemon);

pokemonRouter.route('/pokemons/get-pokemon').get(getPokemon);

export { pokemonRouter };
