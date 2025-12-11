import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined in env');

  try {
    await mongoose.connect(uri, {
      // options are now default in newer mongoose versions but keep for clarity
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
