import {Document, Schema, model} from 'mongoose';

interface ThirdPartyProvider {
  name: string;
  id: string;
  type: object;
}

interface User extends Document {
  username: string;
  password: string;
  third_party_auth: [ThirdPartyProvider];
  dives: [{}];
}

const ThirdPartyProviderSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  data: {
    type: {},
    default: null,
  },
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    third_party_auth: [ThirdPartyProviderSchema],
    date: {
      type: Date,
      default: Date.now,
    },
    dives: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DiveEntry',
      },
    ],
  },
  {strict: false},
);

export default model<User>('user', UserSchema);
