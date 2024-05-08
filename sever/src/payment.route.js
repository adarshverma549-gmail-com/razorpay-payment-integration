import { Router } from 'express';
import { checkout, paymentVerification } from './payment.controller.js';

const router = Router();

router.route('/checkout').post(checkout);
router.route('/payment-verification').post(paymentVerification);

export default router;
