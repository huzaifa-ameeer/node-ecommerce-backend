# Node E-commerce API

A Node.js and Express-based ecommerce backend for managing users, products, categories, and orders. The API includes JWT-based authentication, admin-only routes, Cloudinary image upload support, and MongoDB connectivity.

## Features

- User registration and login
- JWT authentication with cookies
- User profile and password updates
- Admin role authorization
- Product CRUD operations
- Category CRUD operations
- Order creation and retrieval
- Cloudinary image upload support
- MongoDB integration with Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Cloudinary
- Multer
- Cookie Parser
- CORS
- Nodemon

## Project Structure

```bash
node-ecommerce/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── category.controller.js
│   │   ├── order.controller.js
│   │   ├── product.controller.js
│   │   ├── test.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── multer.js
│   ├── models/
│   │   ├── category.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── category.routes.js
│   │   ├── order.route.js
│   │   ├── product.routes.js
│   │   ├── test.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   └── feature.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `server` directory and add the following values:

```env
PORT=8001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

### 3. Run the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on the configured `PORT` value (default: `8001`).

## API Routes

### User Routes

Base URL: `/api/v1/user`

- `POST /register` - Register a new user
- `POST /login` - Login and create JWT token
- `GET /profile` - Get authenticated user profile
- `GET /logout` - Logout user
- `PUT /update-profile` - Update user details
- `PUT /update-password` - Update user password
- `PUT /update-pic` - Update profile picture

### Product Routes

Base URL: `/api/v1/products`

- `GET /get-all` - Get all products
- `GET /:id` - Get a single product
- `POST /create` - Create a new product (admin only)
- `PUT /update/:id` - Update product details (admin only)
- `PUT /update-image/:id` - Update product image (admin only)
- `DELETE /delete-product-image/:id/:public_id` - Delete a product image (admin only)
- `DELETE /delete-product/:id` - Delete a product (admin only)

### Category Routes

Base URL: `/api/v1/category`

- `POST /create` - Create a new category (admin only)
- `GET /get-all` - Get all categories
- `DELETE /delete/:id` - Delete category (admin only)
- `PUT /update/:id` - Update category (admin only)

### Order Routes

Base URL: `/api/v1/order`

- `POST /create` - Create a new order
- `GET /get-all` - Get logged-in user's orders
- `GET /get/:id` - Get a single order
- `GET /admin/get-all` - Get all orders (admin only)

## Authentication

This API uses JWT tokens stored in cookies.

- A user logs in via `/api/v1/user/login`
- The server sets a token cookie
- Protected routes use the `isAuth` middleware
- Admin-only routes additionally check the user role

## Notes

- Cloudinary is configured at startup using environment variables.
- The app connects to MongoDB as soon as the server starts.
- This project is designed as a backend API and does not include a frontend UI.

## License

This project is licensed under the ISC License.
