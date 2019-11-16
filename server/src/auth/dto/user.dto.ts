import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email: { type: string, lowercase: true };

  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  readonly password: string;

  @ApiModelProperty()
  @IsString()
  readonly displayName: string;

  @ApiModelProperty()
  readonly id?: string;

  @ApiModelProperty()
  readonly userId?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly picture?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly provider?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly username?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly facebook?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly github?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly google?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly linkedin?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly live?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly microsoft?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly twitter?: string;

  @ApiModelProperty()
  @IsOptional()
  readonly windowslive?: string;

}
