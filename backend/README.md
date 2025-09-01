# 🚀 Todo Fullstack - Backend

A robust RESTful API backend for the Todo application built with **Express.js + TypeScript + Prisma** featuring JWT authentication and PostgreSQL database.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user login/signup with token-based auth
- 🗄️ **PostgreSQL Database** - Robust data storage with Prisma ORM
- 📝 **Todo CRUD Operations** - Full Create, Read, Update, Delete functionality
- 🛡️ **Input Validation** - Zod schema validation for all requests
- 🔒 **Route Protection** - Middleware for authenticated routes
- 🌐 **CORS Enabled** - Cross-origin requests support
- 📊 **Type Safety** - Full TypeScript implementation
- 🚀 **Fast Development** - Hot reload with ts-node

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd todo_fullstack/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your database credentials:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/todo"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

4. **Set up PostgreSQL database**

   ```bash
   # Using Docker (recommended)
   docker run --name todo-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=todo -e POSTGRES_HOST_AUTH_METHOD=md5 -p 5432:5432 -d postgres

   # Or set up PostgreSQL manually
   createdb todo
   ```

5. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

6. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Verify server is running**
   The server will start on `http://localhost:3000`

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database connection URL (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/todo"

# JWT secret for token signing
JWT_SECRET="your-super-secret-jwt-key"

# Server port
PORT=3000
```

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run studio` - Open Prisma Studio for database management

## 🗄️ Database Schema

### Users Table

```prisma
model users {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  todos     todo[]
  createdAt DateTime @default(now())
}
```

### Todos Table

```prisma
model todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("pending")
  comment     String?
  userId      String
  user        users    @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔌 API Endpoints

### Authentication Routes

**POST /api/signup** - Register new user

```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**POST /api/login** - User login

```json
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt-token"
}
```

### Todo Routes (Protected)

**GET /api/todos** - Get all user todos

```bash
# Header: token: jwt-token
# Response: Array of todo objects
```

**POST /api/todos** - Create new todo

```json
// Request
{
  "title": "Learn TypeScript",
  "description": "Complete TypeScript tutorial",
  "status": "pending"
}

// Response: Created todo object
```

**PUT /api/todo/:id** - Update todo

```json
// Request
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "comment": "Great work!"
}

// Response: Updated todo object
```

**DELETE /api/todo/:id** - Delete todo

```json
// Response
{
  "message": "Todo deleted successfully",
  "todo": { ... }
}
```

## 🏗️ Project Structure

```
src/
├── index.ts          # Main server file
├── validation.ts     # Zod validation schemas
└── generated/        # Prisma generated types (auto-generated)
```

## 🛠️ Tech Stack

- **Runtime**: Node.js + Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Security**: bcrypt for password hashing
- **CORS**: cors middleware

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation with Zod
- CORS configuration
- Route protection middleware

## 📊 Database Management

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Open Prisma Studio (GUI)
npx prisma studio

# Check database status
npx prisma db pull
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Setup for Production

Ensure these environment variables are set in production:

- `DATABASE_URL` - Production PostgreSQL connection string
- `JWT_SECRET` - Strong secret key for production
- `PORT` - Production port (usually 80 or 443)

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error**: Check `DATABASE_URL` and ensure PostgreSQL is running

**Migration Errors**: Run `npx prisma migrate reset` to reset database

**Port Already in Use**: Change `PORT` environment variable or kill existing process

**JWT Errors**: Ensure `JWT_SECRET` is set and consistent

### Development Tips

- Use `npx prisma studio` to visually manage your database
- Check logs for detailed error messages
- Ensure all environment variables are properly set

---

**Happy coding!** 🎉 If you have any questions, please open an issue in the repository.
