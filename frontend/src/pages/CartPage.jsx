import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const checkoutHandler = () => {
    navigate('/customer/placeorder');
  };

  return (
    <div className="container main-content">
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          Your cart is empty. <Link to="/customer/products" style={{ color: 'var(--primary-color)', marginLeft: '0.5rem', fontWeight: 'bold' }}>Go Back to Shop</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div style={{ flex: '2' }}>
            {cartItems.map((item) => (
              <div key={item.product} style={{ 
                display: 'flex', alignItems: 'center', marginBottom: '1rem', 
                borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'
              }}>
                <img src={item.image} alt={item.name} style={{ width: '120px', borderRadius: 'var(--radius-md)' }} />
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <Link to={`/customer/product/${item.product}`} style={{ fontWeight: '600', fontSize: '1.1rem' }}>{item.name}</Link>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>₹{item.price.toFixed(2)}</div>
                <div>
                  <select 
                    value={item.qty} 
                    onChange={(e) => addToCart({ ...item, _id: item.product }, Number(e.target.value))} 
                    className="form-control" 
                    style={{ padding: '0.4rem', width: '70px' }}
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => removeFromCart(item.product)} className="btn btn-ghost text-danger">
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ flex: '1' }}>
            <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                Subtotal ({totalItems} items)
              </h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                ₹{subtotal.toFixed(2)}
              </p>
              <button onClick={checkoutHandler} className="btn btn-primary btn-block" style={{ padding: '0.8rem' }}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
