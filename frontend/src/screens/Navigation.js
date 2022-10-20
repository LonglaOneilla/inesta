
import { Navbar, Container, Nav, NavDropdown, } from 'react-bootstrap';


const Navigation = () => {

    function languageHandler(prop) {

        return prop
    }

    function currencyHandler(prop) {

        return prop
    }


    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>

                <Navbar.Brand>
                    ANNOUNCEMENTS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto w-100 justify-content-end">


                        <NavDropdown title={'currency'}
                            id="basic-nav-dropdown">

                            <NavDropdown.Item
                                onClick={currencyHandler("usd")}
                            >USD</NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={currencyHandler("xaf")}
                            >XAF</NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title={'Language'}
                            id="basic-nav-dropdown">

                            <NavDropdown.Item
                                onClick={languageHandler('english')}
                            >English</NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={languageHandler("french")}
                            >French</NavDropdown.Item>

                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navigation;