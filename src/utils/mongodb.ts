import { MongoClient, Db } from 'mongodb';

let db: Db | null = null;
let client: MongoClient | null = null;

export async function connectToMongoDB(): Promise<void> {
  if (db) return;

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('task_ctas_5');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectToMongoDB() first.');
  }
  return db;
}

export async function closeMongoDB(): Promise<void> {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log('Disconnected from MongoDB');
  }
}