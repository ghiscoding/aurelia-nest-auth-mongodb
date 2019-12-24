export interface User {
  readonly userId: string;
  readonly displayName: string;
  readonly email: string;
  readonly picture: string;
  readonly provider: string;
  readonly providers: [{ id: string; name: string; }];
  readonly roles?: string[];
  readonly facebook?: string;
  readonly github?: string;
  readonly google?: string;
  readonly linkedin?: string;
  readonly live?: string;
  readonly microsoft?: string;
  readonly twitter?: string;
  readonly windowslive?: string;
}
