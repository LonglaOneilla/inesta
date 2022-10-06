import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store';
import { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';


export default function ShippingAddressScreen() {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            }
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate('/payment');

    };

    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>

            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId='fullName' >
                        <Form.Label>
                            Full Name
                        </Form.Label>
                        <Form.Control type='text' required
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='address' >
                        <Form.Label>
                            Address
                        </Form.Label>
                        <Form.Control type='text' required
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='city' >
                        <Form.Label>
                            City
                        </Form.Label>
                        <Form.Control type='text' required
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='postalCode' >
                        <Form.Label>
                            Postal Code
                        </Form.Label>
                        <Form.Control required
                            onChange={(e) => setPostalCode(e.target.value)}
                            value={postalCode}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='country' >
                        <Form.Label>
                            Country
                        </Form.Label>
                        <Form.Control type='text' required
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type='submit'
                            variant='primary'>
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}
