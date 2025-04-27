🛒 Product & Order Management API

This is a RESTful backend API built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**. It handles CRUD operations for products and orders, designed to support an e-commerce or inventory system.

## 🚀 Features

- 🔧 CRUD operations for **Products**
- 📦 Create, view, and delete **Orders**
- 🔗 Products referenced in Orders via MongoDB ObjectIDs
- 📬 Orders include shipping details
- 🌐 RESTful API with clean structure
- 📁 Modular route and model organization
- ✅ JSON responses with proper status codes

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Dotenv for environment variables
- Nodemon (for development)

---

## 📁 Project Structure

```
├── controllers/
├── models/
├── routes/
├── .env
├── app.js
└── package.json
```

---

## 🛠️ Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/product-order-api.git
cd product-order-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```env
PORT=6000
MONGO_URI=your_mongodb_connection_string
```

4. **Start the server:**

```bash
npm run dev
```

---

## 📬 API Endpoints

### 🔹 Products

| Method | Endpoint            | Description           |
|--------|---------------------|-----------------------|
| GET    | `/products`         | Get all products      |
| POST   | `/products`         | Create a new product  |
| GET    | `/products/:id`     | Get a product by ID   |
| DELETE | `/products/:id`     | Delete a product      |

### 🔹 Orders

| Method | Endpoint            | Description           |
|--------|---------------------|-----------------------|
| GET    | `/orders`           | Get all orders        |
| POST   | `/orders`           | Create a new order    |
| GET    | `/orders/:id`       | Get an order by ID    |
| DELETE | `/orders/:id`       | Delete an order       |

---

## 🔒 Environment Variables

Make sure to add the following in your `.env`:

- `PORT`: Port to run the server
- `MONGO_URI`: Your MongoDB connection string

---

## 📌 Future Improvements

- Add user authentication
- Add update routes for products and orders
- Add filtering & pagination
- Deploy to cloud (Render/Heroku/Vercel + MongoDB Atlas)

---

## 📬 Feedback & Contributions

Feel free to open issues or PRs. Feedback is always welcome!

---

## 📄 License

MIT License © Ritika
```

