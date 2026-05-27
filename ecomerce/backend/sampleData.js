const sampleProducts = [
    {
        name: 'Leather Pouch Watch',
        category: 'watches',
        price: 150,
        originalPrice: 190,
        description: 'Elegant leather pouch watch with premium quality materials and precision movement.',
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
        rating: 4.5,
        reviews: 24,
        stock: 50,
        badge: 'New',
        specifications: {
            size: 'Large',
            color: 'Brown',
            material: 'Leather & Stainless Steel',
            brand: 'Anon Watches'
        }
    },
    {
        name: 'Smart Watch Pro',
        category: 'watches',
        price: 100,
        originalPrice: 150,
        description: 'Advanced smart watch with fitness tracking, heart rate monitor, and long battery life.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        rating: 4.0,
        reviews: 18,
        stock: 75,
        badge: 'Hot',
        specifications: {
            size: 'Medium',
            color: 'Black',
            material: 'Aluminum',
            brand: 'Tech Pro'
        }
    },
    {
        name: 'Party Wear Heels',
        category: 'footwear',
        price: 25,
        originalPrice: 40,
        description: 'Stylish party wear heels perfect for any occasion with comfortable cushioned insoles.',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 42,
        stock: 120,
        badge: 'Sale',
        specifications: {
            size: 'Multiple',
            color: 'Gold',
            material: 'Synthetic',
            brand: 'Elegance'
        }
    },
    {
        name: 'Trekking & Running Shoes',
        category: 'footwear',
        price: 55,
        originalPrice: 85,
        description: 'Comfortable and durable shoes for outdoor activities with advanced grip technology.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 35,
        stock: 100,
        badge: 'New',
        specifications: {
            size: 'Multiple',
            color: 'Black/Blue',
            material: 'Mesh & Rubber',
            brand: 'Adventure Gear'
        }
    },
    {
        name: 'Men\'s Leather Shoes',
        category: 'footwear',
        price: 80,
        originalPrice: 120,
        description: 'Premium men\'s leather shoes with elegant design suitable for formal occasions.',
        image: 'https://images.unsplash.com/photo-1548454528-c84d049e00ca?w=400&h=400&fit=crop',
        rating: 4.3,
        reviews: 28,
        stock: 60,
        badge: null,
        specifications: {
            size: 'Multiple',
            color: 'Black',
            material: 'Genuine Leather',
            brand: 'Formal Style'
        }
    },
    {
        name: 'Black Formal Shoes',
        category: 'footwear',
        price: 65,
        originalPrice: 95,
        description: 'Classic black formal shoes for professional wear with superior comfort.',
        image: 'https://images.unsplash.com/photo-1549459768-f8d4b8b8c0e0?w=400&h=400&fit=crop',
        rating: 4.5,
        reviews: 31,
        stock: 55,
        badge: 'Sale',
        specifications: {
            size: 'Multiple',
            color: 'Black',
            material: 'Leather',
            brand: 'Professional'
        }
    },
    {
        name: 'Sunglasses Blue',
        category: 'accessories',
        price: 35,
        originalPrice: 55,
        description: 'Trendy blue-tinted sunglasses with UV protection and anti-glare coating.',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 52,
        stock: 200,
        badge: 'New',
        specifications: {
            size: 'Standard',
            color: 'Blue',
            material: 'Polycarbonate',
            brand: 'Vision Plus'
        }
    },
    {
        name: 'Classic Brown Jacket',
        category: 'mens',
        price: 45,
        originalPrice: 75,
        description: 'Classic brown jacket perfect for casual wear with multiple pockets.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop',
        rating: 4.4,
        reviews: 26,
        stock: 80,
        badge: 'Hot',
        specifications: {
            size: 'M, L, XL',
            color: 'Brown',
            material: 'Cotton Blend',
            brand: 'Casual Wear'
        }
    },
    {
        name: 'Navy Blue Shirt',
        category: 'mens',
        price: 45,
        originalPrice: 70,
        description: 'Comfortable navy blue shirt for everyday wear with breathable fabric.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        rating: 4.5,
        reviews: 38,
        stock: 150,
        badge: 'Sale',
        specifications: {
            size: 'S, M, L, XL',
            color: 'Navy Blue',
            material: 'Cotton',
            brand: 'Daily Wear'
        }
    },
    {
        name: 'Girls Winter Dress',
        category: 'womens',
        price: 25,
        originalPrice: 50,
        description: 'Warm and stylish winter dress for girls with soft fabric.',
        image: 'https://images.unsplash.com/photo-1595508050915-c3400ca199e7?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 44,
        stock: 90,
        badge: 'New',
        specifications: {
            size: 'Kids',
            color: 'Pink',
            material: 'Wool Blend',
            brand: 'Kids Fashion'
        }
    },
    {
        name: 'Diamond Ring',
        category: 'jewelry',
        price: 150,
        originalPrice: 250,
        description: 'Elegant diamond ring with premium craftsmanship and authentic certifications.',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 62,
        stock: 30,
        badge: 'Hot',
        specifications: {
            size: '7, 8, 9',
            color: 'Gold',
            material: 'Diamond & Gold',
            brand: 'Precious Stones'
        }
    },
    {
        name: 'Designer Perfume',
        category: 'perfume',
        price: 48,
        originalPrice: 80,
        description: 'Luxurious designer perfume with long-lasting fragrance and elegant bottle.',
        image: 'https://images.unsplash.com/photo-1506755855726-88a8b8d4a5c8?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 55,
        stock: 110,
        badge: 'Sale',
        specifications: {
            size: '100ml',
            color: 'Amber',
            material: 'Eau de Parfum',
            brand: 'Luxury Scents'
        }
    }
];

// Instructions to seed the database:
// 1. Open MongoDB Compass or use mongo CLI
// 2. Create database: ecomerce
// 3. Create collection: products
// 4. Insert these documents
// Or use the REST API:
// POST http://localhost:5000/api/products with each product object
