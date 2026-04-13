# MERN HR Management System

A full-stack HR Management System built with **MongoDB, Express, React, and Node.js**.

## Features

- JWT authentication (register/login, role-based authorization)
- Employee CRUD management
- Attendance management
- Leave management (apply + approve/reject)
- Dashboard analytics cards

## Project Structure

```
CloudComputing/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/
    └── src/
```

## MongoDB Schemas

### User
- `name`, `email`, `password` (hashed), `role` (`admin`, `hr`, `employee`)

### Employee
- `employeeCode`, `fullName`, `email`, `phone`, `department`, `designation`, `dateOfJoining`, `salary`, `status`, `manager`

### Attendance
- `employee` (ref Employee), `date`, `status`, `checkIn`, `checkOut`, `notes`
- Unique index on `(employee, date)`

### Leave
- `employee` (ref Employee), `leaveType`, `fromDate`, `toDate`, `reason`, `status`, `reviewerComment`

## Backend API Endpoints

Base URL: `http://localhost:5000/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Employees
- `GET /employees`
- `POST /employees`
- `GET /employees/:id`
- `PUT /employees/:id`
- `DELETE /employees/:id`

### Attendance
- `GET /attendance`
- `POST /attendance`

### Leaves
- `GET /leaves`
- `POST /leaves`
- `PATCH /leaves/:id/status`

### Dashboard
- `GET /dashboard`

## Local Development Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and API at `http://localhost:5000`.

## Deployment Steps

### Option A: Render (Backend) + Vercel/Netlify (Frontend) + MongoDB Atlas

1. Push this repository to GitHub.
2. Create MongoDB Atlas cluster and copy connection string.
3. Deploy backend service (Render/Railway/Fly):
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Environment variables:
     - `PORT=5000`
     - `MONGO_URI=<atlas-uri>`
     - `JWT_SECRET=<strong-secret>`
     - `JWT_EXPIRES_IN=1d`
     - `CLIENT_URL=<frontend-domain>`
4. Deploy frontend on Vercel/Netlify:
   - Root: `frontend`
   - Build: `npm run build`
   - Output dir: `dist`
   - Environment variable: `VITE_API_URL=<backend-domain>/api`
5. Update backend CORS `CLIENT_URL` to deployed frontend domain.

### Option B: Docker

- Containerize backend and frontend separately.
- Use managed MongoDB (Atlas) or self-hosted Mongo.
- Provide environment variables via deployment platform secrets.

## Notes

- This implementation is a clean starter template for HRMS workflows.
- Add validations, pagination, audit logs, payroll, and test suites for production-hardening.
