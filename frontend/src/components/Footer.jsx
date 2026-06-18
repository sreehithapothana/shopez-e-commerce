import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>About ShopEZ</h4>
            <p style={{ color: 'var(--text-muted)' }}>We provide the best tech products at the most affordable prices. Quality and customer satisfaction guaranteed.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <li>Email: support@shopez.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Tech Street, NY</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ShopEZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
