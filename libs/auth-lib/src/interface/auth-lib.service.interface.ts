import { Social, SocialDto } from './social.interface';

export interface AuthLibServiceInterface {
  loginViaSocial(socialDto: SocialDto): Promise<Social>;
  login();
  logout();
  refreshToken(refreshToken: string);
}
