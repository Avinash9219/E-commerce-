# Setup & Run (Local)

Backend

1. Copy env example and set values:

```
cd backend
copy .env.example .env   # on Windows
npm install
npm run dev
```

Frontend

```
cd frontend
npm install
# create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

Seed admin user

```
node backend/scripts/seedAdmin.js
```

API notes
- Image uploads: POST /api/upload (multipart form-data, key `image`)
- Hamper templates: /api/hamper
- Wishlist: /api/wishlist
- Admin auth: /api/users/login

