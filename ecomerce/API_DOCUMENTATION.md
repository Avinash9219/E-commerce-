# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## 🛍️ Products Endpoints

### Get All Products
```
GET /products
```

**Query Parameters:**
- `category` - Filter by category (mens, womens, jewelry, etc.)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Search by name/description
- `sort` - Sort option (price-asc, price-desc, newest, rating)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

**Example:**
```
GET /products?category=mens&minPrice=20&maxPrice=100&sort=price-asc&page=1
```

**Response:**
```json
{
  "products": [
    {
      "_id": "63f7d2c4e8f9a2b3c4d5e6f7",
      "name": "Product Name",
      "price": 100,
      "originalPrice": 150,
      "category": "mens",
      "description": "Product description",
      "rating": 4.5,
      "reviews": 24,
      "stock": 50
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "productsPerPage": 12
  }
}
```

---

### Get Single Product
```
GET /products/:id
```

**Example:**
```
GET /products/63f7d2c4e8f9a2b3c4d5e6f7
```

**Response:**
```json
{
  "_id": "63f7d2c4e8f9a2b3c4d5e6f7",
  "name": "Leather Watch",
  "price": 150,
  "originalPrice": 190,
  "category": "watches",
  "description": "Premium leather watch...",
  "image": "https://...",
  "rating": 4.5,
  "reviews": 24,
  "stock": 50,
  "specifications": {
    "size": "Large",
    "color": "Brown",
    "material": "Leather"
  }
}
```

---

### Get Products by Category
```
GET /products/category/:category
```

**Example:**
```
GET /products/category/mens
```

---

### Get Trending Products
```
GET /products/trending/all
```

---

### Get Best Sellers
```
GET /products/bestsellers/all
```

---

### Create Product (Admin)
```
POST /products
```

**Request Body:**
```json
{
  "name": "Product Name",
  "category": "mens",
  "price": 100,
  "originalPrice": 150,
  "description": "Product description",
  "image": "https://example.com/image.jpg",
  "stock": 100,
  "rating": 4.5,
  "badge": "New",
  "specifications": {
    "size": "M",
    "color": "Black",
    "material": "Cotton"
  }
}
```

---

### Update Product
```
PUT /products/:id
```

**Request Body:** Same as create (only include fields to update)

---

### Delete Product
```
DELETE /products/:id
```

---

## 👥 Users Endpoints

### Register User
```
POST /users/register
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "63f7d2c4e8f9a2b3c4d5e6f7",
    "firstName": "John",
    "email": "john@example.com"
  }
}
```

---

### Login User
```
POST /users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "63f7d2c4e8f9a2b3c4d5e6f7",
    "firstName": "John",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Get User Profile
```
GET /users/:id
```

---

### Update User Profile
```
PUT /users/:id
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001"
  }
}
```

---

### Add to Wishlist
```
POST /users/:userId/wishlist/:productId
```

**Example:**
```
POST /users/63f7d2c4e8f9a2b3c4d5e6f7/wishlist/63f7d2c4e8f9a2b3c4d5e6f8
```

---

### Remove from Wishlist
```
DELETE /users/:userId/wishlist/:productId
```

---

### Get User Wishlist
```
GET /users/:userId/wishlist
```

---

## 📦 Orders Endpoints

### Create Order
```
POST /orders
```

**Request Body:**
```json
{
  "userId": "63f7d2c4e8f9a2b3c4d5e6f7",
  "items": [
    {
      "productId": "63f7d2c4e8f9a2b3c4d5e6f8",
      "name": "Product Name",
      "price": 100,
      "quantity": 2
    }
  ],
  "subtotal": 200,
  "tax": 20,
  "shippingCost": 10,
  "total": 230,
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001"
  },
  "paymentMethod": "credit-card"
}
```

**Response:**
```json
{
  "_id": "63f7d2c4e8f9a2b3c4d5e6f9",
  "orderId": "ORD-1704067200000",
  "userId": "63f7d2c4e8f9a2b3c4d5e6f7",
  "items": [...],
  "total": 230,
  "status": "pending",
  "paymentStatus": "pending",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

---

### Get All Orders
```
GET /orders
```

---

### Get User Orders
```
GET /orders/user/:userId
```

---

### Get Single Order
```
GET /orders/:id
```

---

### Update Order
```
PUT /orders/:id
```

**Request Body:**
```json
{
  "status": "shipped",
  "paymentStatus": "completed",
  "trackingNumber": "TRACK123456",
  "notes": "Order shipped"
}
```

---

### Cancel Order
```
PUT /orders/:id/cancel
```

---

### Get Order Statistics
```
GET /orders/stats/analytics
```

**Response:**
```json
{
  "totalOrders": 150,
  "totalRevenue": 25000,
  "pendingOrders": 10,
  "shippedOrders": 80,
  "deliveredOrders": 60
}
```

---

## 🔍 Search Endpoints

### Search Products
```
GET /products/search/all?q=keyword
```

**Example:**
```
GET /products/search/all?q=watch
```

---

## 📊 Analytics Endpoints

### Get Dashboard Statistics
```
GET /analytics/dashboard
```

**Response:**
```json
{
  "totalProducts": 50,
  "totalUsers": 150,
  "totalOrders": 100,
  "totalRevenue": 50000,
  "topProducts": [...]
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal Server Error",
  "error": "Error details"
}
```

---

## 🔐 Authentication

Most endpoints require authentication. Include JWT token in header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📝 Example Requests Using cURL

### Get All Products
```bash
curl -X GET "http://localhost:5000/api/products?category=mens&sort=price-asc"
```

### Register User
```bash
curl -X POST "http://localhost:5000/api/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Order
```bash
curl -X POST "http://localhost:5000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "63f7d2c4e8f9a2b3c4d5e6f7",
    "items": [...],
    "total": 230,
    "paymentMethod": "credit-card"
  }'
```

---

## 🧪 Testing with Postman

1. Import API endpoints into Postman
2. Set up environment variables for base URL and token
3. Create request collections for each feature
4. Test with various parameters

---

## 📚 Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Auth required |
| 404 | Not Found - Resource missing |
| 500 | Server Error - Internal error |

---

## 🚀 Rate Limiting

- No rate limiting currently implemented
- Recommended: Implement in production

---

## 📅 Changelog

### v1.0.0 (Current)
- ✅ Products API
- ✅ Users API
- ✅ Orders API
- ✅ Search functionality
- ✅ Wishlist management

### Future
- 🔜 Payment processing
- 🔜 Reviews API
- 🔜 Ratings API
- 🔜 Reports API

---

For more information, see [README.md](./README.md)
