import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, ValidationPipe, Put, Delete, Req, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto, PostQueryDto, UpdatePostDto, PostFindUsersPostsDto} from './post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiTags,
  ApiProperty,
  ApiQuery,
  ApiBearerAuth,
  
} from '@nestjs/swagger';


@Controller('posts')
export class PostController {
  constructor(private postService: PostService){}

  // GET endpoints
  @ApiOkResponse({ description: 'Find all posts' })
  @Get()
  async findAllPosts(@Query() query: PostQueryDto){
    return await this.postService.findAllPosts(query);
  }
  @ApiOkResponse({ description: 'Find a post with title (case insensitive)' })
  @ApiQuery({
		name: "postTitle",
		description: "Post Title",
		required: true,
		type: String
	})
  @ApiOkResponse({ description: 'Find a post with title (case insensitive)' })
  @ApiQuery({
		name: "postTitle",
		description: "Post Title",
		required: true,
		type: String
	})
  @Get('title/regex')
  async findAllPostsRegex(@Query() query: PostQueryDto){
    return await this.postService.findAllPostsRegex(query.postTitle);
  }

  @ApiOkResponse({ description: 'Find a post with title (case insensitive)' })
  @ApiQuery({
		name: "postTitle",
		description: "Post Title",
		required: true,
		type: String
	})
  @Get('title/userid/regex')
  async findAllPostsUserIdRegex(@Query() query: PostFindUsersPostsDto){
    return await this.postService.findAllPostsUserIdRegex(query.userId,query.postTitle);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return a post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':postTitle')
  @UseGuards(AuthGuard)
  async findPostBypostTitle(@Param('postTitle') postTitle: string){
    return await this.postService.findPostBypostTitle(postTitle);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return a post by title and users id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiQuery({
		name: "postTitle",
		description: "Post Title",
		required: true,
		type: String
	})
  @ApiQuery({
		name: "userId",
		description: "User Id",
		required: true,
		type: String
	})
  @Get('title/userId')
  @UseGuards(AuthGuard) 
  async findPostByPostTitlerUserId(@Query() query, @Req() req: any){
    let userId ='';
    if(req.user.isAdmin) {
      userId = query.userId;
    } else {
      userId = req.user.userId;
    } 
    return await this.postService.findPostByPostTitleUserId(query.postTitle, userId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return a post by user id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('userId/:userId')
  @UseGuards(AuthGuard)
  async findPostsByUserID(@Req() req: any, @Param('userId') id: string){
    const posts = await this.postService.findPostByUserId(id);
    if (posts) {
      return posts;
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  // POST endpoints
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create a post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: PostDto })
  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Body(new ValidationPipe()) post: PostDto, @Req() req: any){

    try{
      const postExists = await this.postService.findAllPostsUserIdRegex(req.user.userId, post.postTitle );
      if (postExists.length){
        throw new Error("dublicate");
      }
      post.userId = req.user.userId;
      return await this.postService.createPost(post);
    } catch (error){
      if (error.message === 'dublicate'){
        throw new HttpException('The post title exists!', HttpStatus.CONFLICT);
      }else{
        throw new HttpException('Unexpected error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update a post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Body(new ValidationPipe()) body: UpdatePostDto, @Param('id') id: string) {
    body.photoURL = body.photoURL === undefined ? '' : body.photoURL;
    const updatePost: any = await this.postService.updatePost(id, body);
    if (!updatePost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return updatePost;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete a post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const deletePost = await this.postService.deletePost(id);
    if (!deletePost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Post deleted successfully', HttpStatus.OK);
  }
}
