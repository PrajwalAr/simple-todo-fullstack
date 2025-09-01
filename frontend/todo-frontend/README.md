# 🚀 Todo Fullstack - Frontend

A modern, responsive Todo application built with **React + TypeScript + Vite** featuring beautiful UI components and seamless backend integration.

## ✨ Features

- 🎯 **User Authentication** - Secure login/signup with JWT
- 📝 **Todo Management** - Create, read, update, and delete todos
- 🎨 **Beautiful UI** - Clean design with Tailwind CSS and shadcn/ui components
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔒 **Protected Routes** - Secure access to authenticated pages
- ⚡ **Fast Development** - Built with Vite for rapid development
- 🦾 **Type Safety** - Full TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd todo_fullstack/frontend/todo-frontend
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

   Edit `.env` with your backend URL:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API base URL
VITE_API_BASE_URL=http://localhost:3000
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── apis/           # API calls and hooks
├── components/     # React components
│   ├── home/       # Home page components
│   ├── loginSignUpForm/ # Auth forms
│   ├── todo/       # Todo CRUD components
│   ├── ui/         # Reusable UI components
│   └── ProtectedRoute.tsx # Route protection
├── contexts/       # React contexts
├── hooks/          # Custom React hooks
├── interfaces/     # TypeScript interfaces
├── validation/     # Form validation schemas
└── lib/           # Utility functions
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **HTTP Client**: Axios
- **Routing**: React Router
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React + Tabler Icons

## 🔌 API Integration

The frontend communicates with the backend REST API:

- `POST /api/login` - User authentication
- `POST /api/signup` - User registration
- `GET /api/todos` - Get user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todo/:id` - Update todo
- `DELETE /api/todo/:id` - Delete todo

## 🎨 UI Components

Built with shadcn/ui components including:

- Cards, Buttons, Forms
- Input fields with validation
- Badges for status indicators
- Responsive layout system

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploy to Vercel/Netlify

1. Connect your repository to Vercel/Netlify
2. Set environment variables in the platform dashboard
3. Deploy automatically on git push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

**CORS Errors**: Ensure backend CORS is configured to allow your frontend URL

**API Connection Failed**: Check that backend is running and `VITE_API_BASE_URL` is correct

**Build Errors**: Clear node_modules and reinstall dependencies

---

**Happy coding!** 🎉 If you have any questions, please open an issue in the repository.
