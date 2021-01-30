import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
export const HobbySchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
HobbySchema.plugin(mongoosePaginate);