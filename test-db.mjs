import mongoose from 'mongoose';
import { readFileSync } from 'fs';

try {
  const envFile = readFileSync('.env', 'utf-8');
  const match = envFile.match(/MONGODB_URI=(.+)/);
  const uri = match ? match[1].trim() : null;

  if (!uri) {
    console.error("No URI found in .env");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");

  await mongoose.connect(uri);
  console.log("Successfully connected to MongoDB!");
  process.exit(0);
} catch (err) {
  console.error("Connection error:", err.message);
  process.exit(1);
}
