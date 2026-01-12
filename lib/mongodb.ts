import mongoose, { Mongoose } from 'mongoose';

// Define TypeScript interface for the cached connection
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global scope to include our cached connection
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Connection configuration with proper typing
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Create a cached connection object to prevent multiple connections during development
const cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

// Store the cached connection in the global scope for development
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose with proper caching
 * to prevent multiple connections during development hot-reload cycles.
 * 
 * @returns {Promise<Mongoose>} A promise that resolves to the Mongoose connection
 * @throws {Error} If the connection fails or MONGODB_URI is not defined
 */
export async function connectDB(): Promise<Mongoose> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection if no promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    // Await the connection promise
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Reset the promise on connection failure
    cached.promise = null;
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

/**
 * Disconnects from MongoDB and cleans up the cached connection.
 * Useful for testing or when you need to explicitly close connections.
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
    global.mongoose = undefined;
    console.log('🔌 MongoDB disconnected');
  }
}

/**
 * Gets the current connection state.
 * 
 * @returns {number} The connection state (0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting)
 */
export function getConnectionState(): number {
  return cached.conn?.connection.readyState ?? 0;
}

/**
 * Checks if the database connection is established and ready.
 * 
 * @returns {boolean} True if connected, false otherwise
 */
export function isConnected(): boolean {
  return getConnectionState() === 1;
}