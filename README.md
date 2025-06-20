# CRUD Operations API (Node.js + Express + PostgreSQL)

A simple RESTful API built with Node.js, Express, and PostgreSQL.  
It supports Create, Read, Update, and Delete (CRUD) operations on a `records` table, and is tested using Postman.

---

## 🚀 Features

- Node.js + Express server
- PostgreSQL database with connection pooling
- Environment variable configuration using `.env`
- Full CRUD support:
  - `POST /api/records` – create a new record
  - `GET /api/records` – retrieve all records
  - `GET /api/records/:id` – retrieve one record by ID
  - `PUT /api/records/:id` – update a record
  - `DELETE /api/records/:id` – delete a record

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Tools**: pg (node-postgres), dotenv, nodemon
- **Testing**: Postman

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/M7mdIG/crud-operations-project.git
cd crud-operations-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file with the following content:
```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=crud_db
```

### 4. Create the database and table
Connect to PostgreSQL (via pgAdmin or psql) and run:

```sql
CREATE DATABASE crud_db;

CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the server
```bash
npm run dev    # uses nodemon
# OR
npm start      # uses node
```

---

## 🧪 Test the API using Postman

| Method | Endpoint              | Description            |
|--------|------------------------|------------------------|
| POST   | `/api/records`         | Create a new record    |
| GET    | `/api/records`         | Get all records        |
| GET    | `/api/records/:id`     | Get record by ID       |
| PUT    | `/api/records/:id`     | Update record by ID    |
| DELETE | `/api/records/:id`     | Delete record by ID    |

---

## 📂 Project Structure

```
├── server.js
├── db.js
├── .env
├── routes/
│   └── recordRoutes.js
├── controllers/
│   └── recordController.js
└── package.json
```

---

## 📄 License

This project is open for educational and demo purposes. No license is currently applied.
