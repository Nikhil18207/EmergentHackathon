import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/emergent_hackathon';

    // Skip MongoDB connection if using mock auth (for hackathon demo)
    if (process.env.USE_MOCK_AUTH === 'true') {
      console.log('🚀 Running with in-memory authentication (no MongoDB required)');
      console.log('💡 Users will be stored in memory - data will be lost on server restart');
      return;
    }

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('');
    console.log('💡 TIP: For hackathon demo without MongoDB:');
    console.log('   Add USE_MOCK_AUTH=true to your .env file');
    console.log('   This will use in-memory storage instead');
    console.log('');
    console.warn('⚠️  Running without database connection');
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

export default connectDB;
