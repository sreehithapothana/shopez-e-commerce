import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { userInfo, logout } = useContext(AuthContext);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/customer/search/${keyword}`);
    } else {
      navigate('/customer/products');
    }
  };

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to={userInfo?.isAdmin ? '/admin/dashboard' : '/customer/dashboard'} className="logo">
          ShopEZ {userInfo?.isAdmin && <span style={{ fontSize: '1rem', color: 'var(--danger-color)' }}>(Admin)</span>}
        </Link>
        
        {!userInfo?.isAdmin && (
          <form onSubmit={submitHandler} className="search-bar" style={{ display: 'flex', flex: 1, maxWidth: '500px', margin: '0 2rem' }}>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="form-control" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
            <button type="submit" className="btn btn-primary search-btn" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Search</button>
          </form>
        )}

        <nav className="nav-links">
          {userInfo && userInfo.isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/admin/products" className="nav-link">Products</Link>
              <Link to="/admin/add-product" className="nav-link">Add Product</Link>
              <Link to="/admin/orders" className="nav-link">Orders</Link>
              <Link to="/admin/customers" className="nav-link">Customers</Link>
              <button onClick={logoutHandler} className="btn btn-ghost" style={{ marginLeft: '1rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/customer/dashboard" className="nav-link">Home</Link>
              <Link to="/customer/products" className="nav-link">Products</Link>
              <Link to="/customer/cart" className="nav-link">
                Cart {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
              </Link>
              {userInfo && (
                <>
                  <Link to="/customer/orders" className="nav-link">Orders</Link>
                  <Link to="/customer/profile" className="nav-link" style={{ fontWeight: 'bold' }}>{userInfo.name}</Link>
                </>
              )}
              {userInfo ? (
                <button onClick={logoutHandler} className="btn btn-ghost" style={{ padding: '0 0.5rem' }}>Logout</button>
              ) : (
                <Link to="/login" className="nav-link">Login</Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
