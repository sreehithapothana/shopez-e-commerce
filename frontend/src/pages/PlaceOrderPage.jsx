import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const PlaceOrderPage = () => {
  const { cartItems } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Mock shipping address
  const shippingAddress = { address: '123 Tech St', city: 'NY', postalCode: '10001', country: 'USA' };

  const placeOrderHandler = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: 'PayPal',
        itemsPrice, shippingPrice, taxPrice, totalPrice
      }, config);
      navigate(`/customer/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container main-content">
      <h2 style={{ marginBottom: '2rem' }}>Place Order</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div style={{ flex: '2' }}>
          <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h3>Shipping</h3>
            <p><strong>Address: </strong> {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}</p>
          </div>
          <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h3>Order Items</h3>
            {cartItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', borderRadius: '4px' }} />
                <Link to={`/customer/product/${item.product}`} style={{ flex: 1 }}>{item.name}</Link>
                <div>{item.qty} x ₹{item.price.toFixed(2)} = ₹{(item.qty * item.price).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Items</span><span>₹{itemsPrice.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Shipping</span><span>₹{shippingPrice.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}><span>Tax</span><span>₹{taxPrice.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}><span>Total</span><span>₹{totalPrice.toFixed(2)}</span></div>
            <button type="button" className="btn btn-primary btn-block" disabled={cartItems.length === 0} onClick={placeOrderHandler}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrderPage;
