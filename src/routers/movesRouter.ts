import { Router } from 'express';
import { getAllMoves, getMove } from '../controllers/movesController';

const movesRouter = Router();

movesRouter.route('/moves/all').get(getAllMoves);

movesRouter.route('/moves/get-move').get(getMove);

export { movesRouter };
