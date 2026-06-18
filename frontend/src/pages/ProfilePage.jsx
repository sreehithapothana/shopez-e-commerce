import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      
      const fetchOrders = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      };
      fetchOrders();
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Update profile', name, email);
  };

  return (
    <div className="container main-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        {/* Profile Form */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>User Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
              Update Profile
            </button>
          </form>
        </div>

        {/* Orders List */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>My Orders</h2>
          {orders.length === 0 ? (
            <div className="alert" style={{ backgroundColor: 'var(--bg-color)' }}>You have no orders yet.</div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        <span className={order.status === 'Delivered' ? 'text-success' : order.status === 'Pending' ? 'text-danger' : 'text-secondary'}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/customer/order/${order._id}`}>
                          <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}>Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
