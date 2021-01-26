import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type :String,required:false},
    password: { type :String,required:true},
    hobbies :[{ type: [mongoose.Schema.Types.ObjectId],required: false , ref: 'hobbies' }],
},{ timestamps: true })