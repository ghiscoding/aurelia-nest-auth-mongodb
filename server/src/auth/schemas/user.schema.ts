import * as mongoose from 'mongoose';

export const ProviderSchema = new mongoose.Schema({
  providerId: String,
  name: String,
});

export const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.ObjectId },
  userId: String,
  password: String,
  email: { type: String, lowercase: true, unique: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  displayName: String,
  provider: String,
  providers: [ProviderSchema],
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
});
