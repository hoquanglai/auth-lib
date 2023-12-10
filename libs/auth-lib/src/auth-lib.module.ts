import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { AuthLibService } from './auth-lib.service';
import { AuthLibOptions } from './interface';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceCustom } from './jwt.service';

@Module({})
export class AuthLibModule {
  static forFeature(options: AuthLibOptions): DynamicModule {
    return {
      module: AuthLibModule,
      imports: [
        MongooseModule.forFeature([
          {
            name: options.db.mongo.model.name,
            schema: options.db.mongo.schema,
          },
        ]),
        JwtModule.register({
          secret: 'JwtSecret',
        }),
      ],
      providers: [
        JwtServiceCustom,
        {
          provide: AuthLibService,
          useFactory: (model) => new AuthLibService(model, options.jwt || ''),
          inject: [getModelToken(options.db.mongo.model.name)],
        },
      ],
      exports: [AuthLibService, JwtServiceCustom],
    };
  }
}
