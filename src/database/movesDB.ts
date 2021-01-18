import mongoose from 'mongoose';

const moveSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: [true, 'Insert the move index'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Enter the move name'],
  },
  pp: {
    type: Number,
    required: [true, 'A move must have its PP'],
  },
  power: {
    type: Number,
    required: [true, 'You must specify the move power'],
  },
  type: {
    type: String,
    required: [true, 'Enter the move type'],
  },
  accuracy: {
    type: Number,
    required: [true, 'Enter the move accuracy'],
  },
  typology: {
    type: String,
    required: [true, 'Specify if the move is SPECIAL or PHYSICAL'],
  },
});

moveSchema.pre('save', function (next) {
  console.log('Will save document Moves...');
  next();
});

const Move = mongoose.model('Move', moveSchema);

export { Move };
