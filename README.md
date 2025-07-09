# User-Device Assignment API (Node.js + TypeScript + PostgreSQL)

A modular backend API built with **Express**, **TypeORM**, and **PostgreSQL**, supporting CRUD operations for **Users**, **Devices**, and their **Assignments**. Includes Swagger documentation for easy testing and integration.

---

## 🚀 Features

- TypeScript-based Express server
- PostgreSQL integration via TypeORM
- Full CRUD for:
  - Users
  - Devices
  - User-Device Assignments (many-to-many)
- Global error handling
- Swagger UI for interactive API documentation
- Environment-based configuration via `.env`

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Docs**: Swagger (OpenAPI 3.0)
- **Tools**: ts-node-dev, dotenv

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/user-device-api.git
cd user-device-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=device_db
```

### 4. Start PostgreSQL and create database

```sql
CREATE DATABASE device_db;
```

### 5. Run the development server

```bash
npm run dev
```

Or to build and run production:

```bash
npm run build
npm start
```

---

## 📘 API Documentation

Once the server is running, access Swagger UI at:

```
http://localhost:3000/api-docs
```

---

## 🔌 Available Endpoints

### Users

| Method | Endpoint        | Description           |
|--------|------------------|-----------------------|
| POST   | `/api/users`     | Create a user         |
| GET    | `/api/users`     | Get all users         |
| GET    | `/api/users/:id` | Get user by ID        |
| PUT    | `/api/users/:id` | Update a user         |
| DELETE | `/api/users/:id` | Delete a user         |

### Devices

| Method | Endpoint           | Description            |
|--------|---------------------|------------------------|
| POST   | `/api/devices`      | Create a device        |
| GET    | `/api/devices`      | Get all devices        |
| GET    | `/api/devices/:id`  | Get device by ID       |
| PUT    | `/api/devices/:id`  | Update a device        |
| DELETE | `/api/devices/:id`  | Delete a device        |

### Assignments

| Method | Endpoint                | Description                    |
|--------|--------------------------|--------------------------------|
| POST   | `/api/assignments`       | Assign a user to a device      |
| PUT    | `/api/assignments/:id`   | Update assignment access level |
| DELETE | `/api/assignments/:id`   | Remove an assignment           |

---

## 📂 Project Structure

```
src/
├── app.ts                  # Main server entry
├── config/
│   └── data-source.ts      # TypeORM DB config
├── controllers/
│   ├── user.controller.ts
│   ├── device.controller.ts
│   └── assignment.controller.ts
├── entities/
│   ├── User.ts
│   ├── Device.ts
│   └── DeviceAssignment.ts
├── middleware/
│   └── errorHandler.ts
├── routes/
│   ├── user.routes.ts
│   ├── device.routes.ts
│   └── assignment.routes.ts
├── swagger.ts              # Swagger config
└── ...
```

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or Swagger UI to test endpoints. Swagger gives live Try-It-Out buttons.

---

## 📄 License

This project is for educational/demo purposes. Feel free to fork or contribute.