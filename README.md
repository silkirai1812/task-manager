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
git clone https://github.com/your-username/task-manager.git
cd task-manager 
```

### 2. Backend Setup

```bash
cd backend 
npm install

Create a .env file inside the backend folder:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the backend server:

npm run dev

Backend will run on: http://localhost:4000
```

### 3. Frontend Setup

```bash
cd frontend
npm install

Create a .env file:

NEXT_PUBLIC_API_URL=http://localhost:4000

Run the frontend:

npm run dev

Frontend will run on: http://localhost:3000
```

### 4. Running the App
```bash
Open: http://localhost:3000
Register or Login
Start managing your tasks
```

## 🌐 Deployment

- **Frontend:** Vercel  
- **Backend:** Render  

⚠️ Make sure to configure environment variables correctly on both platforms.

### 🔧 Environment Variables (Production)

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

## System Architecture
## 🧠 System Architecture

```mermaid
flowchart TD

A[Frontend (Next.js / React)]
--> B[Axios API Calls]

B --> C[Backend (Node.js + Express)]

C --> D1[Auth Routes]
C --> D2[User Routes]
C --> D3[Task Routes]
C --> D4[Admin Routes]
C --> D5[Analytics Routes]

D1 --> E[(MongoDB)]
D2 --> E
D3 --> E
D4 --> E
D5 --> E

