import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../context/AuthContext';

function Navbar() {

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
        <Nav variant="pills" onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="home" title="Home" href="/">
                Home
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Admin" id="nav-dropdown">
                <NavDropdown.Item eventKey="date-provisioning" href='/date-provisioning'>Provision Dates</NavDropdown.Item>
                <NavDropdown.Item eventKey="reservation-management" href='/reservation-management'>Manange Bookings</NavDropdown.Item>
                <NavDropdown.Item eventKey="user-management" href='/user-management'>Manage Users</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link eventKey="gallery" title="Gallery" href="/gallery">
                    Photo Gallery
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Activities" id="nav-dropdown">
                <NavDropdown.Item eventKey="saco-river" href='/saco-river'>River Tubing</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link eventKey="booking" title="Book Dates" href="/booking">
                Book Dates
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="profile" title="Profile" href="/profile">
                Profile
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="logout">Logout</Nav.Link>
            </Nav.Item>
        </Nav>
      );
    
    const GuestRoutes = () => (
    <Nav variant="pills" onSelect={handleSelect}>
        <Nav.Item>
            <Nav.Link eventKey="home" title="Home" href="/">
                Home
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="gallery" title="Gallery" href="/gallery">
                Photo Gallery
            </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Activities" id="nav-dropdown">
            <NavDropdown.Item eventKey="saco-river" href='/saco-river'>River Tubing</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
            <Nav.Link eventKey="booking" title="Book Dates" href="/booking">
                Book Dates
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="profile" title="Profile" href="/profile">
                Profile
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="logout">Logout</Nav.Link>
        </Nav.Item>
    </Nav>
    );

      const LimitedGuestRoutes = () => (
        <Nav variant="pills" onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="home" title="Home" href="/">
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="gallery" title="Gallery" href="/gallery">
                    Photo Gallery
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Activities" id="nav-dropdown">
                <NavDropdown.Item eventKey="saco-river" href='/saco-river'>River Tubing</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link eventKey="reservations" title="Reservations" href="/reservations">
                    Reservations
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="profile" title="Profile" href="/profile">
                    Profile
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="logout">Logout</Nav.Link>
            </Nav.Item>
        </Nav>
      );

      const PublicRoutes = () => (
        <Nav variant="pills">
            <Nav.Item>
                <Nav.Link eventKey="home" title="Home" href="/">
                    Home
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Activities" id="nav-dropdown">
                <NavDropdown.Item eventKey="saco-river" href='/saco-river'>River Tubing</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link eventKey="login" title="Login" href="/login">
                    Login
                </Nav.Link>
            </Nav.Item>
        </Nav>
      );

    const LoadingIndicator = () => (
        <ul className="list-none m-0 p-0 overflow-hidden flex">
          <li className="flex-shrink-0">Loading...</li>
        </ul>
      );

  return (
    <nav className="bg-black text-white bg-opacity-80 p-2">
      {isLoading ? <LoadingIndicator /> :
        isAdmin ? <AdminRoutes /> :
        isGuest ? <GuestRoutes /> :
        isLimitedGuest ? <LimitedGuestRoutes /> :
        <PublicRoutes />
      }
    </nav>
  );
}

export default Navbar;