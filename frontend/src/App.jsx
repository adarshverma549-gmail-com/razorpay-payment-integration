import React from 'react';
import { BrowserRouter, Route, Routes,  useSearchParams } from 'react-router-dom';
import { Box, Text, Button, Image, Stack, VStack, Heading } from '@chakra-ui/react';
import image from './assets/logo.webp';
import axios from 'axios';

const Home = () => {
    const checkoutHandler = async (amount) => {
        const { data: apiKey } = await axios.get('http://localhost:8000/api/get-key');

        const {
            data: { order },
        } = await axios.post('http://localhost:8000/api/checkout', { amount });

        let options = {
            key: apiKey?.key, // Enter the Key ID generated from the Dashboard
            amount: order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'Acme Corp',
            description: 'Test Transaction',
            image: image,
            order_id: order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
    };
    return (
        <Box>
            <Stack direction={'row'}>
                <Cart amount={2000} onClicked={checkoutHandler} />
                <Cart amount={4000} onClicked={checkoutHandler} />
            </Stack>
        </Box>
    );
};

const Cart = ({ amount, onClicked }) => {
    return (
        <VStack>
            <Image src={image} width={100} />
            <Text>{amount}</Text>
            <Button onClick={() => onClicked(amount)}>Buy Now</Button>
        </VStack>
    );
};

const Success = () => {
    const query = useSearchParams()[0];
    const refrence = query.get('refrence');
    console.log(refrence);
    return (
        <Box>
            <VStack>
                <Heading textTransform={'uppercase'}>Success Order Payment</Heading>
                <Text>Refrence No. {refrence}</Text>
            </VStack>
        </Box>
    );
};

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/payment-success' element={<Success />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
