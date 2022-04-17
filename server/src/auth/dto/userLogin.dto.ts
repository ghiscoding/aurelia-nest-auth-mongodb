import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsEmail()
  @ApiProperty({ example: 'someone@company.com', description: 'User\'s Email', type: () => 'string' })
  readonly username: { type: string, lowercase: true };

  @IsString()
  @MinLength(5)
  @ApiProperty({ description: 'User\'s Password (only applies when using username/password)', type: () => 'string' })
  readonly password: string;
}
