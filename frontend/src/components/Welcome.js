import { useReducer, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import getError from '../util';
import { Button, Col, Row } from 'react-bootstrap';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const Welcome = () => {

    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: '',
    });
    //const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }

            //setProducts(result.data);

        };
        fetchData();
    }, []);

    return (
        <div className="welcome">

            <Row>
                <Col md={6} className='mb-5' >
                    <center>
                        <p className='collections'>Check out our latest collections</p>
                        <p className="collection">
                            Get 50% off New Arrivals
                        </p>

                        <Button>Shop Now</Button>
                    </center>
                </Col>
                <Col md={6}>
                    <img src="leo.png" alt="" width="auto"
                        className='justify-content-end' />
                </Col>
            </Row>

        </div>
    );
}

export default Welcome;