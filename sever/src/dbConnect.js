import mongoose from 'mongoose';

export const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI + '/payment');
    console.log(`connected DB : ${connection.host}`);
};
