import { IsNotEmpty, IsEmail, IsString, IsNumber, IsUrl, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
   @ApiProperty()
  @IsNotEmpty() @IsString() username: string;
   @ApiProperty()
  @IsNotEmpty() @IsString() @MinLength(8) password: string;
   @ApiProperty()
  @IsNotEmpty() givenName: string;
   @ApiProperty()
  @IsNotEmpty() surName: string;
   @ApiProperty()
  @IsNotEmpty() @IsNumber() age: number;
   @ApiProperty()
  @IsNotEmpty() @IsEmail() email: string;
   @ApiProperty()
  @IsNotEmpty() address: string;
   @ApiProperty()
  @IsOptional() @IsUrl() photoURL?: string;
}

export class UpdateUserDto {
   @ApiProperty()
  @IsNotEmpty() @IsString() username: string;
   @ApiProperty()
  @IsNotEmpty() @IsString() @MinLength(8) password: string;
   @ApiProperty()
  @IsNotEmpty() givenName: string;
   @ApiProperty()
  @IsNotEmpty() surName: string;
   @ApiProperty()
  @IsNotEmpty() @IsNumber() age: number;
   @ApiProperty()
  @IsNotEmpty() @IsEmail() email: string;
   @ApiProperty()
  @IsNotEmpty() address: string;
   @ApiProperty()
  @IsOptional() @IsUrl() photoURL?: string;
} 

export class UserQueryDto {
  @IsString() postTitle: string;
  @IsString() text: string;
  @IsUrl() photoURL?: string;
}

export class UserPasswordDto {
   @ApiProperty()
 @IsNotEmpty() @IsString() @MinLength(8) currentPassword: string;
  @ApiProperty()
 @IsNotEmpty() @IsString() @MinLength(8) newPassword: string;
  @ApiProperty()
 @IsNotEmpty() @IsString() @MinLength(8) confirmPassword: string;
}