import { IsNotEmpty, IsEmail, IsString, IsNumber, IsUrl, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PostDto {
  @ApiProperty()
  @IsString() @IsOptional() userId?: string;
  @ApiProperty()
  @IsNotEmpty() @IsString() postTitle: string;
  @ApiProperty()
  @IsNotEmpty() @IsString() postText: string;
  @ApiProperty()
  @IsOptional() @IsUrl()  photoURL?: string;
}

export class UpdatePostDto {
  @ApiProperty()
  @IsNotEmpty() @IsString() postTitle: string;
  @ApiProperty()
  @IsNotEmpty() @IsString() postText: string;
  @ApiProperty()
  @IsOptional() @IsUrl() photoURL?: string;
}

export class PostQueryDto {
  @IsString() postTitle: string;
  @IsString() text: string;
  @IsUrl() photoURL?: string;
}

export class PostFindUsersPostsDto {
  @ApiProperty()
  @IsString() postTitle: string;
  @ApiProperty()
  @IsString() userId: string;
}