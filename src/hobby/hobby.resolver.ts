import { PaginateInput } from './input/paginate';
import { Hobby } from './models/hobby';
import { HobbyService } from './hobby.service';
import { Args, Mutation, Query, Resolver, Subscription,Context } from '@nestjs/graphql';
import { HobbyInput } from './input/hobby';
import { PubSub } from 'apollo-server-express';
import { JWTService } from '../user/jwt/JWTToken';
const pubSub = new PubSub();
@Resolver()
export class HobbyResolver {
    constructor(private readonly hobbyService : HobbyService,private readonly jwtService: JWTService){}
    @Query(()=>[Hobby])
    async hobbies(@Args('paginate') paginate: PaginateInput){
        return this.hobbyService.findAll(paginate);
    }
    @Mutation(returns =>Hobby)
    async addHobby(@Args('newHobbyData') newHobbyData:HobbyInput, @Context() context):Promise<Hobby>{
        let token = "";
        const { headers: { authorization } } = context.req;
        if (authorization) {
            token = authorization.split(" ")[1];
        };
        const user = await this.jwtService.verifyAccessToken(token);
        if (Object.keys(user).length === 0)
            throw new Error("Token failed")
        const hobby = await this.hobbyService.create(newHobbyData);
        pubSub.publish('hobbyAdded', { hobbyAdded: hobby });
        return hobby;
    }
    @Subscription(returns =>Hobby)
    hobbyAdded(){
        return pubSub.asyncIterator('hobbyAdded');
    }
}
