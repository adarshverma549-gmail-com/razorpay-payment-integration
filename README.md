# Razorpay Payment Integration

This document provides a guide to integrate Razorpay payment method into your project.

## Prerequisites

Before you begin, ensure you have the following:

-   Razorpay Account: Sign up for an account at [Razorpay](https://razorpay.com/).
-   API Key and Secret Key: Obtain your API Key and Secret Key from your Razorpay dashboard.

## Installation

1. Install Razorpay SDK:

```bash
npm install razorpay
```

2. Include Razorpay script in your HTML file:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

## Usage

1. Set up Razorpay

```js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'YOUR_API_KEY',
    key_secret: 'YOUR_SECRET_KEY',
});
```

2. Create a Razorpay Order to `controller` in function **checkout.js**

```js
const options = {
    amount: Number(req.body.amount * 100),      // amount in the smallest currency unit
    currency: 'INR',
};
const order = await instance.orders.create(options);
if (!order) {
    res.status(500).json({ success: false, message: 'Internal error order price' });
}
return res.status(200).json({ success: true, order, message: 'Order price receive successfully' });
```

3. Handle Payment Success

```js
let options = {
    key: 'YOUR_API_KEY',        // Enter the Key ID generated from the Dashboard
    amount: order?.amount,      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Acme Corp',
    description: 'Test Transaction',
    image: image,
    order_id: order?.id,        //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: 'http://localhost:8000/api/payment-verification',
    prefill: {
        name: 'Gaurav Kumar',
        email: 'adarshverma549@gmail.com',
        contact: '7719971779',
    },
    notes: {
        address: 'Razorpay Corporate Office',
    },
    theme: {
        color: '#121212',
    },
};
const rzp1 = new window.Razorpay(options);
rzp1.open();
```

4. Create a Razorpay Order to `controller` in function **payment-verification.js**

```js
const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

let concatString = razorpay_order_id + '|' + razorpay_payment_id;

const generated_signature = crypto
    .createHmac('sha256', process.env.API_SECRET)
    .update(concatString)
    .digest('hex');

if (razorpay_signature === generated_signature) {
    // Save to DataBase
    await Payment.create({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
    });
    // Redirect to UI page
    res.redirect(`http://localhost:5173/payment-success?refrence=${razorpay_payment_id}`);
} else {
    return res.status(400).json({ success: false, message: 'payment not verified properly' });
}
```

## Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Integration Guide](https://razorpay.com/docs/payment-gateway/web-integration/)
```

Feel free to adjust the instructions and code snippets according to your project's requirements.