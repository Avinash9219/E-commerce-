# 🚀 Installation & Setup Guide

## Prerequisites

Before starting, make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)
- A code editor like VS Code

## Step 1: Frontend Setup

The frontend is standalone and doesn't require installation. Simply:

1. **Open the Frontend**
   - Navigate to the `frontend` folder
   - Open `index.html` in your web browser
   - The site will work with local storage (cart & wishlist saved locally)

2. **Frontend Works Out of the Box**
   - Shopping cart uses browser localStorage
   - Wishlist functionality works locally
   - Product data is hardcoded in JavaScript
   - No backend needed for basic functionality

## Step 2: Backend Setup (Optional for Full Features)

If you want to use the backend with database features:

### 2.1 Install MongoDB

**Option A: Local MongoDB**
```bash
# Windows - Use MongoDB Installer
# Download and install from https://www.mongodb.com/try/download/community

# Mac - Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux - Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Add it to `.env` file

### 2.2 Install Node Dependencies

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# Or if using yarn
yarn install
```

### 2.3 Create Environment File

```bash
# Copy the example file
copy .env.example .env
# or on Mac/Linux
cp .env.example .env
```

Edit `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/ecomerce
PORT=5000
NODE_ENV=development
```

### 2.4 Start MongoDB

```bash
# If using local MongoDB
mongod

# Or if using MongoDB Compass
# Open MongoDB Compass separately
```

### 2.5 Start the Backend Server

```bash
# From backend folder
npm start

# Or for development with auto-reload (requires nodemon)
npm run dev
```

Expected output:
```
MongoDB connected
Server is running on port 5000
http://localhost:5000
```

## Step 3: Connect Frontend to Backend

To connect the frontend to your backend API:

1. **Update API Configuration**
   - Open `frontend/js/config.js`
   - Change `API_BASE_URL` if your server runs on different port:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

2. **Use Backend APIs in Frontend**
   - The frontend already has API functions ready to use
   - Call functions from `ProductAPI`, `UserAPI`, `OrderAPI` in JavaScript

## Step 4: Populate Database with Sample Data

### Option A: Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to your MongoDB
3. Create database: `ecomerce`
4. Create collection: `products`
5. Import data from `backend/sampleData.js`

### Option B: Using API Endpoint

```bash
# Make POST request to create products
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Product Name","price":100,"category":"mens"...}'
```

### Option C: Using MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Use database
use ecomerce

# Insert sample data
db.products.insertMany([/* paste sample data array */])
```

## 🎯 Testing the Application

### Test Frontend
1. Open `http://localhost:3000` or just open `index.html` in browser
2. Test features:
   - ✅ Add products to cart
   - ✅ Add items to wishlist
   - ✅ Search and filter products
   - ✅ View product details
   - ✅ Adjust quantity in cart

### Test Backend API

```bash
# Get all products
curl http://localhost:5000/api/products

# Get specific product
curl http://localhost:5000/api/products/[product-id]

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"...","items":[...],"total":100,"paymentMethod":"credit-card"}'
```

## 📁 Folder Structure After Setup

```
ecomerce/
├── frontend/
│   ├── index.html
│   ├── css/styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   └── config.js
│   ├── ecomercew.png
│   └── mobile ecomerce.png
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── .env.example
│   ├── sampleData.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   └── routes/
│       ├── products.js
│       ├── users.js
│       └── orders.js
│
└── README.md
```

## ⚙️ Troubleshooting

### Port Already in Use

```bash
# On Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# On Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify username/password for MongoDB Atlas
- Check firewall settings

### CORS Errors

- The backend has CORS enabled
- Make sure frontend and backend URLs match in `config.js`
- Check if backend server is running

### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔗 Useful Links

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 🎓 Next Steps

1. **Customize Design** - Modify colors in `css/styles.css`
2. **Add Payment Gateway** - Integrate Stripe or PayPal
3. **Add Email Notifications** - Use Nodemailer
4. **Deploy** - Use Heroku, Vercel, or AWS
5. **Add Admin Panel** - Create management dashboard
6. **Add Reviews** - Implement review system
7. **SEO Optimization** - Add meta tags and structured data

## 📞 Need Help?

- Check the [README.md](./README.md) for project overview
- Review API endpoint documentation
- Check browser console for errors
- Check server logs for backend issues

---

**Happy coding! 🎉**
