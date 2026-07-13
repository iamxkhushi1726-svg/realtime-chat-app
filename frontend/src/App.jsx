import { useState, useEffect, useRef, useCallback } from "react";
import JoinScreen from "./components/JoinScreen";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

window.React = { useState };

const WS = "ws://localhost:8000/ws";
const API = "http://localhost:8000";

export default function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined]     = useState(false);
  const [messages, setMessages] = useState([]);
  const [online, setOnline]     = useState([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  const connect = useCallback(async (name) => {
    // Load history for new joiners
    try {
      const r = await fetch(`${API}/history`);
      const d = await r.json();
      setMessages(d.messages || []);
    } catch (_) {}

    // Open WebSocket — this is the key moment
    // A persistent connection replaces polling
    const ws = new WebSocket(`${WS}/${encodeURIComponent(name)}`);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setMessages(prev => [...prev, msg]);
      if (msg.online) setOnline(msg.online);
    };

    ws.onclose = () => setConnected(false);
  }, []);

  const handleJoin = (name) => {
    setUsername(name);
    setJoined(true);
    connect(name);
  };

  const handleSend = (text) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(text);
    }
  };

  const handleLeave = () => {
    wsRef.current?.close();
    setJoined(false);
    setMessages([]);
    setOnline([]);
    setConnected(false);
    setUsername("");
  };

  if (!joined) return <JoinScreen onJoin={handleJoin} />;

  return (
    <div style={S.page}>
      <div style={S.layout}>
        <Sidebar
          username={username}
          onlineUsers={online}
          connected={connected}
          onLeave={handleLeave}
        />
        <div style={S.main}>
          <MessageList messages={messages} username={username} />
          <ChatInput onSend={handleSend} disabled={!connected} />
        </div>
      </div>
    </div>
  );
}

const S = {
  page:{ minHeight:"100vh",background:"#0f0f1a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Inter,sans-serif" },
  layout:{ display:"flex",width:"100%",maxWidth:1000,height:"90vh",borderRadius:16,overflow:"hidden",border:"1px solid #2a2a3e" },
  main:{ flex:1,display:"flex",flexDirection:"column",background:"#0f0f1a" },
};