import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
export const HobbySchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true }).plugin(mongoosePaginate);