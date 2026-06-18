# Full Stack Development with MERN
# Project Documentation

## 1. Introduction
**Project Title:** ShopEZ – E-Commerce Platform
**Team Members:** Pothana Sreehitha

## 2. Project Overview
**Purpose:** ShopEZ is a comprehensive MERN stack-based e-commerce platform designed for exploring products, managing a shopping cart, simulating checkouts, and tracking order history. It includes dedicated portals for both Customers and Administrators.
**Features:** User Registration, Login, JWT Authentication, Customer Dashboard, Admin Dashboard (Product & Order Management), Shopping Cart, Order History, Responsive UI.

## 3. Architecture
**Frontend:** React.js (Vite), React Router, Axios, CSS.
**Backend:** Node.js, Express.js, JWT Authentication.
**Database:** MongoDB with Users, Products, Orders, and Carts collections.

## 4. Setup Instructions
**Prerequisites:** Node.js, MongoDB, npm.
**Backend:** `cd backend` -> `npm install` -> `npm run dev`
**Frontend:** `cd frontend` -> `npm install` -> `npm run dev`

## 5. Folder Structure
**Frontend:** `src`, `pages`, `components`, `context`.
**Backend:** `controllers`, `models`, `routes`, `middleware`, `config`, `data`.

## 6. Running the Application
**Backend:** `npm run dev` (Runs on port 5000)
**Frontend:** `npm run dev` (Runs on port 5173)

## 7. API Documentation
* `POST /api/users/register` - Register a new user
* `POST /api/users/login` - Authenticate user & get token
* `GET /api/users/profile` - Get user profile
* `GET /api/products` - Fetch all products
* `GET /api/products/:id` - Fetch single product
* `POST /api/cart` - Add item to cart
* `DELETE /api/cart/:id` - Remove item from cart
* `POST /api/orders` - Create new order
* `GET /api/orders/myorders` - Get logged-in user orders

## 8. Authentication
JWT-based authentication with bcrypt password hashing. Implements role-based access control with protected routes for Customers and Administrators.

## 9. User Interface
**Pages:** Home, Login, Register, Product Details, Cart, Checkout, Order History, Admin Dashboard (Overview, Products, Add Product, Customers, Orders).

## 10. Testing
**Tools Used:** Postman / Thunder Client, MongoDB Compass, Browser Developer Tools.

## 11. Screenshots or Demo
**GitHub Repository:** https://github.com/sreehithapothana/shopez-e-commerce

## 12. Known Issues
* Real-time payment gateway integration (e.g., Stripe/PayPal) is currently simulated.

## 13. Future Enhancements
* Real Payment Gateway Integration
* User Product Reviews and Ratings
* Wishlist Functionality
* Advanced Product Filtering and Search Analytics
