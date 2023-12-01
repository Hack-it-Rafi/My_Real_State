import { Button, Navbar } from 'flowbite-react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthProvider';
const NavBar = () => {

    const location = useLocation();
    const currentPath = location.pathname;
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch();
    }
    return (
        <div>
            <Navbar fluid rounded className='max-w-7xl mx-auto'>
                <Navbar.Brand href="https://flowbite-react.com">
                    <img src="https://www.realtytrac.com/images/rt-logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
                </Navbar.Brand>
                <div className="flex md:order-2">
                <div className="navbar-end gap-4">
                    {location.pathname != "/login" ? (
                        user ?
                            <div className='flex items-center gap-2'>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                </label>
                                <span>{user?.displayName}</span>
                                <Button onClick={handleLogOut} className="btn z">
                                    Sign Out
                                </Button>
                            </div>                         
                            :
                            <Link to="/login">
                                <Button className="btn ">Login</Button>
                            </Link>

                    ) : null}
                </div>
                </div>
                
                <Navbar.Collapse>
                    <Navbar.Link as={Link} to="/" active={currentPath === '/'}>
                        Home
                    </Navbar.Link>
                    <Navbar.Link as={Link} to="/allProperties" active={currentPath === '/allProperties'}>
                        All Properties
                    </Navbar.Link>
                    <Navbar.Link as={Link} to="/dashBoard" active={currentPath === "/dashBoard"}>
                        Dashboard
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;