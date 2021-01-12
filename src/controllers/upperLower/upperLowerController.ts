import { Request, Response } from 'express';

let completedLowerToUpper: boolean[] = [false, false];
let completedUpperToLower: boolean[] = [false, false];
let messageFromLower: string[] = ['', ''];
let messageFromUpper: string[] = ['', ''];
let information: number[] | string[] = [0, 0];
let fakeCount = 0;

export const notificationLowerToUpper = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'L-NOTIFICATION';
  res.status(200).json({
    status: 'success',
    data: {
      message: messageFromLower[id],
    },
  });
};

export const notificationUpperHealth = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'INCREASE-HEALTH';
  information[id] = `${parseInt(req.params.quantity)},${parseInt(
    req.params.pokemonindex
  )}`;
  console.log(messageFromLower[id], information[id]);
  res.status(200).json({
    status: 'success',
    information: information[id],
  });
};

export const notificationUpperCure = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'CURE';
  information[id] = req.params.type;
  console.log(messageFromLower[id], information[id]);
  res.status(200).json({
    status: 'success',
  });
};

export const notificationUpperStats = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'STATS';
  information[id] = req.params.type;
  console.log(messageFromLower[id], information[id]);
  res.status(200).json({
    status: 'success',
  });
};

export const notificationUpperPokeBall = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'POKEBALL';
  information[id] = req.params.type;
  console.log(messageFromLower[id], information[id]);
  res.status(200).json({
    status: 'success',
  });
};

export const notificationUpperAttack = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'ATTACK';
  information[id] = req.params.attackinfo;
  console.log(messageFromLower[id], information[id]);
  res.status(200).json({
    status: 'success',
    information: information[id],
  });
};

export const notificationUpperSwitch = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'SWITCH';
  information[id] = req.params.pokemoninfo;
  console.log(messageFromLower[id], information[id]);
  res.status(200).json({
    status: 'success',
    information: information[id],
  });
};

export const notificationUpperFainted = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  messageFromLower[id] = 'SWITCH-FAINTED';
  information[id] = req.params.pokemoninfo;
  console.log(messageFromLower[id], information[id]);
  res.status(200).json({
    status: 'success',
    information: information[id],
  });
};

export const notificationUpperToLower = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemonState = req.params.pokemonstate;
  messageFromUpper[id] = pokemonState;
  res.status(200).json({
    status: 'success',
    data: {
      message: messageFromUpper[id],
    },
  });
};

export const delayedUpperScreenNotification = async function (
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);
  console.log('Got /events from upper');

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!completedLowerToUpper[id]) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    fakeCount++;
    if (messageFromLower[id] !== '') {
      completedLowerToUpper[id] = true;
      // Emit an SSE that contains the current 'count' as a string
      console.log(
        `data: ${messageFromLower[id]},${information[id]} delayed\n\n`
      );
      res.write(`data: ${messageFromLower[id]},${information[id]}\n\n`);
    } else if (fakeCount > 2) {
      completedLowerToUpper[id] = true;
      console.log(`Sent fake notification: ${'FAKE'},${0}`);
      res.write(`data: ${'FAKE'},${0}\n\n`);
    }
  }
  messageFromLower[id] = '';
  completedLowerToUpper[id] = false;
  fakeCount = 0;
};

export const delayedLowerScreenNotification = async function (
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);
  console.log('Got /events from lower');

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!completedUpperToLower[id]) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (messageFromUpper[id] !== '') {
      completedUpperToLower[id] = true;
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${messageFromUpper[id]} delayed\n\n`);
      res.write(`data: ${messageFromUpper[id]}\n\n`);
    }
  }
  messageFromUpper[id] = '';
  completedUpperToLower[id] = false;
};

function setEventResponse(res: Response) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
}
