from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import Dict, List
import json, os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Real-Time Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConnectionManager:
    """
    Tracks all active WebSocket connections.
    One message -> broadcast() sends it to EVERYONE.
    This is the core of real-time.
    """
    def __init__(self):
        self.connections: Dict[WebSocket, str] = {}

    async def connect(self, ws: WebSocket, username: str):
        await ws.accept()
        self.connections[ws] = username

    def disconnect(self, ws: WebSocket) -> str:
        return self.connections.pop(ws, "Unknown")

    async def broadcast(self, msg: dict):
        text = json.dumps(msg)
        for ws in list(self.connections.keys()):
            try:
                await ws.send_text(text)
            except Exception:
                pass

    def online_users(self) -> List[str]:
        return list(self.connections.values())


manager = ConnectionManager()
history: List[dict] = []


async def ai_reply(question: str) -> str:
    """Call Groq only if /ai command is used."""
    try:
        from langchain_groq import ChatGroq
        from langchain_core.messages import HumanMessage
        key = os.getenv("GROQ_API_KEY")
        if not key:
            return "AI bot not configured. Add GROQ_API_KEY to .env"
        llm = ChatGroq(groq_api_key=key, model_name="llama3-8b-8192", temperature=0.5)
        res = llm.invoke([HumanMessage(content=question)])
        return res.content[:500]
    except Exception as e:
        return f"AI error: {str(e)}"


@app.get("/")
def root():
    return {"status": "online", "users": len(manager.connections)}


@app.get("/history")
def get_history():
    return {"messages": history[-50:]}


@app.websocket("/ws/{username}")
async def ws_endpoint(ws: WebSocket, username: str):
    """
    Each user gets one persistent connection here.
    1. Connect -> announce arrival to everyone
    2. Loop: wait for message -> broadcast to everyone
    3. Disconnect -> announce departure + clean up
    """
    await manager.connect(ws, username)

    await manager.broadcast({
        "type": "system",
        "content": f"{username} joined the chat",
        "username": "System",
        "timestamp": datetime.now().strftime("%H:%M"),
        "online": manager.online_users(),
    })

    try:
        while True:
            data = await ws.receive_text()

            msg = {
                "type": "message",
                "content": data,
                "username": username,
                "timestamp": datetime.now().strftime("%H:%M"),
                "online": manager.online_users(),
            }
            history.append(msg)
            if len(history) > 50:
                history.pop(0)
            await manager.broadcast(msg)

            # AI bot trigger
            if data.strip().lower().startswith("/ai "):
                question = data[4:].strip()
                reply = await ai_reply(question)
                bot_msg = {
                    "type": "message",
                    "content": reply,
                    "username": "AI Bot",
                    "timestamp": datetime.now().strftime("%H:%M"),
                    "online": manager.online_users(),
                }
                history.append(bot_msg)
                await manager.broadcast(bot_msg)

    except WebSocketDisconnect:
        name = manager.disconnect(ws)
        await manager.broadcast({
            "type": "system",
            "content": f"{name} left the chat",
            "username": "System",
            "timestamp": datetime.now().strftime("%H:%M"),
            "online": manager.online_users(),
        })