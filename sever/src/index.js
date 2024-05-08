import Razorpay from 'razorpay';
import { app } from './app.js';
import { connectDB } from './dbConnect.js';

connectDB();

export const instance = new Razorpay({
    key_id: process.env.API_ID,
    key_secret: process.env.API_SECRET,
});

app.listen(process.env.PORT, () => {
    console.log(`Sever Running ${process.env.PORT}`);
});
