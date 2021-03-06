import { Router } from 'express';
import { checkName, getID } from '../controllers/loginController';

const loginRouter = Router();

loginRouter.route('/login').post(checkName);

loginRouter.route('/players/id/:name').get(getID);

export { loginRouter };
