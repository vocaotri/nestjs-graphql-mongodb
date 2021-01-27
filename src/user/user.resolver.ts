import { User } from './models/user';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { UserService } from './user.service';
import { UserInput } from './input/user';
const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }
    @Query(() => [User])
    async users() {
        return this.userService.findAll();
    }
    @Mutation(() => User)
    async addUser(@Args('newUserData') newUserData: UserInput): Promise<User> {
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
