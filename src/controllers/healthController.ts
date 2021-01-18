import { Request, Response } from 'express';

let healths: number[][] = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

export const postPokemonHealth = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = parseInt(req.params.index);
  const quantity = parseInt(req.params.quantity);
  healths[id][index] = quantity;
  res.status(200).json({
    status: 'success',
    data: healths[id][index],
  });
};

export const getPokemonHealth = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = parseInt(req.params.index);
  res.status(200).json({
    status: 'success',
    data: healths[id][index],
  });
};
