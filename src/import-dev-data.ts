import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { Pokemon } from './database/pokemonDB';
import { Move } from './database/movesDB';

dotenv.config({ path: '../config.env' });

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

  //READ JSON FILE
  const pokemons = JSON.parse(fs.readFileSync(`../data/moves.json`, 'utf-8'));

  //IMPORT DATA INTO DB
  const importData = async () => {
    try {
      await Move.create(pokemons);
      console.log('Data successfully loaded');
      process.exit();
    } catch (err) {
      console.log(err);
    }
  };

  //DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await Move.deleteMany({});
      console.log('Data successfully deleted');
    } catch (err) {
      console.log(err);
    }
  };

  importData();
}
