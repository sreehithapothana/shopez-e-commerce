import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (userInfo && !userInfo.isAdmin) {
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get('/api/cart', config);
          setCartItems(data.cartItems || []);
        } catch (error) {
          console.error("Error fetching cart from DB:", error);
        }
      } else {
        // Enforce DB persistence by clearing cart if not logged in as a normal user
        setCartItems([]);
      }
    };
    fetchCart();
  }, [userInfo]);

  const addToCart = async (product, qty) => {
    if (!userInfo || userInfo.isAdmin) {
      alert("You must be logged in as a customer to add items to your cart.");
      throw new Error("Unauthorized cart action");
    }

    const item = {
      product: product._id || product.product,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: Number(qty)
    };

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.post('/api/cart', item, config);
      setCartItems(data.cartItems);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    if (!userInfo) return;
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.delete(`/api/cart/${id}`, config);
      setCartItems(data.cartItems);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
