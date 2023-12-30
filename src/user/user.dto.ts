import { IsNotEmpty, IsEmail, IsString, IsNumber, IsUrl, MinLength, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty() @IsString() username: string;
  @IsNotEmpty() @IsString() @MinLength(8) password: string;
  @IsNotEmpty() givenName: string;
  @IsNotEmpty() surName: string;
  @IsNotEmpty() @IsNumber() age: number;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() address: string;
  @IsOptional() @IsUrl() photoURL?: string;
}

export class UpdateUserDto {
  @IsNotEmpty() @IsString() username: string;
  @IsNotEmpty() @IsString() @MinLength(8) password: string;
  @IsNotEmpty() givenName: string;
  @IsNotEmpty() surName: string;
  @IsNotEmpty() @IsNumber() age: number;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() address: string;
  @IsOptional() @IsUrl() photoURL?: string;
} 

export class UserQueryDto {
  @IsString() postTitle: string;
  @IsString() text: string;
  @IsUrl() photoURL?: string;
}

export class UserPasswordDto {
 @IsNotEmpty() @IsString() @MinLength(8) currentPassword: string;
 @IsNotEmpty() @IsString() @MinLength(8) newPassword: string;
 @IsNotEmpty() @IsString() @MinLength(8) confirmPassword: string;
}