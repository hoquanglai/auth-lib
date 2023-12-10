import { AuthLibService } from '@app/auth-lib';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/user.schema';

@Injectable()
export class UserService {
  constructor(public authLibService: AuthLibService<Model<UserDocument>>) {}

  async login() {
    const a = await this.authLibService.loginViaSocial({
      token: 'string',
      platform: 'GOOGLE',
    });
    return a;
  }
}
