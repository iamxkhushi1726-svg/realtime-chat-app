import { getColor } from "./Sidebar";
import { useEffect, useRef } from "react";

export default function MessageList({ messages, username }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={S.list}>
      {messages.map((msg, i) => {
        if (msg.type === "system") return (
          <div key={i} style={S.sys}>{msg.content} · {msg.timestamp}</div>
        );
        const isMe = msg.username === username;
        const isBot = msg.username === "AI Bot";
        const color = isBot ? "#a78bfa" : getColor(msg.username);
        return (
          <div key={i} style={{...S.row, justifyContent: isMe ? "flex-end" : "flex-start"}}>
            {!isMe && (
              <div style={{...S.avatar, background: color}}>
                {msg.username[0].toUpperCase()}
              </div>
            )}
            <div>
              {!isMe && (
                <div style={{fontSize:11,color,marginBottom:3,paddingLeft:4}}>
                  {msg.username}
                </div>
              )}
              <div style={{
                ...S.bubble,
                background: isMe ? "#e94560" : isBot ? "#2a1a3e" : "#2a2a3e",
                borderRadius: isMe ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                border: isBot ? "1px solid #a78bfa44" : "none",
              }}>
                {msg.content}
              </div>
              <div style={{fontSize:10,color:"#555",textAlign:isMe?"right":"left",marginTop:3}}>
                {msg.timestamp}
              </div>
            </div>
            {isMe && (
              <div style={{...S.avatar, background: getColor(username)}}>
                {username[0].toUpperCase()}
              </div>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}

const S = {
  list:{ flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:12 },
  sys:{ textAlign:"center",fontSize:12,color:"#555",padding:"4px 12px",background:"#1a1a1a",borderRadius:20,alignSelf:"center" },
  row:{ display:"flex",alignItems:"flex-end",gap:8 },
  avatar:{ width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:500,color:"#fff",flexShrink:0 },
  bubble:{ padding:"9px 13px",fontSize:14,color:"#fff",maxWidth:340,lineHeight:1.5,wordBreak:"break-word" },
};