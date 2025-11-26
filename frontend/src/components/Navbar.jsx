import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function AppNavbar() {
  return (
    
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg" className="shadow-sm w-100">

      <Container>
        <Navbar.Brand className="fw-bold fs-4">EngiSafe</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/workers" className="nav-link">
              Workers
            </NavLink>
            <NavLink to="/equipment" className="nav-link">
              Equipment
            </NavLink>
            <NavLink to="/incidents" className="nav-link">
              Incidents
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
