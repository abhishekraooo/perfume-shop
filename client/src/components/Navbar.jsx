import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Perfume Shop</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </div>
    </nav>
  );
};
export default Navbar;