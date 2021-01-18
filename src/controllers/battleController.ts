import { Request, Response } from 'express';

let usersIntroNotifications: boolean[] = [false, false];
let usersChoiceNotifications: boolean[] = [false, false];
let usersChoices: string[] = ['', ''];
let pokemonFainted: string[] = ['', ''];
let faintedNotifications: boolean[] = [false, false];
let usersIntroNotificationsLower: boolean[] = [false, false];
let usersChoiceNotificationsLower: boolean[] = [false, false];
let usersChoiceNotificationsLowerStatus: string[] = ['', ''];
let completed = false;
let serialNumber = 0;
let newOpponentPokemon: string[] = ['', ''];
let newOpponentPokemonNotification: boolean[] = [false, false];

export const resetIntro = (req: Request, res: Response) => {
  serialNumber = 0;
  usersIntroNotifications = [false, false];
  completed = false;
  res.status(200).json({
    status: 'success',
    data: 'INTRO RESET',
  });
};

export const resetChoices = (req: Request, res: Response) => {
  serialNumber = 0;
  usersChoiceNotifications = [false, false];
  usersChoices = ['', ''];
  completed = false;
  res.status(200).json({
    status: 'success',
    data: 'CHOICE RESET',
  });
};

export const getSerialNumber = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    serial: serialNumber++,
  });
};

export const postUserIntroNotificationUpper = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  usersIntroNotifications[id] = true;
  res.status(200).json({
    status: 'success',
    data: usersIntroNotifications,
  });
};

export const postUserIntroNotificationLower = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  usersIntroNotificationsLower[id] = true;
  res.status(200).json({
    status: 'succss',
    data: usersIntroNotificationsLower,
  });
};

export const postChoiceNotificationUpper = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.params.data;
  usersChoices[id] = data;
  usersChoiceNotifications[id] = true;
  res.status(200).json({
    status: 'success',
    data: usersChoices[id],
  });
};

export const postChoiceNotificationLower = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.params.data;
  usersChoiceNotificationsLower[id] = true;
  usersChoiceNotificationsLowerStatus[id] = data;
  res.status(200).json({
    status: 'success',
    data: usersChoiceNotificationsLower,
  });
};

export const getOpponentChoice = (req: Request, res: Response) => {
  const opponentID = parseInt(req.params.opponentid);
  const data = usersChoices[opponentID];
  res.status(200).json({
    status: 'success',
    data: data,
  });
};

export const getUserIntroNotificationUpper = async function (
  req: Request,
  res: Response
) {
  console.log('Got /events');

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!completed) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (allIntroNotifications()) {
      completed = true;
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${'OK'} delayed\n\n`);
      res.write(`data: ${serialNumber++}\n\n`);
    }
  }
  // usersIntroNotifications = [false, false];
};

function allIntroNotifications() {
  for (let i = 0; i < usersIntroNotifications.length; i++) {
    if (!usersIntroNotifications[i]) {
      return false;
    }
  }
  return true;
}

export const getUserIntroNotificationLower = async function (
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);
  console.log('Got /events from intro lower', id);

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!usersIntroNotificationsLower[id]) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (usersIntroNotificationsLower[id]) {
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${'OK LOWER'} delayed\n\n`);
      res.write(`data: ${'OK LOWER'}\n\n`);
    }
  }
  usersIntroNotificationsLower[id] = false;
};

export const getUserChoiceNotificationUpper = async function (
  req: Request,
  res: Response
) {
  console.log('Got /events');

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!completed) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (allChoiceNotifications()) {
      completed = true;
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${'OK CHOICE'},${serialNumber} delayed\n\n`);
      res.write(`data: ${serialNumber}\n\n`);
    }
  }
};

export const getUserChoiceNotificationLower = async function (
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);
  console.log('Got /events from choice lower', id);

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!usersChoiceNotificationsLower[id]) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (usersChoiceNotificationsLower[id]) {
      // Emit an SSE that contains the current 'count' as a string
      console.log(
        `data: ${usersChoiceNotificationsLowerStatus[id]} deayed\n\n`
      );
      res.write(`data: ${usersChoiceNotificationsLowerStatus[id]}\n\n`);
    }
  }
  usersChoiceNotificationsLower[id] = false;
  usersChoiceNotificationsLowerStatus[id] = '';
};

export const postPokemonFainted = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const fainted = req.params.fainted;
  pokemonFainted[id] = fainted;
  faintedNotifications[id] = true;
  res.status(200).json({
    status: 'success',
  });
};

export const getPokemonFainted = async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  console.log('Got /events from fainted', id);

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!faintedNotifications[id]) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (faintedNotifications[id]) {
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${pokemonFainted[id]} delayed\n\n`);
      res.write(`data: ${pokemonFainted[id]}\n\n`);
    }
  }
  faintedNotifications[id] = false;
  pokemonFainted[id] = '';
};

export const postNewOpponentPokemon = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.params.data;
  newOpponentPokemon[id] = data;
  newOpponentPokemonNotification[id] = true;
  res.status(200).json({
    status: 'success',
    data: newOpponentPokemonNotification[id],
  });
};

export const getNewOpponentPokemon = async function (
  req: Request,
  res: Response
) {
  console.log('Got /events');
  const id = parseInt(req.params.id);

  setEventResponse(res);

  // Tell the client to retry every 1 second if connectivity is lost
  res.write('retry: 1000\n\n');
  while (!newOpponentPokemonNotification[id]) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (newOpponentPokemonNotification[id]) {
      // Emit an SSE that contains the current 'count' as a string
      console.log(`data: ${newOpponentPokemon[id]}\n\n`);
      res.write(`data: ${newOpponentPokemon[id]}\n\n`);
    }
  }
  newOpponentPokemon[id] = '';
  newOpponentPokemonNotification[id] = false;
};

export const resetAll = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  usersIntroNotifications = [false, false];
  usersChoiceNotifications = [false, false];
  usersChoices = ['', ''];
  pokemonFainted = ['', ''];
  faintedNotifications = [false, false];
  usersIntroNotificationsLower = [false, false];
  usersChoiceNotificationsLower = [false, false];
  usersChoiceNotificationsLowerStatus = ['', ''];
  completed = false;
  serialNumber = 0;
  newOpponentPokemon = ['', ''];
  newOpponentPokemonNotification = [false, false];
  res.status(200).json({
    status: 'Emergency reset done',
  });
};

function allChoiceNotifications() {
  for (let i = 0; i < usersChoiceNotifications.length; i++) {
    if (!usersChoiceNotifications[i]) {
      return false;
    }
  }
  return true;
}

function setEventResponse(res: Response) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
}
