import { useState, useRef } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handle = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handle} style={S.form}>
      <input
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={disabled ? "Reconnecting..." : "Type a message or /ai [question]..."}
        disabled={disabled}
        maxLength={500}
        style={S.input}
      />
      <button type="submit" disabled={!text.trim() || disabled} style={S.btn}>
        Send
      </button>
    </form>
  );
}

const S = {
  form:{ display:"flex",gap:10,padding:16,borderTop:"1px solid #2a2a3e" },
  input:{ flex:1,background:"#1a1a2e",border:"1px solid #333",borderRadius:8,padding:"11px 14px",color:"#fff",fontSize:14,outline:"none" },
  btn:{ background:"#e94560",color:"#fff",border:"none",borderRadius:8,padding:"11px 20px",fontSize:14,fontWeight:500,cursor:"pointer" },
};