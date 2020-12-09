import { Request, Response } from 'express';
import { IncreasingItem } from '../database/increasingTypeItemDB';

export const getAllIncreasingItems = async function (
  req: Request,
  res: Response
) {
  try {
    const items = await IncreasingItem.find();

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

export const getIncreasingItem = async function (req: Request, res: Response) {
  try {
    const item = await IncreasingItem.find(req.query);
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

export const createIncreasingItem = async function (
  req: Request,
  res: Response
) {
  try {
    const item = await IncreasingItem.create(req.body);

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

export const updateIncreasingItem = async function (
  req: Request,
  res: Response
) {
  try {
    const item = IncreasingItem.findByIdAndUpdate(
      req.params.itemname,
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

export const deleteIncreasingItem = async function (
  req: Request,
  res: Response
) {
  try {
    await IncreasingItem.findByIdAndDelete(req.params.itemname);

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
