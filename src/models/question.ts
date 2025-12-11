import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
  topic: string;
  difficulty: number;
  questionText: string;
  hint?: string;
  answer: string;
  points: number;
  isApproved: boolean;
  createdBy?: mongoose.Types.ObjectId;
  createdAt?: Date;
}

export interface IQuestionDoc extends IQuestion, Document {}

const questionSchema = new Schema<IQuestionDoc>({
  topic: { type: String, required: true },
  difficulty: { type: Number, required: true, min: 1, max: 5 },
  questionText: { type: String, required: true },
  hint: { type: String },
  answer: { type: String, required: true },
  points: { type: Number, required: true },
  isApproved: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export const Question = mongoose.model<IQuestionDoc>('Question', questionSchema);
