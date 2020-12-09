import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { playersRouter } from './routers/playersRouter';
import { loginRouter } from './routers/loginRouter';
import { coupleRouter } from './routers/coupleRouter';
import { pokemonRouter } from './routers/pokemonRouter';
import { increasingItemRouter } from './routers/increasingTypeItemRouter';
import { cureRouter } from './routers/cureItemRouter';
import { pokeBallRouter } from './routers/pokeBallRouter';
import { increasingStatsRouter } from './routers/increasingStatsItemsRouter';
import { screenRouter } from './routers/screenRouter';
import { upperLowerRouter } from './routers/upperLower/upperLowerRouter';

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.DATABASE_PASSWORD && process.env.DATABASE) {
  const DB = process.env.DATABASE?.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connection successful!');
    });
}

launchApp();

function launchApp() {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
    );
    next();
  });

  app.use(loginRouter);
  app.use(playersRouter);
  app.use(coupleRouter);
  app.use(pokemonRouter);
  app.use(increasingItemRouter);
  app.use(cureRouter);
  app.use(pokeBallRouter);
  app.use(increasingStatsRouter);
  app.use(screenRouter);
  app.use(upperLowerRouter);

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
}
