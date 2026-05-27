# ⚡ Quick Start Guide

## 🎯 Get Started in 5 Minutes

### Option 1: Frontend Only (No Backend)

1. **Open in Browser**
   - Double-click `frontend/index.html`
   - Or drag it into your browser
   - ✅ Works immediately!

2. **Test Features**
   - Add products to cart
   - Save to wishlist
   - Search products
   - Everything saves locally

---

### Option 2: Full Stack Setup

#### **Step 1: Start MongoDB**
```bash
mongod
```

#### **Step 2: Install & Run Backend**
```bash
cd backend
npm install
npm start
```

#### **Step 3: Open Frontend**
- Open `frontend/index.html` in browser
- Now connected to backend!

---

## 📝 Quick Commands

```bash
# Backend commands
cd backend                # Go to backend
npm install              # Install dependencies
npm start                # Run server (port 5000)
npm run dev              # Run with auto-reload

# Frontend
# Just open index.html in browser!
```

---

## 🔧 Configuration

**If backend is on different port:**

Edit `frontend/js/config.js`:
```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

---

## 🧪 Test the Store

1. **Browse Products** ✅
   - Scroll through products
   - Filter by category
   - Search products

2. **Shopping Cart** ✅
   - Click "Add to Cart"
   - Click cart icon to view
   - Adjust quantity
   - Checkout

3. **Wishlist** ✅
   - Click heart icon
   - View saved items
   - Share or export

4. **Product Details** ✅
   - Click product image
   - View full details
   - Read description
   - Check pricing

---

## 📊 File Structure Quick Reference

```
frontend/
├── index.html          → Main page (open this!)
├── css/styles.css      → All styling
└── js/
    ├── app.js          → Product logic
    ├── cart.js         → Cart features
    ├── wishlist.js     → Wishlist logic
    └── config.js       → API settings

backend/
├── server.js           → Main server
├── package.json        → Dependencies
├── models/             → Database schemas
└── routes/             → API endpoints
```

---

## 🚀 Deploy Your Store

### **Frontend Only (Free)**
1. Upload to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Drag and drop your `frontend` folder
3. Done! 🎉

### **With Backend**
1. Deploy backend to [Heroku](https://www.heroku.com/) or [Railway](https://railway.app/)
2. Deploy frontend to Vercel/Netlify
3. Update API URL in config.js

---

## 🎨 Customize Colors

Edit `frontend/css/styles.css`:

```css
:root {
    --primary-pink: #f596d3;      /* Change this */
    --secondary-pink: #ffb6c1;    /* Or this */
    --dark-gray: #333;
    --light-gray: #f5f5f5;
}
```

---

## 💡 Tips & Tricks

- **Clear Cart**: Open dev tools → Application → LocalStorage → Delete
- **Test Mode**: Open Console (F12) → Run JavaScript commands
- **Disable Cart Pop-ups**: Press `Ctrl+C` then `Escape` to close modal
- **Check Orders**: Use Chrome DevTools → Network tab

---

## ❓ FAQs

**Q: Do I need Node.js for frontend?**
A: No! Just open `index.html`

**Q: Can I use the store without backend?**
A: Yes! All features work with localStorage

**Q: How do I add my own products?**
A: Edit `products` array in `frontend/js/app.js`

**Q: How do I change the pink color?**
A: Edit `--primary-pink` in `frontend/css/styles.css`

---

## 🆘 Issues?

| Issue | Solution |
|-------|----------|
| Page won't load | Check file path, use absolute URL |
| Cart empty after refresh | Use Firefox or check localStorage |
| Backend won't connect | Check port 5000 is available |
| MongoDB error | Make sure mongod is running |
| Images not loading | Check internet connection, CDN URLs valid |

---

## 📱 Mobile Testing

1. Open DevTools (F12)
2. Click device icon
3. Select mobile device
4. Refresh page
5. Test on mobile view

---

## 🎓 Learning Resources

- [MDN - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Tutorial](https://university.mongodb.com/)
- [CSS Tricks](https://css-tricks.com/)

---

## ✨ Next Steps

1. ✅ Get it running
2. ✅ Test all features
3. ✅ Customize design
4. ✅ Add your products
5. ✅ Deploy to web
6. ✅ Share with friends

---

**Start coding now! 🚀**

Any questions? Check the main [README.md](./README.md) or [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)
