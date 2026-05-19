# 🍽️ Food Order Admin Panel

> Admin dashboard to manage the [Food Order App](https://github.com/purvsakariya/Tasty-Bite) — built for restaurant owners and administrators to oversee users, orders, and menu items in one place.

---

## 📌 About

This is the **admin side** of the Food Order project. While the user-facing app lets customers browse the menu and place orders, this panel gives admins full control — including exclusive permissions like deleting users and removing any order from the system.

---

## ✨ Features

### 👤 User Management (Admin Only)
- View all registered users
- See each user's order count, join date, and account status
- **Delete any user** and their associated order history

### 📦 Order Management
- View all orders across all users
- Filter orders by status: Pending, Preparing, Delivered, Cancelled
- Update order status
- **Delete any order** (admin exclusive)

### 🍕 Menu Management
- View all menu items
- Add new food items
- Edit item details (name, price, category, availability)
- Delete menu items

### 📊 Dashboard Overview
- Total orders count
- Registered users count
- Pending orders that need action
- Revenue summary

---

## 🔐 Admin vs User — Access Comparison

| Feature | User | Admin |
|---|---|---|
| Browse menu | ✅ | ✅ |
| Place orders | ✅ | ✅ |
| View own orders | ✅ | ✅ |
| View all users' orders | ❌ | ✅ |
| Delete own orders | ❌ | ✅ |
| Delete any user's orders | ❌ | ✅ |
| Delete users | ❌ | ✅ |
| Manage menu items | ❌ | ✅ |
| View dashboard stats | ❌ | ✅ |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Auth | JWT (JSON Web Tokens) |
| Role Guard | `isAdmin` middleware |

---

## 📁 Project Structure

```
food-order-admin/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   ├── ConfirmModal.jsx
│   │   └── StatusBadge.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── Users.jsx
│   │   ├── Menu.jsx
│   │   └── Settings.jsx
│   ├── api/
│   │   ├── orders.js
│   │   ├── users.js
│   │   └── menu.js
│   ├── utils/
│   │   └── auth.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI
- The [Food Order App](https://github.com/purvsakariya/Tasty-Bite) backend running

### 1. Clone the repo

```bash
git clone https://github.com/purvsakariya/Admin-Testy-Bite
cd food-order-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ADMIN_SECRET=your_admin_secret_key
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Admin Auth

Admin login is protected by a role-based guard. On the backend, every admin route is wrapped with `isAdmin` middleware:

```js
// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};
```

Admin-only API routes:
```
DELETE /api/admin/users/:id       → Delete a user
DELETE /api/admin/orders/:id      → Delete any order
GET    /api/admin/users           → Get all users
GET    /api/admin/orders          → Get all orders
PATCH  /api/admin/orders/:id      → Update order status
```

---

## 📸 Screenshots

> Coming soon — add screenshots of the Dashboard, Orders, and Users pages here.

---

## 🔗 Related Repos

- 👉 [food-order-app](https://github.com/purvsakariya/Tasty-Bite) — The user-facing food ordering application

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

Built by **[Purv Sakariya](https://github.com/purvsakariya)**  
Feel free to open issues or pull requests!
