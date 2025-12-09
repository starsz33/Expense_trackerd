# Expense Tracker

Full-stack expense tracking application with React frontend and Node.js backend.

## Run on Windows

### Prerequisites
- Node.js installed
- MySQL installed

### Setup Database
Run in MySQL:
```sql
source backend/init.sql
```
Or manually:
```sql
CREATE DATABASE expenses_db;
USE expenses_db;
CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  amount DECIMAL(10,2)
);
```

### Run Backend
```bash
cd backend
npm install
npm start
```

### Run Frontend
```bash
cd frontend
npm install
npm start
```

Access at: http://localhost:3000

## Run with Docker (Ubuntu)

```bash
docker-compose up --build
```

Access at: http://localhost:3000
