# 🚀 Todo Fullstack Application

A complete full-stack todo application with React frontend and Express.js backend, featuring user authentication, todo management, and a modern UI.

## 📋 Overview

This project consists of two main components:

1. **Backend**: Express.js + TypeScript API with PostgreSQL and Prisma ORM
2. **Frontend**: React + TypeScript + Vite application with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation & Setup

1. **Clone and install dependencies**

   ```bash
   # Install root dependencies (for running both servers)
   npm install

   # Install backend dependencies
   cd backend && npm install

   # Install frontend dependencies
   cd frontend/todo-frontend && npm install
   cd ../..
   ```

2. **Set up environment variables**

   ```bash
   # Backend - copy and configure .env
   cp backend/.env.example backend/.env

   # Frontend - copy and configure .env
   cp frontend/todo-frontend/.env.example frontend/todo-frontend/.env
   ```

3. **Set up database**

   ```bash
   # Using Docker (recommended)
   docker run --name todo-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=todo -e POSTGRES_HOST_AUTH_METHOD=md5 -p 5432:5432 -d postgres

   # Or set up PostgreSQL manually
   createdb todo
   ```

4. **Run database migrations**

   ```bash
   cd backend
   npx prisma migrate dev
   cd ..
   ```

5. **Start both development servers**

   ```bash
   npm run dev
   ```

This will start:

- Backend server on `http://localhost:3000`
- Frontend server on `http://localhost:5173`

## 📁 Project Structure

```
todo_fullstack/
├── backend/                 # Express.js API server
│   ├── src/                # Source code
│   ├── prisma/             # Database schema and migrations
│   ├── package.json        # Backend dependencies and scripts
│   └── README.md           # Backend documentation
├── frontend/               # React frontend application
│   └── todo-frontend/      # Vite React app
│       ├── src/            # Source code
│       ├── package.json    # Frontend dependencies and scripts
│       └── README.md       # Frontend documentation
├── package.json            # Root package.json for running both servers
└── README.md              # This file
```

## 🛠️ Available Commands

### Root Level Commands

- `npm run dev` - Start both frontend and backend development servers
- `npm run dev:backend` - Start only backend server
- `npm run dev:frontend` - Start only frontend server

### Backend Commands (from backend directory)

- `npm run dev` - Start backend development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run studio` - Open Prisma Studio

### Frontend Commands (from frontend/todo-frontend directory)

- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 API Endpoints

The backend provides these main endpoints:

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `GET /api/todos` - Get user todos (protected)
- `POST /api/todos` - Create new todo (protected)
- `PUT /api/todo/:id` - Update todo (protected)
- `DELETE /api/todo/:id` - Delete todo (protected)

## 🌐 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 📚 Detailed Documentation

For more detailed information about each component, please refer to:

- **[Backend Documentation](./backend/README.md)** - Complete backend setup, API documentation, and database schema
- **[Frontend Documentation](./frontend/todo-frontend/README.md)** - Frontend setup, component structure, and deployment guide

## 🚀 Deployment

### Backend Deployment

Refer to [backend README](./backend/README.md#-deployment) for production deployment instructions.

### Frontend Deployment

Refer to [frontend README](./frontend/todo-frontend/README.md#-deployment) for production deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:

1. Check the detailed documentation in the respective README files
2. Ensure all environment variables are properly set
3. Verify database connection is working
4. Check that both servers are running on the correct ports

---

**Happy coding!** 🎉 For detailed information, please refer to the individual component README files.
