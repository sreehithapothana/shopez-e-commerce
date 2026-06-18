import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = async () => {
    try {
      await addToCart(product, qty);
      navigate('/customer/cart');
    } catch (e) {
      // If error or unauthenticated, it's handled internally (e.g. alert)
    }
  };

  if (loading) return <div className="container main-content">Loading...</div>;
  if (error) return <div className="container main-content text-danger">{error}</div>;

  return (
    <div className="container main-content">
      <Link to="/customer/products" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        &larr; Back to Results
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} />
        </div>
        
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h2>
          <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price.toFixed(2)}</span>
            <div style={{ marginTop: '0.5rem' }}>
              Status: <span className={product.countInStock > 0 ? 'text-success' : 'text-danger'}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
            {product.description}
          </p>
          
          <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: '500' }}>Price:</span>
              <strong style={{ fontSize: '1.25rem' }}>${product.price.toFixed(2)}</strong>
            </div>
            
            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontWeight: '500' }}>Qty:</span>
                <select 
                  className="form-control" 
                  style={{ width: '80px', padding: '0.5rem' }}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button 
              onClick={addToCartHandler} 
              className="btn btn-primary btn-block" 
              disabled={product.countInStock === 0} 
              style={{ padding: '0.8rem' }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
