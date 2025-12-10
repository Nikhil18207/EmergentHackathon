# Fashion - End-to-End E-Commerce Platform

A modern, full-stack fashion e-commerce application with a React frontend and Node.js backend.

## 🏗️ Project Structure

```
Fashion/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utility functions
│   │   ├── styles/       # Global styles
│   │   ├── App.tsx
│   │   ├── Routes.tsx
│   │   └── index.tsx
│   ├── public/           # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/              # Express.js API Server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Data models
│   │   ├── middleware/   # Custom middleware
│   │   ├── utils/        # Utility functions
│   │   └── index.js      # Server entry point
│   ├── package.json
│   └── .env.example
│
├── .env                  # Root environment variables
├── .gitignore           # Root gitignore
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install Frontend Dependencies:**
```bash
cd frontend
npm install
```

2. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

3. **Setup Environment Variables:**
```bash
# Copy example env file in backend
cd backend
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

**Development Mode:**

1. **Start Backend Server:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

2. **Start Frontend Dev Server:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

**Production Build:**

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd backend
npm start
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📚 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## 🔧 Development

Each directory (frontend/backend) has its own README with specific setup instructions and development guidelines.

## 📝 License

MIT
