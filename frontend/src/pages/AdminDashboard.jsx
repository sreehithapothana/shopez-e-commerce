import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // New Product Form State
  const [newProduct, setNewProduct] = useState({ name: '', description: '', category: '', price: 0, countInStock: 0, image: '', brand: '' });

  useEffect(() => {
    if (location.pathname.includes('/products')) setActiveTab('products');
    else if (location.pathname.includes('/add-product')) setActiveTab('add-product');
    else if (location.pathname.includes('/orders')) setActiveTab('orders');
    else if (location.pathname.includes('/customers')) setActiveTab('users');
    else setActiveTab('overview');
  }, [location]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const [prodRes, userRes, orderRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/users', config),
        axios.get('/api/orders', config)
      ]);
      setProducts(prodRes.data); 
      setUsers(userRes.data); 
      setOrders(orderRes.data);
    } catch (error) {
      console.error('Error fetching admin data', error);
    }
  };

  const createProductHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post('/api/products', newProduct, config);
      alert('Product created successfully!');
      setNewProduct({ name: '', description: '', category: '', price: 0, countInStock: 0, image: '', brand: '' });
      fetchData();
      navigate('/admin/products');
    } catch (error) {
      alert('Error creating product');
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        fetchData();
      } catch (error) {
        console.error('Error deleting product', error);
      }
    }
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/users/${id}`, config);
        fetchData();
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`/api/orders/${id}/status`, { status }, config);
      fetchData();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="container main-content">
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admin Dashboard</h2>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', overflowX: 'auto' }}>
        <Link to="/admin/dashboard" className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'}`}>Overview</Link>
        <Link to="/admin/products" className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-ghost'}`}>Products</Link>
        <Link to="/admin/add-product" className={`btn ${activeTab === 'add-product' ? 'btn-primary' : 'btn-ghost'}`}>Add Product</Link>
        <Link to="/admin/customers" className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-ghost'}`}>Customers</Link>
        <Link to="/admin/orders" className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-ghost'}`}>Orders</Link>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Total Customers</h3><p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{users.filter(u => !u.isAdmin).length}</p>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Total Products</h3><p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>{products.length}</p>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Total Orders</h3><p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>{orders.length}</p>
          </div>
        </div>
      )}

      {activeTab === 'add-product' && (
        <div className="card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add New Product</h3>
          <form onSubmit={createProductHandler}>
            <div className="form-group"><label className="form-label">Name</label><input type="text" className="form-control" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" required rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group"><label className="form-label">Category</label><input type="text" className="form-control" required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Brand</label><input type="text" className="form-control" required value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Price</label><input type="number" className="form-control" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} /></div>
              <div className="form-group"><label className="form-label">Stock Quantity</label><input type="number" className="form-control" required value={newProduct.countInStock} onChange={e => setNewProduct({...newProduct, countInStock: Number(e.target.value)})} /></div>
            </div>
            <div className="form-group"><label className="form-label">Image URL</label><input type="text" className="form-control" required value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} /></div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Submit Product</button>
          </form>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Product Management</h3>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>ID</th><th>NAME</th><th>BRAND</th><th>PRICE</th><th>STOCK</th><th>ACTIONS</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>{p._id.substring(0, 8)}</td><td>{p.name}</td><td>{p.brand}</td><td>₹{p.price.toFixed(2)}</td>
                    <td className={p.countInStock > 0 ? 'text-success' : 'text-danger'}>{p.countInStock}</td>
                    <td>
                      <button onClick={() => deleteProductHandler(p._id)} className="btn btn-danger" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Customer Management</h3>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>ROLE</th><th>ACTIONS</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u._id.substring(0, 8)}</td><td>{u.name}</td><td>{u.email}</td>
                    <td>{u.isAdmin ? <span className="text-danger">Admin</span> : <span className="text-success">Customer</span>}</td>
                    <td>
                      <button onClick={() => deleteUserHandler(u._id)} className="btn btn-danger" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} disabled={u.isAdmin}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Order Management</h3>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>ID</th><th>USER</th><th>DATE</th><th>TOTAL</th><th>STATUS</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id}>
                    <td>{o._id.substring(0, 8)}</td><td>{o.user ? o.user.name : 'Unknown User'}</td><td>{o.createdAt ? o.createdAt.substring(0, 10) : 'N/A'}</td><td>₹{o.totalPrice.toFixed(2)}</td>
                    <td>
                      <select 
                        value={o.status || 'Pending'} 
                        onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                        className="form-control"
                        style={{ padding: '0.2rem', fontSize: '0.9rem', width: 'auto' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
export default AdminDashboard;
