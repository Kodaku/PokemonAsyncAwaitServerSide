import { Request, Response } from 'express';
import { CureItem } from '../database/cureTypeItemDB';

export const getAllCureItems = async function (req: Request, res: Response) {
  try {
    const items = await CureItem.find();

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

export const getCureItem = async function (req: Request, res: Response) {
  try {
    const item = await CureItem.find(req.query);
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

export const createCureItem = async function (req: Request, res: Response) {
  try {
    const item = await CureItem.create(req.body);

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

export const updateCureItem = async function (req: Request, res: Response) {
  try {
    const item = CureItem.findByIdAndUpdate(req.params.itemname, req.body, {
      new: true,
      runValidators: true,
    });
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

export const deleteCureItem = async function (req: Request, res: Response) {
  try {
    await CureItem.findByIdAndDelete(req.params.itemname);

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
