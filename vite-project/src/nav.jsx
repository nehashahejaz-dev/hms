import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaCartArrowDown } from "react-icons/fa";


function Header() {
  return (
    <>
    <Navbar expand="lg" className="custom_nav">
      <Container>
        <Navbar.Brand href="#home" className='nav-item-anim'><img src="/image/logo.png" alt="" width={60} height={40} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">
            <Nav.Link href="#home" className='nav-item-anim'>Home</Nav.Link>
            <Nav.Link href="#link" className='nav-item-anim'>About Us</Nav.Link>
            <NavDropdown title="Rooms" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" className='nav-item-anim'>single bed room</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              luxuary room  
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
              <NavDropdown.Divider />
             
            </NavDropdown>
                <Nav.Link href="#home">Contact us</Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                     <Nav.Link href="#home">Faq </Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
          </Nav>
          
           <div className='d-flex justify-content-end gap-2'>
<button className='icon-button nav-item-anim'><FaCartArrowDown  className='icon'/></button>
<input type='serach'></input>
           </div>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
    
</>
  );
}

export default Header;