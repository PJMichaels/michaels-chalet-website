import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function ResponsiveNavbar() {
  const { isLoggedIn, isLoading, logout, userGroups } = useAuth();
  const isAdmin = isLoggedIn && userGroups.includes('Admin');
  const isGuest = isLoggedIn && userGroups.includes('Guest');
  const isLimitedGuest = isLoggedIn && userGroups.includes('LimitedGuest');

  const handleSelect = (eventKey) => {
    if (eventKey === 'logout') {
      logout();
    }
  };

  const AdminRoutes = () => (
    <Nav className="me-auto text-white" onSelect={handleSelect}>
      <Nav.Link href="/">Home</Nav.Link>
      <NavDropdown title="Admin" id="admin-nav-dropdown">
        <NavDropdown.Item href="/date-provisioning">Provision Dates</NavDropdown.Item>
        <NavDropdown.Item href="/reservation-management">Manage Bookings</NavDropdown.Item>
        <NavDropdown.Item href="/user-management">Manage Users</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/gallery">Photo Gallery</Nav.Link>
      <NavDropdown title="Activities" id="activities-nav-dropdown">
        <NavDropdown.Item href="/saco-river">River Tubing</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/booking">Reservations</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link eventKey="logout">Logout</Nav.Link>
    </Nav>
  );

  const GuestRoutes = () => (
    <Nav className="me-auto text-white" onSelect={handleSelect}>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/gallery">Photo Gallery</Nav.Link>
      <NavDropdown title="Activities" id="activities-nav-dropdown">
        <NavDropdown.Item href="/saco-river">River Tubing</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/booking">Reservations</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link eventKey="logout">Logout</Nav.Link>
    </Nav>
  );

  const LimitedGuestRoutes = () => (
    <Nav className="me-auto" onSelect={handleSelect}>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/gallery">Photo Gallery</Nav.Link>
      <NavDropdown title="Activities" id="activities-nav-dropdown">
        <NavDropdown.Item href="/saco-river">River Tubing</NavDropdown.Item>
      </NavDropdown>
      {/* <Nav.Link href="/reservations">Reservations</Nav.Link> */}
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link eventKey="logout">Logout</Nav.Link>
    </Nav>
  );

  const PublicRoutes = () => (
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <NavDropdown title="Activities" id="activities-nav-dropdown">
        <NavDropdown.Item href="/saco-river">River Tubing</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav>
  );

  const LoadingIndicator = () => (
    <div>Loading...</div>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isLoading ? <LoadingIndicator /> :
            isAdmin ? <AdminRoutes /> :
            isGuest ? <GuestRoutes /> :
            isLimitedGuest ? <LimitedGuestRoutes /> :
            <PublicRoutes />
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResponsiveNavbar;
