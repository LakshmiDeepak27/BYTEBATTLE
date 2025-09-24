import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please add Mongo URI in your environment variables");
}

// Define global cache type
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

interface NodeJsGlobal {
  mongoose?: MongooseCache;
}

declare const global: NodeJsGlobal;

// Cached connection to prevent multiple connections
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;

  return cached.conn;
}
