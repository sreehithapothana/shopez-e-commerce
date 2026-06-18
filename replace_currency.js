import fs from 'fs';

const files = [
  'frontend/src/components/ProductCard.jsx',
  'frontend/src/pages/AdminDashboard.jsx',
  'frontend/src/pages/CartPage.jsx',
  'frontend/src/pages/OrderPage.jsx',
  'frontend/src/pages/PlaceOrderPage.jsx',
  'frontend/src/pages/ProductPage.jsx',
  'frontend/src/pages/ProfilePage.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\$\{product\.price/g, '₹{product.price');
  content = content.replace(/\$\{p\.price/g, '₹{p.price');
  content = content.replace(/\$\{o\.totalPrice/g, '₹{o.totalPrice');
  content = content.replace(/\$\{item\.price/g, '₹{item.price');
  content = content.replace(/\$\{subtotal/g, '₹{subtotal');
  content = content.replace(/\$\{order\.itemsPrice/g, '₹{order.itemsPrice');
  content = content.replace(/\$\{order\.shippingPrice/g, '₹{order.shippingPrice');
  content = content.replace(/\$\{order\.taxPrice/g, '₹{order.taxPrice');
  content = content.replace(/\$\{order\.totalPrice/g, '₹{order.totalPrice');
  content = content.replace(/\$\{itemsPrice/g, '₹{itemsPrice');
  content = content.replace(/\$\{shippingPrice/g, '₹{shippingPrice');
  content = content.replace(/\$\{taxPrice/g, '₹{taxPrice');
  content = content.replace(/\$\{totalPrice/g, '₹{totalPrice');
  content = content.replace(/\$\{\(item\.qty/g, '₹{(item.qty');
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Currency symbols replaced!');
