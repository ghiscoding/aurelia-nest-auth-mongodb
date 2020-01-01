import { Document } from 'mongoose';
import { Provider } from './provider.interface';

export interface User extends Document {
  readonly userId: string;
  readonly displayName: string;
  readonly email: string;
  readonly picture: string;
  readonly provider: string;
  readonly providers: Provider[];
  readonly roles: string[];
  readonly facebook?: string;
  readonly github?: string;
  readonly google?: string;
  readonly linkedin?: string;
  readonly live?: string;
  readonly microsoft?: string;
  readonly twitter?: string;
  readonly windowslive?: string;
}
