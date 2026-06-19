# Full Stack Development with MERN
## Project Documentation

**1. Introduction**
* **Project Title:** ShopEZ – E-Commerce Platform
* **Team Members:** Pothana Sreehitha

**2. Project Overview**
* **Purpose:** ShopEZ is a comprehensive MERN stack-based e-commerce platform designed for exploring products, managing a shopping cart, simulating secure checkouts, and providing advanced administrative controls for inventory and order management.
* **Features:** User Registration, Login (Dual Roles: Customer & Admin), JWT Authentication, Product Catalog & Search, Shopping Cart Management, Order Placement & Tracking, Dedicated Admin Dashboard (Users, Products, Orders), and a Fully Responsive UI.

**3. Architecture**
* **Frontend:** React.js, React Router, Axios, Custom CSS.
* **Backend:** Node.js, Express.js, JWT Authentication, Bcrypt password hashing.
* **Database:** MongoDB with collections for Users, Products, Orders, and Carts.

**4. Setup Instructions**
* **Prerequisites:** Node.js, MongoDB, npm.
* **Backend:** `cd backend` -> `npm install` -> `npm run dev`
* **Frontend:** `cd frontend` -> `npm install` -> `npm run dev`

**5. Folder Structure**
* **Frontend:** `src`, `pages`, `components`, `context`.
* **Backend:** `controllers`, `models`, `routes`, `middleware`, `config`, `data`.

**6. Running the Application**
* **Backend:** `npm run dev` (Runs on port 5000)
* **Frontend:** `npm run dev` (Runs on port 5173 using Vite)

**7. API Documentation**
* `POST /api/users/register`
* `POST /api/users/login`
* `GET /api/users/profile`
* `GET /api/products`
* `GET /api/products/:id`
* `GET /api/cart`
* `POST /api/cart`
* `POST /api/orders`
* `GET /api/orders/:id`
* `PUT /api/orders/:id/status`

**8. Authentication**
* JWT-based authentication combined with bcrypt password hashing. Includes protected routes with role-based access control (Customer vs. Admin).

**9. User Interface**
* **Pages:** Home, Login, Register, Product Details, Cart, Place Order, Order Status, Customer Profile, Admin Dashboard.

**10. Testing**
* **Tools Used:** Postman / Thunder Client, MongoDB Compass, Browser Developer Tools.

**11. Screenshots or Demo**
* **GitHub Repository:** https://github.com/sreehithapothana/shopez-e-commerce

**12. Known Issues**
* Payment processing is currently simulated for demonstration purposes.

**13. Future Enhancements**
* Integration with Stripe/Razorpay for real payments, Product Reviews & Ratings, Real-time Inventory Alerts, and Automated Email Notifications.
