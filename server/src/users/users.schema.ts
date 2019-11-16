import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  displayName: String,
  email: String,
});
