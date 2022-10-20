
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, Badge, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from './Store';
import { useContext, useEffect, useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa';

//import Navigation from './screens/Navigation';
import { toast, ToastContainer } from 'react-toastify';
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
import getError from './util';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import Navigation from './screens/Navigation';
import {MDBFooter,MDBContainer, MDBInput,MDBCol,MDBRow,MDBBtn} from 'mdb-react-ui-kit';
import { FaFacebookF,FaTwitter,FaLinkedinIn,FaInstagram,FaGithub } from "react-icons/fa";
import {SiGmail} from 'react-icons/si'



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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`)
        setCategories(data)
      } catch (err) {
        toast.error(getError(err))
      }
    };
    fetchCategories();
  }, []);

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
          <Navbar className='nav2' variant='light' expand='lg'>
            <Container>
              <Button className='justify-content-start sidebarbutton'
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <FaAlignJustify />
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand className='brand'>
                  INESTA FASHION
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
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='admin-nav-dropdown'>
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  <SearchBox />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar >
        </header>
        <div className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }>
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}>
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className='mt-3' fluid>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path='/product/:slug' element={<ProductScreen />}></Route>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/orderhistory" element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              } />
              <Route path="/order/:id" element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              } />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <MDBFooter className='text-center' color='white' bgColor='dark'>
            <MDBContainer className='p-4'>
            <div className='contact-us mb-3'>Contact Us</div>
              <section className='mb-4'>
              
                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                  <FaFacebookF />
                </MDBBtn>

                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                  <FaTwitter />
                </MDBBtn>

                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                  <FaLinkedinIn />
                </MDBBtn>

                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                  <FaInstagram />
                </MDBBtn>

                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                  <SiGmail />
                </MDBBtn>

                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                  <FaGithub />
                </MDBBtn>
              </section>

            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              © 2022 Copyright: {''}
              <a className='text-white' href='/'>
                {''} All Rights Reserved
              </a>
            </div>
          </MDBFooter>
        </footer>
      </div>
    </Router>
  );
}



export default App;
