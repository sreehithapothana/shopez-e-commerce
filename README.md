# ShopEZ - MERN Stack E-Commerce Platform

ShopEZ is a fully functional, responsive, and modern E-Commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes complete shopping cart functionality, user authentication, and a dedicated admin dashboard for managing products, users, and orders.

## Features Checklist ✔️

**User Features:**
- [x] Browse Products (Grid view, Product Details)
- [x] Search & Filter Products by Category and Keyword
- [x] Global Shopping Cart (Add/Remove items, update quantities)
- [x] Secure Authentication (Login, Register, JWT, bcrypt)
- [x] User Profile Management & Order History
- [x] Full Checkout Process (Shipping, Payment, Order Placement)

**Admin Features:**
- [x] Secure Admin Middleware & Protected Routes
- [x] Dashboard Overview (Total Users, Products, Orders)
- [x] Product Management (Create, Edit, Delete)
- [x] User Management (View, Delete accounts)
- [x] Order Management (View all global orders, mark as Delivered)

---

## Final Folder Structure

```text
ShopEZ/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/              # API Route Handlers
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── data/                     # Seeder Data
│   │   ├── products.js
│   │   └── users.js
│   ├── middleware/               # Custom Express Middleware
│   │   └── authMiddleware.js     # JWT & Admin protection
│   ├── models/                   # Mongoose Schemas
│   │   ├── cartModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/                   # API Routes
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── utils/                    # Helper Functions
│   │   └── generateToken.js      # JWT signing
│   ├── .env                      # Backend Environment Variables
│   ├── seeder.js                 # Database Seeding Script
│   └── server.js                 # Express Entry Point
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI Components
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/              # React Context State Management
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/                # Application Views
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── OrderPage.jsx
│   │   │   ├── PlaceOrderPage.jsx
│   │   │   ├── ProductListPage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.jsx               # Main React Component & Router
│   │   ├── index.css             # Global UI/UX Design System
│   │   └── main.jsx              # React Entry Point
│   ├── .env                      # Frontend Environment Variables
│   └── vite.config.js            # Vite Configuration (API Proxy)
└── README.md                     # Project Documentation
```

---

## .env Examples

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory with the following variables:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopez
JWT_SECRET=add_your_secret_key_here
```
*(Note: Use `127.0.0.1` instead of `localhost` on modern Node versions to prevent IPv6 routing timeouts with local MongoDB).*

### Frontend (`frontend/.env`)
Currently, the frontend relies on a Vite proxy to communicate with the backend (`http://localhost:5000`), so no strict environment variables are required in development. If deploying, you would set `VITE_API_URL` to your production backend.

---

## Installation Steps

1. **Clone the repository:**
   Navigate to the project root folder.

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Seed the Database:**
   Ensure MongoDB is running locally. Then populate your database with initial products and an admin user.
   ```bash
   cd ../backend
   node seeder.js
   ```

5. **Run the Application Locally (Concurrent):**
   Open two terminal windows.
   
   **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm run dev
   ```
   
   Navigate to `http://localhost:5173` to view the app!

---

## Quality Assurance & Test Cases

### 1. Authentication & JWT
- **Test:** Register a new user account.
  - **Expected:** Account created in MongoDB, password hashed, JWT generated and stored in local storage, redirected to homepage.
- **Test:** Login with invalid credentials.
  - **Expected:** Red error banner appears indicating 'Invalid email or password'.
- **Test:** Login with valid credentials.
  - **Expected:** Header changes from 'Login' to the user's name/profile. State persists upon page refresh.

### 2. Shopping Cart APIs & State
- **Test:** Add an item to the cart anonymously.
  - **Expected:** Item saves to `localStorage`. Badge on Header updates instantly.
- **Test:** Log into an account after adding items to cart.
  - **Expected:** Cart state synchronizes to the DB via `PUT /api/cart`.
- **Test:** Adjust quantity on the Cart page.
  - **Expected:** Subtotal instantly recalculates.

### 3. Orders & Checkout
- **Test:** Attempt to navigate to `/placeorder` without logging in.
  - **Expected:** React Router `<ProtectedRoute>` bounces the user to the login page.
- **Test:** Place an order with items in the cart.
  - **Expected:** `POST /api/orders` successfully fires. Cart remains as is (or clears based on implementation). User redirects to the Order Confirmation page (`/order/:id`).
- **Test:** View Order History.
  - **Expected:** Profile page `/profile` fetches `GET /api/orders/myorders` and displays the order with correct pricing and 'Not Delivered' status.

### 4. Admin Management APIs
- **Test:** Login with non-admin credentials and manually navigate to `/admin`.
  - **Expected:** `AdminDashboard.jsx` detects lack of admin privileges and redirects to `/login`.
- **Test:** Login as `admin@example.com` and load the Dashboard.
  - **Expected:** `GET /api/users`, `GET /api/orders`, and `GET /api/products` return data successfully.
- **Test:** Create & Delete a Product.
  - **Expected:** Clicking '+ Create Product' creates a dummy listing instantly. Clicking 'Delete' removes it permanently from the list.
- **Test:** Mark Order as Delivered.
  - **Expected:** Navigating to an Order's detail page and clicking 'Mark Delivered' updates the DB. The red "Not Delivered" badge turns green.

---
*Built as a Senior Architect capstone project prioritizing modularity, clean UI/UX design, and scalable MERN architecture.*
