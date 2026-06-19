import fs from 'fs';
import PDFDocument from 'pdfkit';

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('ShopEZ_Project_Documentation.pdf'));

doc.fontSize(24).text('Full Stack Development with MERN', { align: 'center' });
doc.fontSize(18).text('Project Documentation format', { align: 'center' });
doc.moveDown(2);

doc.fontSize(14).font('Helvetica-Bold').text('1. Introduction', { underline: true });
doc.fontSize(12).font('Helvetica').text('Project Title: ShopEZ – E-Commerce Platform');
doc.text('Team Members: Pothana Sreehitha');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('2. Project Overview', { underline: true });
doc.fontSize(12).font('Helvetica').text('Purpose: ShopEZ is a comprehensive MERN stack-based e-commerce platform designed for exploring products, managing a shopping cart, secure checkouts, and providing advanced administrative controls for inventory and order management.');
doc.moveDown(0.5);
doc.text('Features: User Registration, Login (Customer & Admin), JWT Authentication, Product Catalog & Search, Shopping Cart Management, Order Placement & Tracking, Dedicated Admin Dashboard (Users, Products, Orders), and Responsive UI.');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('3. Architecture', { underline: true });
doc.fontSize(12).font('Helvetica').text('Frontend: React.js, React Router, Axios, Custom CSS.');
doc.text('Backend: Node.js, Express.js, JWT Authentication, Bcrypt password hashing.');
doc.text('Database: MongoDB with collections for Users, Products, Orders, and Carts.');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('4. Setup Instructions', { underline: true });
doc.fontSize(12).font('Helvetica').text('Prerequisites: Node.js, MongoDB, npm.');
doc.text('Backend: cd backend -> npm install -> npm run dev');
doc.text('Frontend: cd frontend -> npm install -> npm run dev');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('5. Folder Structure', { underline: true });
doc.fontSize(12).font('Helvetica').text('Frontend: src, pages, components, context.');
doc.text('Backend: controllers, models, routes, middleware, config, data.');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('6. Running the Application', { underline: true });
doc.fontSize(12).font('Helvetica').text('Backend: npm run dev');
doc.text('Frontend: npm run dev');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('7. API Documentation', { underline: true });
doc.fontSize(12).font('Helvetica').text('POST /api/users/register');
doc.text('POST /api/users/login');
doc.text('GET /api/users/profile');
doc.text('GET /api/products');
doc.text('GET /api/products/:id');
doc.text('GET /api/cart');
doc.text('POST /api/cart');
doc.text('POST /api/orders');
doc.text('GET /api/orders/:id');
doc.text('PUT /api/orders/:id/status');
doc.moveDown();

doc.addPage();

doc.fontSize(14).font('Helvetica-Bold').text('8. Authentication', { underline: true });
doc.fontSize(12).font('Helvetica').text('JWT-based authentication combined with bcrypt password hashing. Includes protected routes with role-based access control (Customer vs. Admin).');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('9. User Interface', { underline: true });
doc.fontSize(12).font('Helvetica').text('Pages: Home, Login, Register, Product Details, Cart, Place Order, Order Status, Customer Profile, Admin Dashboard.');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('10. Testing', { underline: true });
doc.fontSize(12).font('Helvetica').text('Tools Used: Postman / Thunder Client, MongoDB Compass, Browser Developer Tools.');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('11. Screenshots or Demo', { underline: true });
doc.fontSize(12).font('Helvetica').text('GitHub Repository: https://github.com/sreehithapothana/shopez-e-commerce');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('12. Known Issues', { underline: true });
doc.fontSize(12).font('Helvetica').text('Payment processing is currently simulated for demonstration purposes.');
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('13. Future Enhancements', { underline: true });
doc.fontSize(12).font('Helvetica').text('Integration with Stripe/Razorpay for real payments, Product Reviews & Ratings, Real-time Inventory Alerts, and Automated Email Notifications.');

doc.end();
