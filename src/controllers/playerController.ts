import { Request, Response } from 'express';
import {
  anims,
  availableCure,
  availableIncreaseHealth,
  availableIncreaseStats,
  availablePokeBalls,
  availablePokemons,
  coords,
  spriteNames,
} from '../constants/constants';
import { Item, TeamMember, User } from '../types/myTypes';

let users: User[] = [];
let completed: boolean = false;

export const getTotalPlayers = (req: Request, res: Response) => {
  res.status(200).json({
    total: users.length,
  });
};

export const createUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userName = req.params.name;
  //assign pokemons
  const pokemons: TeamMember[] = assignPokemons();
  // console.log(pokemons[id]);
  //assign poke balls
  const pokeBalls: Item[] = assignPokeBalls();
  // console.log(pokeBalls[id]);
  //assign increase stats
  const increaseStatsItems: Item[] = assignIncreaseStats();
  // console.log(increaseStatsItems[id]);
  //assign increase health
  const increaseItems: Item[] = assignHealths();
  // console.log(increaseItems[id]);
  //assign cures
  const cureItems: Item[] = assignCures();
  // console.log(cureItems[id]);
  const user: User = {
    userName: userName,
    userID: id,
    userCharacter: spriteNames[id],
    x: coords[id].x,
    y: coords[id].y,
    anim: anims[id],
    velocity: { vx: 0, vy: 0 },
    busy: false,
    pokemons: pokemons,
    pokeBalls: pokeBalls,
    increaseStats: increaseStatsItems,
    increaseHealth: increaseItems,
    cures: cureItems,
  };
  users[id] = user;
  console.log(users[id].increaseHealth);
  res.status(200).json({
    message: 'true',
    user: user,
  });
};

function assignPokemons(): TeamMember[] {
  let pkmns: TeamMember[] = [];
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * availablePokemons.length);
    pkmns[i] = {
      pokedexNumber: availablePokemons[index],
      itemHeld: {
        description: '',
        index: '',
        name: '',
      },
      status: '',
    };
    availablePokemons.splice(index, 1);
  }
  return pkmns;
}

function assignPokeBalls(): Item[] {
  let items: Item[] = [];
  for (let i = 0; i < availablePokeBalls.length; i++) {
    let quantity = 0;
    //if the poke ball is a Master its quantity should be 1
    if (i == 0) {
      quantity = 1;
    } else {
      quantity = Math.round(Math.random() * 8 + 2);
    }
    items[i] = {
      index: availablePokeBalls[i],
      quantity: quantity,
      category: 'ITEMS',
      type: 'PokeBall',
    };
  }
  return items;
}

function assignIncreaseStats(): Item[] {
  let items: Item[] = [];
  for (let i = 0; i < availableIncreaseStats.length; i++) {
    let quantity = Math.round(Math.random() * 8 + 2);
    items[i] = {
      index: availableIncreaseStats[i],
      quantity: quantity,
      category: 'ITEMS',
      type: 'IncreaseStats',
    };
  }
  return items;
}

function assignHealths(): Item[] {
  let items: Item[] = [];
  for (let i = 0; i < availableIncreaseHealth.length; i++) {
    let quantity = Math.round(Math.random() * 8 + 2);
    let category = '';
    if (availableIncreaseHealth[i].startsWith('1')) {
      category = 'BERRIES';
    } else {
      category = 'MEDICINES';
    }
    items[i] = {
      index: availableIncreaseHealth[i],
      quantity: quantity,
      category: category,
      type: 'IncreaseHealth',
    };
  }
  return items;
}

function assignCures(): Item[] {
  let items: Item[] = [];
  for (let i = 0; i < availableCure.length; i++) {
    let quantity = Math.round(Math.random() * 8 + 2);
    let category = '';
    if (availableCure[i].startsWith('1')) {
      category = 'BERRIES';
    } else {
      category = 'MEDICINES';
    }
    items[i] = {
      index: availableCure[i],
      quantity: quantity,
      category: category,
      type: 'Cure',
    };
  }
  return items;
}

export const waitPlayers = async function (req: Request, res: Response) {
  console.log('Got /events');
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write('retry: 1000\n\n');

  while (!completed) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (users.length >= 2 && allUsersDefined()) {
      completed = true;
      // Emit an SSE that contains the current 'count' as a string
      res.write(`data: ${users.length}\n\n`);
    }
  }
};

