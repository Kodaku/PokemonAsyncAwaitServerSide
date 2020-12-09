import { Request, Response } from 'express';
import { PokeBall } from '../database/pokeBallDB';

export const getAllPokeBalls = async function (req: Request, res: Response) {
  try {
    const pokeBalls = await PokeBall.find();

    res.status(200).json({
      status: 'success',
      data: {
        pokeBalls: pokeBalls,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getPokeBall = async function (req: Request, res: Response) {
  try {
    const pokeBall = await PokeBall.find(req.query);
    res.status(200).json({
      stauts: 'success',
      data: {
        item: pokeBall,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createPokeBall = async function (req: Request, res: Response) {
  try {
    const pokeBall = await PokeBall.create(req.body);

    res.status(201).json({
      status: 'succes',
      data: {
        pokeBall: pokeBall,
      },
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      message: err,
    });
  }
};

export const updatePokeBall = async function (req: Request, res: Response) {
  try {
    const pokeBall = PokeBall.findByIdAndUpdate(
      req.params.pokeballname,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        pokeBall: pokeBall,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: err,
      },
    });
  }
};

export const deletePokeBall = async function (req: Request, res: Response) {
  try {
    await PokeBall.findByIdAndDelete(req.params.pokeballname);

    res.status(204).json({
      status: 'success',
      data: 'Delete successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
