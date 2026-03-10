
# StockFlow – Inventory Management MVP

## Overview

StockFlow is a simple **Inventory Management System MVP** built to help organizations manage their products, track stock levels, and monitor inventory value.

This project implements core inventory functionality including:

* Product management
* Stock quantity updates
* Low stock alerts
* Inventory dashboard metrics

The application is built using a **full-stack architecture** with a React frontend and a Node.js backend.

---

# Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL (Neon)

### Deployment

* Frontend: Vercel
* Backend: Render

---

# Features

## Authentication

* User registration
* User login
* JWT-based authentication
* Protected API routes

---

## Product Management (FR-1)

Users can perform full CRUD operations on products:

* Create product
* View product list
* Edit product
* Delete product

Each product contains:

* Name
* SKU
* Quantity
* Cost Price
* Selling Price
* Low Stock Threshold

---

## Dashboard (FR-2)

The dashboard displays key inventory metrics:

* Total number of products
* Total inventory value
* Number of low stock items
* List of low stock products

Low stock is calculated using:

```
quantity <= lowStockThreshold
```

---

## Product List (FR-3)

Users can:

* View all products
* Search products
* Edit product details
* Delete products

---

## Product Form (FR-4)

Users can:

* Add new products
* Update existing products
* Set a low stock threshold

---

## Stock Updates (FR-5)

Stock can be updated in two ways:

1. Directly editing the product quantity in the edit form.


Each update stores:

* `lastUpdatedBy`
* `updatedAt`

---

# Project Structure

```
stockflow
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── prisma
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   └── api
│
└── README.md
```

---

# Setup Instructions

## Clone Repository

```
git clone https://github.com/ansh-2004/StockFlow_MVP.git
cd StockFlow_MVP
```

---

## Backend Setup

```
cd backend
npm install
```

Create `.env`

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Run server

```
npm run dev
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

# Live Demo

Frontend:

```
https://stock-flow-mvp-rust.vercel.app/
```

Backend API:

```
https://stockflow-mvp-d0tj.onrender.com
```

---

# Demo Login (For Quick Testing)

To allow quick testing without creating a new account, a demo account is available.

Email:

```
ansh@gmail.com
```

Password:

```
ansh
```

Use this account to explore:

* Dashboard metrics
* Product management
* Stock updates
* Low stock alerts

---

