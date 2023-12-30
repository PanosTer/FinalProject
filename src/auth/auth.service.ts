import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ){}

  async login(credentials: AuthDto): Promise<{access_token: string}>{
    const user = await this.userService.findUserByUsername(
      credentials.username,
    );

    if (!user){
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    //console.log(isPasswordValid)
    if (!isPasswordValid){
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = {
      username: user.username,
      email: user.email,
      fullname: `${user.givenName} ${user.surName}`,
      userId: user['_id'],
      isAdmin: user.isAdmin,
      photoUrl: user.photoURL
    };
    const access_token = this.jwtService.sign(payload);

    return { access_token};
  }
}
