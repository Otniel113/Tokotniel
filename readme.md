# Tokotniel API

This project is a Backend implementation for the Nutech Integrasi Recruitment Process. It provides a RESTful API for a digital wallet application, including user authentication, service information, and transaction capabilities.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Documentation UI**: Swagger UI

## 🚀 Deployment

- **Link**: http://tokotniel.onrender.com/

## ⚙️ Initial Setup

Follow these steps to set up the project locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   - Copy `.env.example` to `.env`
   - Fill in your database credentials and preferred JWT secret.
   ```bash
   cp .env.example .env
   ```

3. **Database Setup**:
   - Use the `DDL.sql` file provided in the root directory.
   - Run the script in your MySQL environment to initiate the database, tables, and seed data.

4. **Run the Application**:
   For production
   ```bash
   npm start
   ```
   For development
   ```bash
   npm run dev
   ```


## ✨ Features

- **Authentication Module**: 
  - User Registration
  - User Login (JWT generation)
- **Information Module**:
  - View Services and Tariffs
- **Transaction Module**:
  - Check User Balance
  - Top Up Balance
  - Perform Transactions (Purchase Services)

## 📂 Simple Project Structure

```
├── DDL.sql                 # Database Schema
├── server.js               # Entry point
├── src/
│   ├── config/             # Configuration (DB, Swagger)
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & Validation middleware
│   ├── models/             # Database models
│   ├── routes/             # API Routes
│   ├── utils/              # Utilities (Helpers)
│   └── views/              # Swagger Documentation definitions
└── readme.md
```

## 🔌 Simple API Endpoints

### Documentation
- `GET /api-docs` - Swagger UI Documentation

### Authentication
- `POST /registration` - Register new user
- `POST /login` - Login and get token

### Information
- `GET /services` - Get list of available services

### Transaction
- `GET /balance` - Get current user balance
- `POST /topup` - Top up balance
- `POST /transaction` - Buy a service

---
*Created by Otniel113*