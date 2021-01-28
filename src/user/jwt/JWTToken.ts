import { User } from './../interface/user';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
export class JWTService {
    constructor(@InjectModel('users') private readonly userModel: Model<User>) { }

    async generateAccessToken(data): Promise<string> {
        return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '7889232s' });
    }
    async verifyAccessToken(token) {
        let user = await jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return null;
            return user;
        })
        if (user === null)
            return {};
        return await this.userModel.findById(user.id).exec();
    }
    async checkUserLogger(context) {
        let token = "";
        const { headers: { authorization } } = context.req;
        if (authorization) {
            token = authorization.split(" ")[1];
        };
        const user = await this.verifyAccessToken(token);
        if (Object.keys(user).length === 0){
            throw new Error(JSON.stringify(["Token Fail"]));
        }
        return user;
    }
}