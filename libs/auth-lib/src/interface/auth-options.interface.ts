export interface AuthLibOptions {
  db: {
    mongo: { model: any; schema: any };
  };
  jwt: string;
  facebook?: FacebookConfigInterface;
  google?: GoogleConfigInterface;
  kakao?: KakaoConfigInterface;
  apple: AppleConfigInterface;
  naver: NaverConfigInterface;
}

export interface FacebookConfigInterface {
  accessToken: string;
}

export interface GoogleConfigInterface {
  accessToken: string;
}

export interface KakaoConfigInterface {
  accessToken: string;
}

export interface AppleConfigInterface {
  accessToken: string;
}

export interface NaverConfigInterface {
  accessToken: string;
}
