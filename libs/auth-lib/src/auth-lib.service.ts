import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Model } from 'mongoose';
import { SOCIAL_PLATFORM, TOKEN_TYPE } from './constants';
import { AuthLibServiceInterface } from './interface/auth-lib.service.interface';
import { Social, SocialDto } from './interface/social.interface';

@Injectable()
export class AuthLibService<T> implements AuthLibServiceInterface {
  public jwt: JwtService;
  constructor(
    protected readonly model: Model<T>,
    protected readonly secret: string,
  ) {
    this.jwt = new JwtService({ secret: secret });
  }

  login() {
    throw new Error('Method not implemented.');
  }

  logout() {
    throw new Error('Method not implemented.');
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwt.verify(refreshToken, {
      secret: this.secret,
    });
    if (!payload) {
      throw new Error('Refresh token invalid!');
    }
    // check refreshToken with user request
    const user = await this.model.findOne({
      refreshToken: refreshToken,
    });
    if (!user) {
      throw new Error(`User not found with payload: ${payload}`);
    }
    const accessToken = await this.signTokenRefreshToken(user._id.toString());

    // update token user to database
    await this.model.updateOne(
      {
        _id: user.id,
      },
      {
        accessToken: accessToken,
      },
    );
    return accessToken;
  }

  async loginViaSocial(socialDto: SocialDto): Promise<any> {
    let social: Social;
    switch (socialDto.platform) {
      case SOCIAL_PLATFORM.GOOGLE:
        social = await this.loginGoogle(socialDto.token);
        break;
    }
    const user = await this.model.findOne({ uid: social.uid });
    if (!user) {
      throw new Error(`User not found!`);
    }
    console.log(user);
    const token = this.signToken(user._id.toString());
    return token;
  }

  async loginGoogle(accessToken: string): Promise<Social> {
    accessToken =
      'ya29.a0AfB_byDRPspXiNp3jUOcaw0p8s8NqhqZhwVCnuxvVcMxuu5LKu8HEt0RGmh-Jrc6AJN6bnz4qYVdO_PnVdHDGo-_fgA0wp-QLDsYXS_wyw8XG23QhQ4HUQcYK9Gcoo1QznDekq2dhX1eSt07zurYxvRYdfwbjhK195tCaCgYKARsSARISFQHGX2Mi6qA2IsQwwSoQXxSyXcSopQ0171';
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      const social: Social = {
        uid: response.data.id,
        email: response.data.email,
        name: response.data.name,
        picture: response.data.picture,
      };
      return social;
    } catch (error) {
      throw new Error(`Error fetching user info from Google: ${error.message}`);
    }
  }

  private signToken(id: string) {
    const payload = {
      id: id,
    };
    const accessToken = this.jwt.sign(payload, {
      expiresIn: TOKEN_TYPE.TOKEN_LIFE,
    });
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: TOKEN_TYPE.REFRESH_TOKEN,
    });
    return { accessToken, refreshToken };
  }

  private signTokenRefreshToken(id: string) {
    const payload = {
      id: id,
    };
    const accessToken = this.jwt.sign(payload, {
      expiresIn: TOKEN_TYPE.TOKEN_LIFE,
    });
    return accessToken;
  }
}
