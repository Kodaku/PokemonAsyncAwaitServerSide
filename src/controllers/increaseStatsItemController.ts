import { Request, Response } from 'express';
import { IncreaseStat } from '../database/increaseStatsItemDB';

export const getAllIncreaseStatsItems = async function (
  req: Request,
  res: Response
) {
  try {
    const items = await IncreaseStat.find();

    res.status(200).json({
      status: 'success',
      data: {
        items: items,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getIncreaseStatsItem = async function (
  req: Request,
  res: Response
) {
  try {
    const item = await IncreaseStat.find(req.query);
    res.status(200).json({
      stauts: 'success',
      data: {
        item: item,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createIncreaseStatsItem = async function (
  req: Request,
  res: Response
) {
  try {
    const item = await IncreaseStat.create(req.body);

    res.status(201).json({
      status: 'succes',
      data: {
        item: item,
      },
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      message: err,
    });
  }
};

export const updateIncreaseStatsItem = async function (
  req: Request,
  res: Response
) {
  try {
    const item = IncreaseStat.findByIdAndUpdate(
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
        item: item,
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

export const deleteIncreaseStatsItem = async function (
  req: Request,
  res: Response
) {
  try {
    await IncreaseStat.findByIdAndDelete(req.params.pokeballname);

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
