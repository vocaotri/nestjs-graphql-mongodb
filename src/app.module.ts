import { HobbySchema } from './hobby/hobby.schema';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './user/user.resolver';
import { HobbyResolver } from './hobby/hobby.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { HobbyService } from './hobby/hobby.service';
import { UserService } from './user/user.service';
import { UserSchema } from './user/user.schema';
import { ConfigModule } from '@nestjs/config';
import { JWTService } from './user/jwt/JWTToken';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'hobbies', schema:  HobbySchema},{ name: 'users', schema:  UserSchema}]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, HobbyResolver, HobbyService, UserService,JWTService],
})
export class AppModule {}
