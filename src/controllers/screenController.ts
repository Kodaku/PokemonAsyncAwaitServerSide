import { Request, Response } from 'express';

let shouldShowMenu: boolean[] = [false, false, false, false];
let completeShowMenu: boolean[] = [false, false, false, false];
let shouldRestartPlay: boolean[] = [false, false, false, false];
let completeRestartPlay: boolean[] = [false, false, false, false];

export const requireScreenChange = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  shouldShowMenu[id] = true;
  // completeShowMenu[id] = false;
  res.status(200).json({
    status: 'success',
    data: {
      shouldShowMenu: shouldShowMenu[id],
    },
  });
};

export const restartPlay = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  shouldRestartPlay[id] = true;
  // completeRestartPlay[id] = false;
  res.status(200).json({
    status: 'success',
    data: {
      shouldRestartPlay: shouldRestartPlay[id],
    },
  });
};

export const notifyScreenChange = async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  console.log('Got /events to change screen');
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  // Tell the client to retry every 1 seconds if connectivity is lost
  res.write('retry: 1000\n\n');

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (shouldShowMenu[id]) {
      shouldShowMenu[id] = false;
      // completeShowMenu[id] = true;
      res.write(`data: ok\n\n`);
      console.log('Done on menu');
    }
    // Emit an SSE that contains the current 'count' as a string
  }
};

export const notifyRestart = async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  console.log('Got /events to restart game');
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  // Tell the client to retry every 1 seconds if connectivity is lost
  res.write('retry: 1000\n\n');

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (shouldRestartPlay[id]) {
      shouldRestartPlay[id] = false;
      // completeRestartPlay[id] = true;
      res.write(`data: ok\n\n`);
      console.log('Done on restart');
    }
    // Emit an SSE that contains the current 'count' as a string
  }
};
