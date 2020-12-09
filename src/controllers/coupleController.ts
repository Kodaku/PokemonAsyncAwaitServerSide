import { Request, Response } from 'express';
import { Couple, User } from '../types/myTypes';

let completed: boolean = false;
let done: boolean = false;
let makingCount: number = 0;
let users: User[] = [];
let couples: Couple[] = [];
let replys: string[][] = [];

export const createCouples = async function (req: Request, res: Response) {
  console.log('Got /events');

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!completed) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (users.length >= 2) {
      completed = true;
      //creating couples only once
      if (makingCount < 1) {
        makingCount++;
        makeCouples();
        setReplys();
        // console.log(couples);
      }
      // Emit an SSE that contains the current 'count' as a string
      res.write(`data: ${users.length}\n\n`);
    }
  }
};

export const postUserOnCouple = (req: Request, res: Response) => {
  const user: User = req.body.user as User;
  const id: number = parseInt(req.params.id);
  users[id] = user;
};

export const getCoupleUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  res.status(200).json({
    couple: couples[id],
  });
};

export const knowOpponent = (req: Request, res: Response) => {
  const id = parseInt(req.params.opponentid);
  couples[id].knowOpponent = true;
  res.status(200).json({
    status: couples[id].knowOpponent,
  });
};

export const postCoupleReply = (req: Request, res: Response) => {
  const coupleID = parseInt(req.params.coupleid);
  let coupleReplys: string[] = replys[coupleID];
  coupleReplys.push(req.body.reply);
  res.status(200).json({
    reply: req.body.reply,
  });
};

export const getCoupleReplys = async function (req: Request, res: Response) {
  const coupleID = parseInt(req.params.coupleid);
  // console.log('Got /reply from couple id ' + coupleID);
  setEventResponse(res);
  while (!done) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (replys[coupleID].length >= 2) {
      done = true;
      // console.log(`Written ${replys[coupleID].length}`);
      res.write(`data: ${replys[coupleID].length}\n\n`);
    }
  }
};

export const resetReplys = (req: Request, res: Response) => {
  const coupleID = parseInt(req.params.coupleid);
  done = false;
  replys[coupleID] = [];
  // console.log('Done');
  res.status(200).json({
    replys: replys,
  });
};

export const getAllCoupleReplys = (req: Request, res: Response) => {
  const coupleID = parseInt(req.params.coupleid);
  res.status(200).json({
    replys: replys[coupleID],
  });
};

function setEventResponse(res: Response) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
}

function makeCouples() {
  for (let i = 0; i < users.length; i++) {
    if (!couples[i]) {
      let opponentIndex = 0;
      do {
        opponentIndex = Math.floor(Math.random() * users.length);
      } while (opponentIndex == i || couples[opponentIndex]);
      couples[i] = {
        user: users[i],
        opponent: users[opponentIndex],
        haveBattled: false,
        knowOpponent: false,
        coupleID: i,
      };
      couples[opponentIndex] = {
        user: users[opponentIndex],
        opponent: users[i],
        haveBattled: false,
        knowOpponent: false,
        coupleID: i,
      };
    }
  }
}

function setReplys() {
  for (let i = 0; i < users.length; i++) {
    replys[i] = [];
  }
}
