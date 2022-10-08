
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, Badge, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { useContext, useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa';

import Navigation from './screens/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignUpScreen from './screens/SignUpScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';


function App() {

  //let history = useNavigate();
  //Navigation vars start

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  }

  //Navigation vars end 

  return (
    <Router>
      <div className={
        sidebarIsOpen
          ? 'd-flex flex-column site-container active-cont'
          : 'd-flex flex-column site-container'
      }>
        <ToastContainer position="top-center" limit={1} />
        <header>
        
        <Navigation />
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <Button variant="dart"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <FaAlignJustify />
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>
                  LEO-NIC FASION
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name}
                      id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <Link className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar >
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path='/product/:slug' element={<ProductScreen />}></Route>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </Router>
  );
}



export default App;
