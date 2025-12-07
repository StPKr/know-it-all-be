import { Request, Response } from 'express';
import { Room } from '../models/room';
import mongoose from 'mongoose';

export const createRoom = async (req: Request, res: Response) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ message: 'topic required' });

  const room = new Room({
    host: req.user?.id,
    topic,
    players: [{ user: req.user?.id, score: 0 }]
  });

  await room.save();
  res.status(201).json({ room });
};

export const joinRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: 'Room not found' });

  // prevent duplicate join
  const already = room.players.some(p => p.user.toString() === req.user?.id);
  if (!already) room.players.push({ user: req.user?.id, score: 0 });

  await room.save();
  res.json({ room });
};

export const getRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await Room.findById(roomId)
    .populate('players.user', 'username email')
    .populate('host', 'username email')
    .populate('currentQuestion');
  if (!room) return res.status(404).json({ message: 'Room not found' });

  res.json({ room });
};
