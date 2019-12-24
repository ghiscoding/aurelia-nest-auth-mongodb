import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsEmail()
  @ApiProperty({ example: 'someone@company.com', description: 'User\s Email' })
  readonly email: { type: string, lowercase: true };

  @IsString()
  @MinLength(5)
  @ApiProperty({ description: 'User\s Password (only applies when using username/password)' })
  readonly password?: string;

  @IsString()
  @ApiProperty({ description: 'User\s Display Name to use in the UI' })
  readonly displayName: string;

  readonly id?: string;

  @ApiProperty({ description: 'User Id (when defined)' })
  readonly userId?: string;

  @IsOptional()
  @ApiProperty({ description: 'User\s Profile Picture URL' })
  readonly picture?: string;

  @IsOptional()
  @ApiProperty({ description: 'User\s Original OAuth2 Provider' })
  readonly provider?: string;

  @ApiProperty({ description: 'User\s Role(s)' })
  readonly roles: string[];

  @IsOptional()
  @ApiProperty({ description: 'User\s Username (only applies when using username/password)' })
  readonly username?: string;

  @IsOptional()
  @ApiProperty({ description: 'Facebook User Id when using OAuth2 to Login' })
  readonly facebook?: string;

  @IsOptional()
  @ApiProperty({ description: 'GitHub User Id when using OAuth2 to Login' })
  readonly github?: string;

  @IsOptional()
  @ApiProperty({ description: 'Google User Id when using OAuth2 to Login' })
  readonly google?: string;

  @IsOptional()
  @ApiProperty({ description: 'LinkedIn User Id when using OAuth2 to Login' })
  readonly linkedin?: string;

  @IsOptional()
  @ApiProperty({ description: 'Microsoft Windows Live User Id when using OAuth2 to Login' })
  readonly live?: string;

  @IsOptional()
  @ApiProperty({ description: 'Microsoft User Id when using OAuth2 to Login' })
  readonly microsoft?: string;

  @IsOptional()
  @ApiProperty({ description: 'Twitter User Id when using OAuth2 to Login' })
  readonly twitter?: string;

  @IsOptional()
  @ApiProperty({ description: 'Microsoft Windows Live User Id when using OAuth2 to Login' })
  readonly windowslive?: string;
}
