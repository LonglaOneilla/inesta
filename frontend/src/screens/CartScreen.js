import { useContext } from "react";
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import { Row, Col, ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import { FaMinusCircle, FaPlusCircle, FaTrash } from 'react-icons/fa';

export default function CartScreen() {
    const Navigate=useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert("Sorry! Product is currently out of stock");
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                ...item, quantity
            },
        });
    }

    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const checkoutHandler = (item)=>{
        Navigate('/signin?redirect=/shipping')
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) :
                        (
                            <ListGroup>
                                {
                                    cartItems.map((item) => (
                                        <ListGroupItem key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={4}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded img-thumbnail" />{' '}
                                                    <Link to={`/product/${item.slug}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={3}>
                                                    <Button variant="light"
                                                        onClick={() => updateCartHandler(item, item.quantity - 1)}
                                                        disabled={item.quantity === 1}
                                                    >
                                                        <FaMinusCircle />
                                                    </Button>
                                                    <span>{item.quantity}</span>{' '}
                                                    <Button variant="light"
                                                        onClick={() => updateCartHandler(item, item.quantity + 1)}
                                                        disabled={item.quantity === item.countInStock}
                                                    >
                                                        <FaPlusCircle />
                                                    </Button>
                                                </Col>
                                                <Col md={3}>${item.price}</Col>
                                                <Col md={2}>
                                                    <Button variant="light"
                                                        onClick={() => removeItemHandler(item)}
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) :
                                        $ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <div className="d-grid">
                                        <Button
                                            type='button'
                                            variant="primary"
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}>
                                            Proceed To Checkout
                                        </Button>
                                    </div>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
