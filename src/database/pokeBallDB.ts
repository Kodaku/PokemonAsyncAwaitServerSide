import mongoose from 'mongoose';

const pokeBallSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: [true, 'An item must have a unique index'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'An item must a name'],
  },
  description: {
    type: String,
    required: [true, 'An item must have a description'],
  },
  category: {
    type: String,
    required: [true, 'Please specify if this is an ITEM, MEDICINE or BERRIES'],
  },
  catchProbability: {
    type: [Number],
    required: [true, 'A Poké Ball must indicate the catch probability'],
  },
});

pokeBallSchema.pre('save', function (next) {
  console.log('Will save document Poke Balls...');
  next();
});

const PokeBall = mongoose.model('PokeBall', pokeBallSchema);

export { PokeBall };
