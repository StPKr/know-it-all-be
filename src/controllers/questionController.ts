import { Request, Response } from 'express';
import { Question } from '../models/question';
import mongoose from 'mongoose';

export const listApproved = async (req: Request, res: Response) => {
  const { topic, difficulty, limit = 20 } = req.query;
  const filter: any = { isApproved: true };
  if (topic) filter.topic = topic;
  if (difficulty) filter.difficulty = Number(difficulty);
  const questions = await Question.find(filter).limit(Number(limit)).lean();
  res.json({ questions });
};

export const createQuestion = async (req: Request, res: Response) => {
  const { topic, difficulty, questionText, hint, answer, points } = req.body;
  if (!topic || !difficulty || !questionText || !answer || !points)
    return res.status(400).json({ message: 'Missing fields' });

  const q = new Question({
    topic,
    difficulty,
    questionText,
    hint,
    answer,
    points,
    createdBy: req.user?.id
  });

  await q.save();
  res.status(201).json({ message: 'Question submitted for review', question: q });
};
