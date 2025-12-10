# Fashion Backend API

Backend API server for the Fashion application supporting both Node.js and Python services.

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - for Express API server
- **Python** (v3.9 or higher) - for AI/ML services
- npm or yarn
- pip (Python package installer)

## 📦 Installation

### Node.js Setup

1. **Install Node dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
cp .env.example .env
```

3. **Configure your `.env` file** with necessary variables

### Python Setup

1. **Create virtual environment:**
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

2. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

3. **See [PYTHON_SETUP.md](./PYTHON_SETUP.md)** for detailed Python installation guide and troubleshooting

## 🏃 Running the Services

### Node.js Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

### Python Services

```bash
# Activate virtual environment first
# Windows: .\venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

python src/your_python_service.py
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.js          # Main Express server
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── models/           # Data models
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
├── venv/                 # Python virtual environment (gitignored)
├── package.json          # Node.js dependencies
├── requirements.txt      # Python dependencies
├── .env.example          # Environment variables template
├── PYTHON_SETUP.md       # Python setup guide
└── README.md             # This file
```

## 🔌 API Endpoints

### Health Check
- **GET** `/` - API information
- **GET** `/api/health` - Server health status

## 🛠️ Technologies

### Node.js Stack
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

### Python Stack
- **Flask** - Python web framework
- **OpenAI** - GPT models integration
- **ElevenLabs** - Text-to-speech services
- **PyAudio** - Audio processing
- **SpeechRecognition** - Speech-to-text
- **NumPy & Pandas** - Data processing

See [requirements.txt](./requirements.txt) for complete list.

## 📚 Documentation

- [Python Setup Guide](./PYTHON_SETUP.md) - Detailed Python installation and troubleshooting
- [Routes README](./src/routes/README.md) - API routes documentation
- [Controllers README](./src/controllers/README.md) - Controller patterns
- [Models README](./src/models/README.md) - Data model examples
- [Middleware README](./src/middleware/README.md) - Middleware patterns
- [Utils README](./src/utils/README.md) - Utility functions

## 🔐 Environment Variables

Required environment variables (add to `.env`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# AI Services
OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key

# Database (optional)
DATABASE_URL=your_database_url
```

## 📝 Notes

This backend supports both Node.js (Express) and Python services:
- **Node.js** - REST API, routing, middleware
- **Python** - AI/ML services, audio processing, conversational AI

Both can run simultaneously on different ports or be integrated as needed.

