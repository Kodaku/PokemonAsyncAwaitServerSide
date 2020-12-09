import mongoose from 'mongoose';

const cureTypeSchema = new mongoose.Schema({
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
    required: [true, 'Please specify if this is an ITEM, MEDICINES or BERRIES'],
  },
  stateCured: {
    type: String,
    required: [
      true,
      'This type of Item must specify what kind of disease will cure',
    ],
    enum: {
      values: ['POISONED', 'PARALYZED', 'BURNED', 'ASLEEP', 'FREEZED', 'ALL'],
      message:
        'The state cured must be POISONED, PARALYZED, BURNED, ASLEEP, FREEZED, ALL',
    },
  },
});

cureTypeSchema.pre('save', function (next) {
  console.log('Will save document Cure Items...');
  next();
});

const CureItem = mongoose.model('Cure', cureTypeSchema);

export { CureItem };
