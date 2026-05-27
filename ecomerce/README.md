# 🛒 Anon E-Commerce Store - Premium Shopping Experience

A modern, fully-featured e-commerce platform built with responsive design and attractive UI. Perfect for online retail businesses looking for a professional shopping solution.

## 🎯 Features

### Frontend Features
- ✨ **Modern & Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔍 **Advanced Search & Filters** - Category, price, and text search functionality
- 🛒 **Shopping Cart** - Add/remove items, quantity management, real-time updates
- ❤️ **Wishlist System** - Save favorite products, export wishlist as CSV
- 📦 **Product Details** - Detailed product information, ratings, and reviews
- 🎨 **Beautiful UI** - Pink gradient theme with smooth animations
- ⏱️ **Countdown Timer** - Deal of the day with live countdown
- 📱 **Mobile Optimized** - Bottom navigation for mobile users
- 🔔 **Real-time Notifications** - Toast notifications for user actions

### Backend Features
- 🔐 **User Authentication** - Register, login, profile management
- 📊 **Product Management** - Full CRUD operations for products
- 🛍️ **Order Management** - Order creation, tracking, status updates
- 💾 **Database** - MongoDB integration for data persistence
- 🔍 **Advanced Search** - Full-text search and filtering
- 📈 **Analytics Dashboard** - Sales statistics and reports
- 📦 **Wishlist Management** - User wishlist functionality
- 🚚 **Order Tracking** - Real-time order status tracking

## 📁 Project Structure

```
ecomerce/
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   └── styles.css          # All styling
│   └── js/
│       ├── app.js              # Main application logic
│       ├── cart.js             # Shopping cart functionality
│       └── wishlist.js         # Wishlist management
├── backend/
│   ├── server.js               # Main server file
│   ├── package.json            # Dependencies
│   ├── .env.example            # Environment variables template
│   ├── models/
│   │   ├── Product.js          # Product schema
│   │   ├── User.js             # User schema
│   │   └── Order.js            # Order schema
│   └── routes/
│       ├── products.js         # Product routes
│       ├── users.js            # User routes
│       └── orders.js           # Order routes
├── ecomercew.png               # Desktop mockup
└── mobile ecomerce.png         # Mobile mockup
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn package manager

### Frontend Setup
1. Navigate to the frontend folder
2. Open `index.html` in your browser
3. The frontend uses local storage for cart and wishlist (no backend required initially)

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file**
   ```bash
   copy .env.example .env
   ```
   Update the MongoDB URI and other configurations

3. **Start MongoDB**
   - Local: `mongod`
   - Cloud: Use MongoDB Atlas

4. **Run Server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   Server will run on `http://localhost:5000`

## 🎨 Design Highlights

### Color Scheme
- **Primary Pink**: #f596d3
- **Secondary Pink**: #ffb6c1
- **Dark Gray**: #333
- **Light Gray**: #f5f5f5

### Typography
- Clean, modern font family (Segoe UI)
- Clear hierarchy with varied font sizes
- Excellent readability

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get by category
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `POST /api/users/:userId/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/:userId/wishlist/:productId` - Remove from wishlist

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order
- `PUT /api/orders/:id/cancel` - Cancel order

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- LocalStorage API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- CORS
- Dotenv

## 💡 Additional Features

### Currently Implemented
- ✅ Product filtering by category and price
- ✅ Search functionality
- ✅ Shopping cart with localStorage
- ✅ Wishlist management
- ✅ User authentication basics
- ✅ Order management
- ✅ Responsive design
- ✅ Beautiful animations

### Future Enhancements
- 🔜 Payment gateway integration (Stripe, PayPal)
- 🔜 Email notifications
- 🔜 Product reviews and ratings
- 🔜 Admin dashboard
- 🔜 Inventory management
- 🔜 Promo codes and discounts
- 🔜 Multiple payment methods
- 🔜 Social media integration
- 🔜 Customer support chat
- 🔜 Analytics and reports

## 🔐 Security Notes

⚠️ **For Production:**
- Hash passwords using bcryptjs
- Implement JWT authentication
- Add input validation and sanitization
- Use HTTPS
- Implement rate limiting
- Add CORS properly
- Store sensitive data in environment variables
- Implement proper error handling
- Add security headers

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎯 Performance Tips

- Images are optimized using external CDN
- CSS animations use GPU acceleration
- Lazy loading for images
- Minified assets
- Efficient DOM manipulation
- Proper event delegation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 📞 Support

For support, email: support@anonstore.com or visit our website

## 🎉 Screenshots

### Features
- Beautiful hero section with trending products
- Advanced search and filters
- Shopping cart with real-time updates
- Wishlist management
- Order tracking
- Responsive mobile design
- Smooth animations and transitions

---

**Made with ❤️ for amazing shopping experience**

Happy Shopping! 🛍️