function allUsersDefined() {
  for (let i = 0; i < users.length; i++) {
    if (!users[i]) {
      return false;
    }
    return true;
  }
}

export const getPlayerInfo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  res.status(200).json(users[id]);
};

export const getPlayerItems = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  res.status(200).json({
    data: {
      pokeBalls: users[id].pokeBalls,
      increaseStats: users[id].increaseStats,
      increaseHealth: users[id].increaseHealth,
      cures: users[id].cures,
    },
  });
};

export const reduceItemQuantity = (req: Request, res: Response) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  let itemIndex = req.params.itemindex;
  if (itemIndex.length === 1) {
    itemIndex = `00${itemIndex}`;
  } else if (itemIndex.length === 2) {
    itemIndex = `0${itemIndex}`;
  }
  console.log(itemIndex);
  const pokemonIndex = parseInt(req.params.pokemonindex);
  let status = 'fail';
  let found = false;
  users[id].pokemons[pokemonIndex].itemHeld = {
    description: '',
    index: itemIndex,
    name: '',
  };
  users[id].pokeBalls.forEach((item) => {
    if (item.index === itemIndex && !found) {
      if (!(item.quantity === 0)) {
        found = true;
        item.quantity--;
        status = 'success';
      }
    }
  });
  users[id].increaseHealth.forEach((item) => {
    if (item.index === itemIndex && !found) {
      if (!(item.quantity === 0)) {
        found = true;
        item.quantity--;
        status = 'success';
      }
    }
  });
  users[id].increaseStats.forEach((item) => {
    if (item.index === itemIndex && !found) {
      if (!(item.quantity === 0)) {
        found = true;
        item.quantity--;
        status = 'success';
      }
    }
  });
  users[id].cures.forEach((item) => {
    if (item.index === itemIndex && !found) {
      if (!(item.quantity === 0)) {
        found = true;
        item.quantity--;
        status = 'success';
      }
    }
  });
  res.status(200).json({
    stauts: status,
  });
};

export const increaseItemQuantity = (req: Request, res: Response) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  let itemIndex = req.params.itemindex;
  if (itemIndex.length === 1) {
    itemIndex = `00${itemIndex}`;
  } else if (itemIndex.length === 2) {
    itemIndex = `0${itemIndex}`;
  }
  const pokemonIndex = parseInt(req.params.pokemonindex);
  let status = 'fail';
  let found = false;
  users[id].pokemons[pokemonIndex].itemHeld = {
    description: '',
    index: '',
    name: '',
  };
  users[id].pokeBalls.forEach((item) => {
    if (item.index === itemIndex && !found) {
      found = true;
      item.quantity++;
      status = 'success';
    }
  });
  users[id].increaseHealth.forEach((item) => {
    if (item.index === itemIndex && !found) {
      found = true;
      item.quantity++;
      status = 'success';
    }
  });
  users[id].increaseStats.forEach((item) => {
    if (item.index === itemIndex && !found) {
      found = true;
      item.quantity++;
      status = 'success';
    }
  });
  users[id].cures.forEach((item) => {
    if (item.index === itemIndex && !found) {
      found = true;
      item.quantity++;
      status = 'success';
    }
  });
  res.status(200).json({
    stauts: status,
  });
};

export const getPlayerPokemons = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  res.status(200).json({
    data: {
      pokemons: users[id].pokemons,
    },
  });
};

export const switchPokemonIndex = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const fromIndex = parseInt(req.params.fromindex);
  const toIndex = parseInt(req.params.toindex);
  const user = users[id];
  const pokemons = user.pokemons;
  const tpmPokemon = pokemons[fromIndex];
  pokemons[fromIndex] = pokemons[toIndex];
  pokemons[toIndex] = tpmPokemon;
  user.pokemons = pokemons;
  users[id] = user;
  res.status(200).json({
    status: 'success',
    pokemons: users[id].pokemons,
  });
};

export const postPlayerInfo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const newUser = req.body as User;
  users[id] = {
    userName: newUser.userName,
    userID: newUser.userID,
    userCharacter: newUser.userCharacter,
    x: newUser.x,
    y: newUser.y,
    anim: newUser.anim,
    velocity: newUser.velocity,
    busy: newUser.busy,
    pokemons: users[id].pokemons,
    pokeBalls: users[id].pokeBalls,
    increaseStats: users[id].increaseStats,
    increaseHealth: users[id].increaseHealth,
    cures: users[id].cures,
  };
  res.status(200).json(users[id]);
};
