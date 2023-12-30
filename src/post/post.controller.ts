import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, ValidationPipe, Put, Delete, Req, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto, PostQueryDto, UpdatePostDto, PostFindUsersPostsDto} from './post.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('posts')
export class PostController {
  constructor(private postService: PostService){}

  // GET endpoints

  @Get()
  async findAllPosts(@Query() query: PostQueryDto){
    return await this.postService.findAllPosts(query);
  }

  @Get('title/regex')
  async findAllPostsRegex(@Query() query: PostQueryDto){
    return await this.postService.findAllPostsRegex(query.postTitle);
  }

  @Get('title/userid/regex')
  async findAllPostsUserIdRegex(@Query() query: PostFindUsersPostsDto){
    return await this.postService.findAllPostsUserIdRegex(query.userId,query.postTitle);
  }


  @Get(':postTitle')
  @UseGuards(AuthGuard)
  async findPostBypostTitle(@Param('postTitle') postTitle: string){
    return await this.postService.findPostBypostTitle(postTitle);
  }

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
