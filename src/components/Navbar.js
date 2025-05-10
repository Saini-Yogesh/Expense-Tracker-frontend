import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getUsername } from '../api/api';
import '../Css/Navbar.css';
import { toast } from 'react-toastify'; // For displaying errors to the user

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [firstName, setFirstName] = useState('User');
    const menuRef = useRef(null);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/login');
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch username when token is available
    useEffect(() => {
        if (token) {
            const fetchUsername = async () => {
                try {
                    const data = await getUsername(token); // API call to fetch the username
                    if (data && data.username) {
                        const splitName = data.username.split(' '); // Split the name by space
                        setFirstName(splitName[0]); // Get the first name
                    } else {
                        toast.error('Username not found. Please try again later.'); // Show error if no username found
                    }
                } catch (err) {
                    console.error('Error fetching username:', err);
                    toast.error('Failed to fetch username. Please try again later.'); // Show error to user
                }
            };
            fetchUsername();
        }
    }, [token]);

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <p>Expense tracker</p>
            </div>

            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className={`navbar-links ${menuOpen ? 'open' : ''}`} ref={menuRef}>
                {token ? (
                    <>
                        <button className="navbar-button" onClick={() => { setMenuOpen(false); navigate('/about'); }}>About Us</button>
                        <button className="navbar-button" onClick={() => { setMenuOpen(false); navigate('/summary'); }}>Summary</button>
                        <button className="navbar-button" onClick={() => { setMenuOpen(false); navigate('/'); }}>Dashboard</button>
                        <button className="navbar-button" onClick={handleLogout}>Logout</button>
                        <button className="navbar-button" style={{ color: "red", cursor: "auto", userSelect: "text" }} >Hi, {firstName.charAt(0).toUpperCase() + firstName.slice(1)}</button>
                    </>
                ) : (
                    <>
                        <button className="navbar-button" onClick={() => { setMenuOpen(false); navigate('/about'); }}>About Us</button>
                        <button className="navbar-button" onClick={() => { setMenuOpen(false); navigate('/login'); }}>Login</button>
                        <button className="navbar-button" onClick={() => { setMenuOpen(false); navigate('/register'); }}>Register</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
