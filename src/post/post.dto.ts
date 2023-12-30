import { IsNotEmpty, IsEmail, IsString, IsNumber, IsUrl, MinLength, IsOptional } from 'class-validator';

export class PostDto {
  @IsString() @IsOptional() userId?: string;
  @IsNotEmpty() @IsString() postTitle: string;
  @IsNotEmpty() @IsString() postText: string;
  @IsOptional() @IsUrl()  photoURL?: string;
}

export class UpdatePostDto {
  @IsNotEmpty() @IsString() postTitle: string;
  @IsNotEmpty() @IsString() postText: string;
  @IsOptional() @IsUrl() photoURL?: string;
}

export class PostQueryDto {
  @IsString() postTitle: string;
  @IsString() text: string;
  @IsUrl() photoURL?: string;
}

export class PostFindUsersPostsDto {
  @IsString() postTitle: string;
  @IsString() userId: string;
}