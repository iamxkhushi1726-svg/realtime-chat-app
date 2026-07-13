# 💬 Real-Time Chat Application

> Project 11/100 — Full-Stack WebSocket Application

A real-time multi-user chat application built with React, FastAPI WebSockets, and Groq AI.  
The application enables instant communication between connected users and includes an AI assistant that responds directly inside the chat.

## Overview

This project demonstrates how modern real-time applications work using persistent WebSocket connections instead of traditional request-response APIs.

Users can:
- Join a shared chat room
- Send and receive messages instantly
- See active users in real time
- Interact with an AI assistant using chat commands
- View formatted Markdown AI responses

---

## Features

### Real-Time Messaging
- WebSocket-based communication
- No polling or page refresh required
- Instant message broadcasting to all connected users
- Persistent client-server connection

### Multi-User Support
- Multiple users can connect simultaneously
- Live online user tracking
- Unique usernames with color identification
- Join and leave notifications

### AI Assistant
- Integrated Groq AI chatbot
- Trigger AI responses using:

```
/ai your question
```

Examples:

```
/ai Explain neural networks
```

```
/ai Create a FastAPI authentication example
```

```
/ai Explain WebSockets vs REST
```

### Chat Interface
- Modern dark dashboard UI
- Markdown rendering for AI responses
- Code block formatting
- Message timestamps
- Responsive layout

---

## How WebSockets Work

### Traditional REST API

```
Client → Request → Server → Response → Connection closes
```

Each request creates a new communication cycle.

### WebSocket

```
Client → Connect → Persistent Connection → Two-way Communication
```

Both client and server can send data at any time, making WebSockets suitable for:

- Chat applications
- Live notifications
- Collaborative tools
- Real-time dashboards

---

## Tech Stack

### Frontend
- React 18
- Vite
- JavaScript
- Browser WebSocket API
- React Markdown

### Backend
- FastAPI
- Python
- WebSockets
- Uvicorn
- LangChain

### AI
- Groq API
- Llama models

.\venv\Scripts\Activate.ps1
---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/iamxkhushi1726-svg/realtime-chat-app.git

cd realtime-chat-app
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

Activate environment:

Windows:

```bash
.\venv\Scripts\Activate.ps1
```

Mac/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install fastapi uvicorn langchain langchain-groq python-dotenv
```

Create `.env`:

```
GROQ_API_KEY=your_key_here
```

Start backend:

```bash
uvicorn main:app --reload --port 8000
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Open:

```
http://localhost:5173
```

---

## AI Commands

Examples:

```
/ai Explain React hooks
```

```
/ai How does FastAPI handle WebSockets?
```

```
/ai Suggest improvements for this application
```

---

## What I Learned

- Building real-time applications with WebSockets
- Managing multiple concurrent connections in FastAPI
- Broadcasting messages across connected clients
- Handling WebSocket lifecycle events
- Connecting React applications with backend services
- Integrating AI capabilities into applications
- Rendering structured Markdown responses

---


## 100 Projects Challenge

Project 11/100

A full-stack engineering challenge focused on building practical applications and improving software development skills.