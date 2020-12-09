import { Request, Response } from 'express';

let completedLowerToUpper: boolean = false;
let completedUpperToLower: boolean = false;
let messageFromLower: string = '';
let messageFromUpper: string = '';

export const notificationLowerToUpper = (req: Request, res: Response) => {
  messageFromLower = 'L-NOTIFICATION';
  res.status(200).json({
    status: 'success',
    data: {
      message: messageFromLower,
    },
  });
};

export const notificationUpperToLower = (req: Request, res: Response) => {
  messageFromUpper = 'U-NOTIFICATION';
  res.status(200).json({
    status: 'success',
    data: {
      message: messageFromUpper,
    },
  });
};

export const delayedUpperScreenNotification = async function (
  req: Request,
  res: Response
) {
  console.log('Got /events');

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!completedLowerToUpper) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (messageFromLower !== '') {
      completedLowerToUpper = true;
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${messageFromLower} delayed\n\n`);
      res.write(`data: ${messageFromLower} delayed\n\n`);
    }
  }
  messageFromLower = '';
  completedLowerToUpper = false;
};

export const delayedLowerScreenNotification = async function (
  req: Request,
  res: Response
) {
  console.log('Got /events');

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!completedUpperToLower) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (messageFromUpper !== '') {
      completedUpperToLower = true;
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${messageFromUpper} delayed\n\n`);
      res.write(`data: ${messageFromUpper} delayed\n\n`);
    }
  }
  messageFromUpper = '';
  completedUpperToLower = false;
};

function setEventResponse(res: Response) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
}
