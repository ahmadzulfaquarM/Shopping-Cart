
# 🛒 Full Stack E-Commerce Shopping Cart

A modern full-stack e-commerce web application built using the **MERN Stack**, featuring secure authentication, product management, wishlist, shopping cart, checkout, Razorpay payments, order management, customer reviews, admin dashboard, contact management, and customer support chat.

## 🌐 Live Demo

👉 [View Live Website](https://shopping-cart-frontend-khaki.vercel.app/)

## ✨ Highlights

* 🌟 **Tech Stack:** MongoDB + Express.js + React.js + Node.js
* 🎨 **Modern UI:** Tailwind CSS + responsive mobile-friendly design
* 🔐 **Authentication & Authorization:** JWT-based authentication with protected routes
* 📧 **Email Verification:** Account verification through email
* 🔑 **Forgot & Reset Password:** Secure password recovery using email
* 👤 **Role-Based Access:** Separate Customer and Admin access
* 🛍️ **Product Management:** Product listing, search, filtering, sorting, categories, and product details
* ❤️ **Wishlist:** Add, remove, and manage favorite products
* 🛒 **Shopping Cart:** Add products, update quantities, remove items, and calculate totals
* 📦 **Order Management:** Create, view, track, and cancel eligible orders
* 💳 **Razorpay Integration:** Online payment processing with server-side payment verification
* 💵 **Cash on Delivery:** Complete COD checkout workflow
* ⭐ **Customer Reviews & Ratings:** Customers can review products from delivered orders
* 👨‍💼 **Admin Dashboard:** Manage products, users, orders, and customer contacts
* 🚫 **User Management:** Admin can block/unblock customer accounts
* 💬 **Customer Support Chat:** Order-based customer support messaging
* 📩 **Contact Management:** Email verification, admin replies, status management, and deletion
* ☁️ **Cloudinary:** Image upload and cloud-based image management
* 🔒 **Protected APIs:** Backend authorization and admin-only API access
* 🚀 **Deployment:** Frontend and backend deployed using Vercel
* 🗄️ **Database:** MongoDB Atlas
* 🐞 **Error Handling:** Client-side and server-side error handling
* 📱 **Responsive Design:** Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* React Hook Form
* React Icons
* Framer Motion
* React Hot Toast
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Nodemailer
* Razorpay
* Cloudinary
* Multer
* Helmet
* Morgan
* CORS

## 📂 Project Structure

```text
Shopping-Cart/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 Environment Variables

### Frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

EMAIL_USER=your_email_address
EMAIL_PASS=your_gmail_app_password

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PORT=5000
```

> ⚠️ Never commit your real `.env` files or secret keys to GitHub.

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ahmadzulfaquarM/Shopping-Cart.git
```

```bash
cd Shopping-Cart
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create:

```text
.env
```

in the root directory and another:

```text
backend/.env
```

Add the required environment variables shown above.

## ▶️ Run the Application

### Start Backend

From the `backend` directory:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal in the project root:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

## 🛍️ Main Features

### Customer

```text
Register
   ↓
Email Verification
   ↓
Login
   ↓
Browse Products
   ↓
Search / Filter / Sort
   ↓
Wishlist / Cart
   ↓
Checkout
   ↓
COD / Razorpay
   ↓
Order Tracking
   ↓
Product Review & Rating
```

### Admin

```text
Admin Login
   ↓
Dashboard
   ↓
Product Management
   ↓
Order Management
   ↓
User Management
   ↓
Contact Management
```

## 💳 Payment Integration

The application supports:

* Cash on Delivery
* Razorpay online payments
* Razorpay payment verification
* Successful payment handling
* Failed payment handling
* Order creation after payment verification

Razorpay is configured using environment variables, keeping the secret key on the backend.

## ⭐ Reviews & Ratings

Customers can submit a review only for products they have purchased through a delivered order.

The system also prevents duplicate reviews for the same product/order.

## 👨‍💼 Admin Features

The admin dashboard provides:

* Product management
* Product creation
* Product editing
* Product deletion
* Order management
* Order status updates
* User management
* Block/unblock users
* Customer contact management
* Customer replies
* Contact deletion

## 🔒 Security

The application includes:

* JWT authentication
* Password hashing using bcrypt
* Protected backend routes
* Admin-only authorization
* Email verification
* Password reset tokens
* Environment variables for secrets
* Razorpay server-side payment verification
* CORS configuration
* Helmet security middleware
* Protected customer/admin operations

## ☁️ Deployment

The application is deployed using **Vercel**.

### Frontend

```text
https://shopping-cart-frontend-khaki.vercel.app
```

### Backend

```text
https://shopping-cart-two-beige.vercel.app
```

### Database

```text
MongoDB Atlas
```

The frontend communicates with the deployed Express backend through:

```env
VITE_API_URL=https://shopping-cart-two-beige.vercel.app/api
```

## 🧪 Testing

The application has been tested across:

* Authentication
* Email verification
* Password reset
* Product browsing
* Search and filtering
* Wishlist
* Shopping cart
* Checkout
* COD payments
* Razorpay payments
* Order management
* Order cancellation
* Customer reviews
* Admin authorization
* User blocking/unblocking
* Contact management
* Customer support chat
* Complete customer shopping journey

## 📸 Screenshots

Add screenshots of the following sections here:

* Home Page
* Products Page
* Product Details
* Cart
* Checkout
* My Orders
* Order Details
* Login/Register
* Admin Dashboard
* Admin Products
* Admin Orders
* Admin Users
* Admin Contacts

Example:

```markdown
## 📸 Screenshots

### 🏠 Home Page

![Home Page](screenshots/home.png)

### 🛍️ Products

![Products](screenshots/products.png)

### 🛒 Cart

![Cart](screenshots/cart.png)

### 💳 Checkout

![Checkout](screenshots/checkout.png)

### 👨‍💼 Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)
```

## 📌 Future Improvements

* Product recommendations
* Advanced analytics dashboard
* Coupon and discount system
* Inventory alerts
* More payment options
* Advanced order tracking
* Performance optimization

## 👨‍💻 Author

**Md Zulfaquar Ahmad**

B.Tech CSE
NIT Patna

GitHub:
https://github.com/ahmadzulfaquarM

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
