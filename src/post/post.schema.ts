import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true})
export class Post{
  @Prop({type: String, required:true}) userId: string;
  @Prop({type: String, required:true}) username: string;
  @Prop({type: String, required:true}) postTitle: string;
  @Prop({type: String, required:true}) postText: string;
  @Prop({type: String, default:null}) photoURL: string;
  @Prop({type: Date}) createdAt?: Date;
  @Prop({type: Date}) updatedAt?: Date;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);