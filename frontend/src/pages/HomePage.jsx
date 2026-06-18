import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from the backend API
    const fetchProducts = async () => {
      try {
        // Mock data to simulate API response
        const data = [
          { _id: '1', name: 'Sony WH-1000XM5 Wireless Headphones', price: 348.00, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800', category: 'Audio' },
          { _id: '2', name: 'Apple Watch Series 9', price: 399.00, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800', category: 'Wearables' },
          { _id: '3', name: 'MacBook Pro 16-inch (M3 Max)', price: 3499.00, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', category: 'Computers' },
          { _id: '4', name: 'iPhone 15 Pro Max', price: 1199.00, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800', category: 'Smartphones' },
        ];
        
        // Simulating network delay
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 600);
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
