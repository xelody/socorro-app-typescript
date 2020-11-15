import {Document, Schema, model} from 'mongoose';

interface DiveEntry extends Document {
  diver: string;
  create_date: Date;
  update_date: Date;
  location: object;
  bottom_time: {
    minutes: number;
    seconds: number;
  };
  depth: number;
  nitrox: boolean;
  summary: string;
  in_time: Date;
  out_time: Date;
}

const LocationSchema = new Schema({
  type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ['Point'], // 'location.type' must be 'Point'
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  name: String,
});

const BottleTimeSchema = new Schema({
  minutes: {
    type: Number,
    required: true,
  },
  seconds: {
    type: Number,
    default: 0,
  },
});

const DiveEntrySchema = new Schema(
  {
    diver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    create_date: {
      type: Date,
      default: Date.now,
    },
    update_date: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: LocationSchema,
      required: true,
    },
    depth: Number,
    bottom_time: BottleTimeSchema,
    nitrox: Boolean,
    summary: String,
    in_time: Date,
    out_time: Date,
  },
  {strict: false},
);

export default model<DiveEntry>('dive_entry', DiveEntrySchema);
