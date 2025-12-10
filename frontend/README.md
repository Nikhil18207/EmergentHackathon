# Fashion Frontend

React + TypeScript + Vite frontend application for the Fashion platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

The application will start on `http://localhost:5173` by default.

## 📁 Project Structure

```
frontend/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   └── ui/          # Base UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main App component
│   ├── Routes.tsx       # Route definitions
│   └── index.tsx        # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## 🎨 Features

- Multi-step form flows
- 3D customizer interface
- Responsive design
- SEO optimized
- Type-safe development

## 📝 Notes

This frontend is designed to work with the Fashion backend API. Make sure the backend server is running for full functionality.
