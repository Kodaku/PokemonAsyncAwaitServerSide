import { Request, Response } from 'express';
import { Pokemon } from '../database/pokemonDB';

export const getAllPokemon = async function (req: Request, res: Response) {
  try {
    const pokemons = await Pokemon.find();

    res.status(200).json({
      status: 'success',
      data: {
        pokemons: pokemons,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getPokemon = async function (req: Request, res: Response) {
  try {
    const pokemon = await Pokemon.find(req.query);
    res.status(200).json({
      stauts: 'success',
      data: {
        pokemon: pokemon,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createPokemon = async function (req: Request, res: Response) {
  try {
    const pokemon = await Pokemon.create(req.body);

    res.status(201).json({
      status: 'succes',
      data: {
        pokemon: pokemon,
      },
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      message: err,
    });
  }
};

export const updatePokemon = async function (req: Request, res: Response) {
  try {
    const pokemon = Pokemon.findByIdAndUpdate(
      req.params.pokemonname,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        pokemon: pokemon,
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

export const deletePokemon = async function (req: Request, res: Response) {
  try {
    await Pokemon.findByIdAndDelete(req.params.pokemonname);

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
