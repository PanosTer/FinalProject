import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  // [x: string]: any;
  
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: AuthDto })
  async login(
    @Body(new ValidationPipe()) credentials: AuthDto,
  ): Promise<{access_token: string}>{
    return this.authService.login(credentials);
  }
}
