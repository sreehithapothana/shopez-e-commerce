import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductListPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['All', 'Audio', 'Wearables', 'Computers', 'Smartphones', 'Electronics'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/api/products';
        const params = new URLSearchParams();
        
        if (keyword) params.append('keyword', keyword);
        if (category && category !== 'All') params.append('category', category);
        
        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;
        
        const { data } = await axios.get(url);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, category]);

  return (
    <div className="container main-content">
      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '1rem', flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <button 
            key={c} 
            onClick={() => setCategory(c)} 
            className={`btn ${category === c || (!category && c === 'All') ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
          >
            {c}
          </button>
        ))}
      </div>
      
      <h2 className="section-title">
        {keyword ? `Search Results for "${keyword}"` : category && category !== 'All' ? `${category} Products` : 'All Products'}
      </h2>
      
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3 className="text-danger">{error}</h3>
      ) : products.length === 0 ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)' }}>No products found.</h3>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
             <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
