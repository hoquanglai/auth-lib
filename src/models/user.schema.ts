import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

import { BaseSchema, DefaultSchema } from '@models/index';

export type UserDocument = HydratedDocument<User>;
@DefaultSchema()
export class User extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  nickName: string;

  @Prop({
    type: String,
    required: true,
  })
  avatar: string;

  @Prop({
    type: String,
    required: false,
  })
  uuid: string;

  @Exclude()
  @Prop({
    type: String,
    index: false,
  })
  accessToken: string;

  @Exclude()
  @Prop({
    type: String,
    index: false,
  })
  refreshToken: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  isBlocked: boolean;

  @Prop({
    type: [],
    required: true,
  })
  pictures: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
