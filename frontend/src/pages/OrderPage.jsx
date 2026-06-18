import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/orders/${id}`, config);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchOrder();
  }, [id, userInfo]);

  if (error) return <div className="container main-content text-danger">{error}</div>;
  if (!order) return <div className="container main-content">Loading...</div>;

  return (
    <div className="container main-content">
      <h2 style={{ fontSize: '1.5rem', overflowWrap: 'break-word' }}>Order {order._id}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2rem' }}>
        <div style={{ flex: '2' }}>
          <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h3>Shipping</h3>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong> {order.user.email}</p>
            <p><strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
            <div className={`alert ${order.status === 'Delivered' ? 'alert-success' : 'alert-secondary'}`} style={{ marginTop: '1rem', backgroundColor: order.status === 'Delivered' ? '#D1FAE5' : '#E5E7EB', color: order.status === 'Delivered' ? '#065F46' : '#374151', border: 'none', padding: '0.8rem' }}>
              Status: {order.status} {order.status === 'Delivered' && `on ${order.deliveredAt.substring(0,10)}`}
            </div>
          </div>
          <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h3>Payment Method</h3>
            <p><strong>Method: </strong> {order.paymentMethod}</p>
            <div className={`alert ${order.isPaid ? 'alert-success' : 'alert-danger'}`} style={{ marginTop: '1rem', backgroundColor: order.isPaid ? '#D1FAE5' : '#FEE2E2', color: order.isPaid ? '#065F46' : '#991B1B', border: 'none', padding: '0.8rem' }}>
              {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
            </div>
          </div>
        </div>
        <div style={{ flex: '1' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Items</span><span>${order.itemsPrice.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Shipping</span><span>${order.shippingPrice.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}><span>Tax</span><span>${order.taxPrice.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}><span>Total</span><span>${order.totalPrice.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
