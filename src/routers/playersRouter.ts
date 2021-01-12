import { Router } from 'express';
import {
  createUser,
  getPlayerInfo,
  getPlayerItems,
  getPlayerPokemonIndex,
  getPlayerPokemons,
  getTotalPlayers,
  increaseItemQuantity,
  messageFromUpper,
  notifyLowerMenu,
  postPlayerInfo,
  postPlayerPokemonIndex,
  reduceItemQuantity,
  switchPokemonIndex,
  waitPlayers,
} from '../controllers/playerController';

const playersRouter = Router();

playersRouter.route('/test/:id/:name').get((req, res) => {
  console.log(req.params);
  res.status(200).json({
    message: 'Hello from the server',
  });
});

playersRouter.route('/players/total').get(getTotalPlayers);

playersRouter.route('/create/:id/:name').get(createUser);

playersRouter.route('/wait-players').get(waitPlayers);

playersRouter.route('/players/items/down/:id').get(getPlayerItems);
playersRouter.route('/players/items/up/:id').get(getPlayerItems);

playersRouter.route('/players/pokemons/:id').get(getPlayerPokemons);

playersRouter
  .route('/players/items/:id/:itemindex/:pokemonindex')
  .get(reduceItemQuantity);

playersRouter
  .route('/players/itemsincrease/:id/:itemindex/:pokemonindex')
  .get(increaseItemQuantity);

playersRouter
  .route('/players/switchpokemon/:id/:fromindex/:toindex')
  .get(switchPokemonIndex);

playersRouter
  .route(`/players/user/move/:id`)
  .get(getPlayerInfo)
  .put(postPlayerInfo);

playersRouter.route('/players/notify-empty/:id/:message').get(messageFromUpper);

playersRouter.route('/players/notify/delayed/:id').get(notifyLowerMenu);

playersRouter
  .route('/battle/pokemon-index/:pokemonindex/:id')
  .post(postPlayerPokemonIndex);
playersRouter.route('/battle/pokemon-index/:id').get(getPlayerPokemonIndex);

export { playersRouter };
