import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthLibModule } from '@app/auth-lib';
import { User, UserSchema } from 'src/models/user.schema';

@Module({
  imports: [
    forwardRef(() =>
      AuthLibModule.forFeature({
        db: {
          mongo: {
            model: User,
            schema: UserSchema,
          },
        },
        apple: undefined,
        naver: undefined,
        jwt: 'KEY',
      }),
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, User],
})
export class UserModule {}
