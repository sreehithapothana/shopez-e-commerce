import Cart from '../models/cartModel.js';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, cartItems: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const item = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, cartItems: [] });
    }

    const existItem = cart.cartItems.find(x => x.product.toString() === item.product);

    if (existItem) {
      cart.cartItems = cart.cartItems.map(x => x.product.toString() === existItem.product.toString() ? item : x);
    } else {
      cart.cartItems.push(item);
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = cart.cartItems.filter(x => x.product.toString() !== productId);
      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
