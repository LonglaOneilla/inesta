
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

//import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import getError from '../util';


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

const Slider = () => {
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
        <div>

            <div className="products">
                {
                    loading ? (<LoadingBox />) :
                        error ? (<MessageBox variant='danger'>{error}</MessageBox>) :
                            (
                                <div className="carousel-div">
                                    <Carousel className='carousel' >
                                        {products.map((product) => (
                                            <Carousel.Item interval={5000} key={product.slug} className='zoom'>
                                                <img
                                                    className="cassimg d-block w-100"
                                                    src={product.image}
                                                    alt="First slide"
                                                    width='auto'
                                                    height='520px'
                                                />
                                                <Carousel.Caption className='capt'>
                                                    <h5>{product.name}</h5>
                                                    <p>{product.description}</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>

                                        ))}
                                    </Carousel>

                                </div>
                            )
                }
            </div>
        </div>
    );
}

export default Slider;
