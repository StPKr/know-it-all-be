import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  passwordHash?: string | null;
  oauthProvider?: string | null;
  oauthId?: string | null;
  createdAt?: Date;
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema<IUserDoc>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  oauthProvider: { type: String },
  oauthId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUserDoc>('User', userSchema);
