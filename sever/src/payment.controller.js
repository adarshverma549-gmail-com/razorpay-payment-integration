import crypto from 'crypto';
import { instance } from './index.js';
import { Payment } from './payment.model.js';

export const checkout = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100), // amount in the smallest currency unit
        currency: 'INR',
    };
    const order = await instance.orders.create(options);
    return res.status(200).json({ success: true, order });
};

export const paymentVerification = async (req, res) => {
    // razorpay_payment_id: 'pay_O7tw08kTPEjPQn',
    // razorpay_order_id: 'order_O7tur7h8mv3uv4',
    // razorpay_signature: '9fdb67e0fd6bef0857847c3fc657aa5521bbf39d1cf1463f1d6fad231cd6008b'

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    let concatString = razorpay_order_id + '|' + razorpay_payment_id;

    const generated_signature = crypto
        .createHmac('sha256', process.env.API_SECRET)
        .update(concatString)
        .digest('hex');

    if (razorpay_signature === generated_signature) {
        // Save to DataBase
        const data = await Payment.create({
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_signature: razorpay_signature,
        });
        console.log(data);
        res.redirect(`http://localhost:5173/payment-success?refrence=${razorpay_payment_id}`);
    } else {
        return res.status(400).json({ success: false });
    }
};
