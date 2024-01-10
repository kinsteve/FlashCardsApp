import mongoose, { Error } from 'mongoose';

const connectDB = (mongoUri: string) => {
    return mongoose.connect(mongoUri);
}

export default connectDB;