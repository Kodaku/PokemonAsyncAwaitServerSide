export type Velocity = {
  vx: number;
  vy: number;
};

export type User = {
  userName: string;
  userID: number;
  userCharacter: string;
  x: number;
  y: number;
  anim: string;
  velocity: Velocity;
  busy: boolean;
  pokemons: TeamMember[];
  pokeBalls: Item[];
  increaseStats: Item[];
  increaseHealth: Item[];
  cures: Item[];
};

export type Couple = {
  user: User;
  opponent: User;
  haveBattled: boolean;
  knowOpponent: boolean;
  coupleID: number;
};

export type MyCoordinates = {
  x: number;
  y: number;
};

export type Item = {
  index: string;
  quantity: number;
  category: string;
  type: string;
};

export type TeamMember = {
  pokedexNumber: string;
  itemHeld: ItemToString;
  status: string;
};

export type ItemToString = {
  name: string;
  index: string;
  description: string;
};
