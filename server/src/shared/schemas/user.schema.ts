import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const ProviderSchema = new Schema({
  providerId: String,
  name: String,
});

export const UserSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  userId: { type: String, unique: true },
  password: String,
  email: { type: String, lowercase: true, unique: true },
  displayName: String,
  provider: String,
  providers: [ProviderSchema],
  roles: [String],
  picture: String,
  facebook: String,
  foursquare: String,
  google: String,
  github: String,
  linkedin: String,
  live: String,
  microsoft: String,
  twitter: String,
  windowslive: String,
}, { timestamps: true });
