import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card card-hover product-card">
      <Link to={`/customer/product/${product._id}`}>
        <img src={product.image || 'https://via.placeholder.com/300x200?text=ShopEZ'} alt={product.name} className="product-img" />
      </Link>
      <div className="product-card-body">
        <Link to={`/customer/product/${product._id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <div className="product-price">₹{product.price.toFixed(2)}</div>
        <Link to={`/customer/product/${product._id}`} className="btn btn-primary btn-block" style={{ textAlign: 'center' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
