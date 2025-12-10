# Python Setup Guide

This guide will help you set up the Python environment for the Fashion backend services.

## Prerequisites

- Python 3.9 or higher
- pip (Python package installer)
- Virtual environment (recommended)

## Installation Steps

### 1. Create Virtual Environment

**Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Verify Installation

```bash
python --version
pip list
```

## Package Overview

### Core Frameworks
- **Flask** - Lightweight web framework for Python APIs
- **Flask-CORS** - Handle Cross-Origin Resource Sharing

### AI & Machine Learning
- **OpenAI** - GPT models integration
- **Anthropic** - Claude AI integration
- **ElevenLabs** - Text-to-speech services

### Audio Processing
- **PyAudio** - Audio I/O library
- **Pydub** - Audio manipulation
- **SoundDevice** - Audio playback and recording
- **SoundFile** - Audio file reading/writing
- **SpeechRecognition** - Speech-to-text conversion

### Data Processing
- **NumPy** - Numerical computing
- **Pandas** - Data manipulation and analysis

### Utilities
- **Requests** - HTTP library
- **Python-dotenv** - Environment variable management
- **Validators** - Data validation

### Development Tools
- **Pytest** - Testing framework
- **Black** - Code formatter
- **Flake8** - Linting tool

## Troubleshooting

### PyAudio Installation Issues

**Windows:**
If PyAudio fails to install, download the wheel file:
```bash
pip install pipwin
pipwin install pyaudio
```

Or download from: https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio

**macOS:**
```bash
brew install portaudio
pip install pyaudio
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install portaudio19-dev python3-pyaudio
pip install pyaudio
```

### Other Common Issues

1. **Permission Errors**: Run terminal as administrator (Windows) or use `sudo` (macOS/Linux)
2. **Outdated pip**: Update pip with `pip install --upgrade pip`
3. **SSL Errors**: Update certificates or use `pip install --trusted-host pypi.org`

## Environment Variables

Create a `.env` file in the backend directory with:

```env
# Server
PORT=5000
NODE_ENV=development

# OpenAI
OPENAI_API_KEY=your_openai_key_here

# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_key_here

# Database (if using)
DATABASE_URL=your_database_url_here
```

## Running Python Services

```bash
# Activate virtual environment first
python src/your_script.py
```

## Updating Dependencies

```bash
pip install --upgrade -r requirements.txt
```

## Freezing Dependencies

To update requirements.txt with current versions:
```bash
pip freeze > requirements.txt
```
