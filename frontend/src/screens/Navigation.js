import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { useContext } from 'react';

const Navigation = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href='/signin';
    }

    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
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
    );
}

export default Navigation;