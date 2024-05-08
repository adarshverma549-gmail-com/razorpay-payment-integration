import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

config({ path: './.env' });

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(express.static('public'));

import paymentRoute from './payment.route.js';

app.use('/api', paymentRoute);

// Key pass
app.get('/api/get-key', (req, res) => {
    res.status(200).json({ key: process.env.API_ID });
});

export { app };
