import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type :String,required:true},
    hobbies :[{ type: [mongoose.Schema.Types.ObjectId],required: false , ref: 'hobbies' }],
},{ timestamps: true })