import { Request, Response } from 'express';
import { Move } from '../database/movesDB';

export const getAllMoves = async function (req: Request, res: Response) {
  try {
    const moves = await Move.find();

    res.status(200).json({
      status: 'success',
      data: {
        moves: moves,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getMove = async function (req: Request, res: Response) {
  try {
    const move = await Move.find(req.query);
    res.status(200).json({
      stauts: 'success',
      data: {
        move: move,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
