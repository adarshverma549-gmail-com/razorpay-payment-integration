import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema(
    {
        razorpay_payment_id: {
            type: String,
            required: true,
        },
        razorpay_order_id: {
            type: String,
            requried: true,
        },
        razorpay_signature: {
            type: String,
            requried: true,
        },
    },
    { timestamps: true }
);

export const Payment = mongoose.model('Payment', paymentSchema);
