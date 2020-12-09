import { Request, Response, NextFunction } from 'express';
import { spriteNames } from '../constants/constants';

let names: string[] = [];

export const checkName = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;
  const present = contained(name);
  if (present) {
    res.status(500).json({
      message: 'This name already exists, try with another',
    });
  } else if (names.length >= spriteNames.length) {
    res.status(400).json({
      message:
        'Already four players are playing right now...try in another moment',
    });
  } else {
    names.push(name);
    console.log(names);
    res.status(200).json({
      message: 'true',
    });
  }
};

export const getID = (req: Request, res: Response) => {
  const userName = req.params.name;
  let id = 0;
  for (let i = 0; i < names.length; i++) {
    const name: string = names[i];
    if (name === userName) {
      id = i;
      break;
    }
  }
  res.status(200).json({
    id: id,
  });
};

function contained(name: string): boolean {
  for (let i = 0; i < names.length; i++) {
    if (name === names[i]) {
      return true;
    }
  }
  return false;
}
