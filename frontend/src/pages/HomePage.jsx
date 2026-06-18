import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        // Just take the first 4 products for the 'Trending' section
        setProducts(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">Experience the Future of Tech</h1>
          <p className="hero-subtitle">
            ShopEZ brings you the latest and greatest in consumer electronics. 
            Premium quality, unbeatable prices, and lightning-fast delivery.
          </p>
          <Link to="#featured-products" className="btn hero-cta">
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/customer/products" className="view-all-link">
              View All Products &rarr;
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <h3 style={{ color: 'var(--text-muted)' }}>Loading top products...</h3>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter or Promo Banner could go here */}
      <section style={{ backgroundColor: 'var(--surface-color)', padding: '4rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
         <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Join Our Newsletter</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <input type="email" placeholder="Enter your email address" className="form-control" style={{ flex: '1' }} />
               <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Subscribe</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default HomePage;
