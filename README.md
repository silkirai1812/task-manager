# Task Manager App

A full-stack task management application that allows users to manage tasks efficiently and provides role [admin, user] based access.

---

## Features

- User Authentication (Login / Register)
- Role-based access (User & Admin)
- Create, update, delete tasks
- Task status, priority, and due date tracking
- User profile management
- Admin dashboard (view all users & tasks)
- Analytics dashboard

---

## Tech Stack

**Frontend**
- Next.js
- React
- Bootstrap

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/silkirai1812/task-manager.git
cd task-manager 
```

### 2. Backend Setup

```bash
cd backend 
npm install
```
Create a .env file inside the backend folder:

```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend server:
```bash
npm run dev
```
Backend will run on: http://localhost:4000


### 3. Frontend Setup

```bash
cd frontend
npm install
```
Create a .env file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```
Run the frontend:
```bash
npm run dev
```
Frontend will run on: http://localhost:3000

### 4. Running the App

Open: http://localhost:3000
Register or Login
Start managing your tasks


## Deployment

- **Frontend:** Vercel  
- **Backend:** Render  

Make sure to configure environment variables correctly on both platforms.

### Environment Variables (Production)

#### Backend (Render)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```


## API Endpoints

### Auth APIs
- `POST /auth/register` → Register user  
- `POST /auth/login` → Login user  

### User APIs
- `GET /users/profile` → Get user profile  
- `PUT /users/profile` → Update profile  

### Tasks APIs
- `GET /tasks` → Get all tasks  
- `POST /tasks` → Create task  
- `GET /tasks/:id` → Get task by ID  
- `PUT /tasks/:id` → Update task  
- `DELETE /tasks/:id` → Delete task  

### Admin APIs
- `GET /admin/users` → Get all users  
- `GET /admin/tasks` → Get all tasks  

### Analytics APIs
- `GET /analytics/tasks` → Task insights  

---

## 📁 Folder Structure
```
task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── services/
│   │   └── utils/
│   ├── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── services/
│   └── package.json
│
└── README.md
```

## System Architecture

The application follows a simple client-server architecture:

Frontend (Next.js + React)  
            ↓  
Sends API requests (Axios)  
            ↓  
Backend (Node.js + Express)  
            ↓  
Handles different modules:
- Authentication (login/register)
- User profile management
- Task management (CRUD operations)
- Admin operations
- Analytics  
            ↓  
Data is stored and retrieved from MongoDB using Mongoose


