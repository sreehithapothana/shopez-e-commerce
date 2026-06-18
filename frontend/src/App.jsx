import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CustomerRoute from './components/CustomerRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main>
              <Routes>
                {/* Redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected Customer Routes */}
                <Route element={<CustomerRoute />}>
                  <Route path="/customer/dashboard" element={<HomePage />} />
                  <Route path="/customer/products" element={<ProductListPage />} />
                  <Route path="/customer/search/:keyword" element={<ProductListPage />} />
                  <Route path="/customer/product/:id" element={<ProductPage />} />
                  <Route path="/customer/cart" element={<CartPage />} />
                  <Route path="/customer/placeorder" element={<PlaceOrderPage />} />
                  <Route path="/customer/orders" element={<ProfilePage />} />
                  <Route path="/customer/order/:id" element={<OrderPage />} />
                  <Route path="/customer/profile" element={<ProfilePage />} />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminDashboard />} />
                  <Route path="/admin/add-product" element={<AdminDashboard />} />
                  <Route path="/admin/edit-product/:id" element={<AdminDashboard />} />
                  <Route path="/admin/orders" element={<AdminDashboard />} />
                  <Route path="/admin/customers" element={<AdminDashboard />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
