import { User } from './models/user';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { UserService } from './user.service';
import { UserInput } from './input/user';
import { JWTService } from './jwt/JWTToken';
const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService,private readonly jwtService: JWTService) { }
    @Query(() => [User])
    async users() {
        return this.userService.findAll();
    }
    @Mutation(() => User)
    async addUser(@Args('newUserData') newUserData: UserInput, @Context() context): Promise<User> {
        let token = "";
        const { headers: { authorization } } = context.req;
        if (authorization) {
            token = authorization.split(" ")[1];
        };
        const user = await this.jwtService.verifyAccessToken(token);
        if (Object.keys(user).length === 0)
            throw new Error("Token failed")
        const userCreate = await this.userService.create(newUserData);
        pubSub.publish('userAdded', { userAdded: newUserData });
        return userCreate;
    }
    @Mutation(() => User)
    async login(@Args('loginUserData') loginUserData: UserInput): Promise<User> {
        const user = await this.userService.login(loginUserData);
        return user;
    }
}
