import { Document } from 'mongoose';

export interface Cat extends Document {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly breed: string;
  readonly ownerId: string;
}
