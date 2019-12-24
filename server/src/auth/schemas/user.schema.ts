import * as mongoose from 'mongoose';

export const ProviderSchema = new mongoose.Schema({
  providerId: String,
  name: String,
});

export const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.ObjectId },
  userId: { type: String, unique: true },
  password: String,
  email: { type: String, lowercase: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
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
});
