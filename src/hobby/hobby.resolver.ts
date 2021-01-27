import { PaginateInput } from './input/paginate';
import { Hobby } from './models/hobby';
import { HobbyService } from './hobby.service';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { HobbyInput } from './input/hobby';
import { PubSub } from 'apollo-server-express';
const pubSub = new PubSub();
@Resolver()
export class HobbyResolver {
    constructor(private readonly hobbyService : HobbyService){}
    @Query(()=>[Hobby])
    async hobbies(@Args('paginate') paginate: PaginateInput){
        return this.hobbyService.findAll(paginate);
    }
    @Mutation(returns =>Hobby)
    async addHobby(@Args('newHobbyData') newHobbyData:HobbyInput):Promise<Hobby>{
        const hobby = await this.hobbyService.create(newHobbyData);
        pubSub.publish('hobbyAdded', { hobbyAdded: hobby });
        return hobby;
    }
    @Subscription(returns =>Hobby)
    hobbyAdded(){
        return pubSub.asyncIterator('hobbyAdded');
    }
}
