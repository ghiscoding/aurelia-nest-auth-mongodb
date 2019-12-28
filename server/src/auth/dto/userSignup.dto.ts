import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignupDto {
  @IsEmail()
  // @ApiProperty({ example: 'someone@company.com', description: 'User\s Email', type: () => String })
  readonly email: { type: string, lowercase: true };

  @IsString()
  @MinLength(5)
  @ApiProperty({ description: 'User\s Password (only applies when using username/password)', type: () => String })
  readonly password: string;

  @IsString()
  @ApiProperty({ description: 'User\'s Display Name to use in the UI', type: () => String })
  readonly displayName: string;

  readonly id?: string;

  @ApiProperty({ description: 'User Id when defined', type: () => String })
  readonly userId?: string;
}
