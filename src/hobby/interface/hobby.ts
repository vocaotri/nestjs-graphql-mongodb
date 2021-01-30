import { Document } from 'mongoose';

export interface Hobby extends Document {
  id: string;
  name: string;
  total: number;
  limit: number;
  page: number;
  pages: number;
}