import mongoose, { Document, Schema } from 'mongoose';

export interface IRoomPlayer {
  user: mongoose.Types.ObjectId;
  score: number;
}

export interface IRoom {
  host: mongoose.Types.ObjectId;
  topic: string;
  isActive: boolean;
  players: IRoomPlayer[];
  currentQuestion?: mongoose.Types.ObjectId | null;
  createdAt?: Date;
}

export interface IRoomDoc extends IRoom, Document {}

const roomSchema = new Schema<IRoomDoc>({
  host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  players: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, default: 0 }
    }
  ],
  currentQuestion: { type: Schema.Types.ObjectId, ref: 'Question', default: null },
  createdAt: { type: Date, default: Date.now }
});

export const Room = mongoose.model<IRoomDoc>('Room', roomSchema);
