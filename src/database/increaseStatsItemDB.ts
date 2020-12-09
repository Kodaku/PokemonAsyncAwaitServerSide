import mongoose from 'mongoose';

const increaseStatsSchema = new mongoose.Schema({
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
  incrementAmount: {
    type: Number,
    required: [true, 'Please specify how much this stats increase'],
  },
  statName: {
    type: String,
    required: [true, 'Please specify the name of this stats'],
    enum: {
      values: [
        'ATTACK',
        'DEFENSE',
        'SPECIAL ATTACK',
        'SPECIAL DEFENSE',
        'SPEED',
      ],
      message:
        'The state cured must be ATTACK, DEFENSE, SPECIAL ATTACK, SPECIAL DEFENSE, SPEED',
    },
  },
});

increaseStatsSchema.pre('save', function (next) {
  console.log('Will save document Increase Stats...');
  next();
});

const IncreaseStat = mongoose.model('IncreaseStat', increaseStatsSchema);

export { IncreaseStat };
