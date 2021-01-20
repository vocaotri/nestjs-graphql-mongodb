import * as mongoose from 'mongoose';
export const HobbySchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true })