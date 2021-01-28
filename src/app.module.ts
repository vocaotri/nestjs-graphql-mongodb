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
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'hobbies', schema: HobbySchema }, { name: 'users', schema: UserSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response ? error.extensions.exception.response.message : error.message,
        };
        return graphQLFormattedError;
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, HobbyResolver, HobbyService, UserService, JWTService],
})
export class AppModule { }
