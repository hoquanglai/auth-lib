import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_TYPE } from './constants';

@Injectable()
export class JwtServiceCustom {
  constructor(private jwtService: JwtService) {
    console.log('----------------ok');
    const a = new JwtService({ secret: 'JwtSecret' });
    console.log(jwtService);
    console.log(a);
  }

  signToken(id: string) {
    const payload = {
      id: id,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: TOKEN_TYPE.TOKEN_LIFE,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: TOKEN_TYPE.REFRESH_TOKEN,
    });
    return { accessToken, refreshToken };
  }
}
