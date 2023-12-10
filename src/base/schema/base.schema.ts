import { applyDecorators } from '@nestjs/common';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const DefaultSchema = (collection?: string) => {
  const config: any = {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  };
  if (collection) config.collection = collection;
  return applyDecorators(Schema(config));
};

export class BaseSchema {
  _id?: Types.ObjectId;

  @Prop({
    default: false,
  })
  isDeleted: boolean;

  @Prop({
    required: false,
  })
  updatedAt: Date;

  @Prop({
    required: false,
    index: true,
  })
  createdAt: Date;

  @Prop({
    type: Types.ObjectId,
    required: false,
  })
  deletedBy: Types.ObjectId;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
