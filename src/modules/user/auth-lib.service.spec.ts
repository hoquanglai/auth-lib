import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AuthLibModule } from '../../../libs/auth-lib/src/auth-lib.module';
import { AuthLibService } from '../../../libs/auth-lib/src/auth-lib.service';
import { UserDocument, UserSchema } from '@models/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthLibService', () => {
  let service: AuthLibService<Model<UserDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthLibModule.forFeature({
          db: {
            mongo: {
              model: 'User', // Use string 'User' instead of imported User
              schema: UserSchema,
            },
          },
          apple: undefined,
          naver: undefined,
          jwt: 'KEY',
        }),
      ],
      providers: [
        AuthLibService,
        {
          provide: AuthLibService,
          useFactory: (model) => new AuthLibService(model, ''),
          inject: [getModelToken('User')],
        },
      ],
    }).compile();

    service = module.get<AuthLibService<Model<UserDocument>>>(AuthLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
