import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User} from './user.schema';
import { Model } from 'mongoose';
import { UserDto, UpdateUserDto} from './user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

    // find methods

    async findAllUsers(query: any): Promise<User[]>{
      return await this.userModel.find(query).exec();
    }

    async findUserByUsername(username: string): Promise<User> {
      return await this.userModel.findOne({username});
    }

    async findUserByEmail(email: string): Promise<User>{
      return await this.userModel.findOne({email}).exec();
    }

    
    async findUserById(userId: string): Promise<User>{
      return await this.userModel.findOne({_id : userId}).exec();
    }

    // create methods

    async createUser(user: UserDto): Promise<User> {
      const { password } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({...user, password: hashedPassword });
      return await newUser.save();
    }

    async createUsers(users: UserDto[]): Promise<User[]>{
      const newUsers = users.map((user) => new this.userModel(user));
      return await this.userModel.insertMany(newUsers);
    }

    async updateUser(userId: string, updatePosrDto: UpdateUserDto): Promise<User> {
      return await this.userModel.findByIdAndUpdate(userId, updatePosrDto, { new: true });
    }

    async updateUserPassword(userId: string, password: string): Promise<User> {
      return await this.userModel.findByIdAndUpdate(userId, {password : password});
    }

    async deleteUser(userId: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userId);
  }
  }
