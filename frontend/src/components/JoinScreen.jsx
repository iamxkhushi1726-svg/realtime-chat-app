export default function JoinScreen({ onJoin }) {
  const [name, setName] = window.React.useState("");

  const handle = (e) => {
    e.preventDefault();
    if (name.trim().length >= 2) onJoin(name.trim());
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={{fontSize:36,marginBottom:12}}>💬</div>
        <h1 style={{fontSize:22,fontWeight:500,margin:"0 0 6px",color:"#fff"}}>
          Real-Time Chat
        </h1>
        <p style={{fontSize:13,color:"#888",margin:"0 0 24px"}}>
          Project 11/100 · WebSockets · React + FastAPI
        </p>
        <form onSubmit={handle}>
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your username..."
            maxLength={20}
            style={S.input}
          />
          <button
            type="submit"
            disabled={name.trim().length < 2}
            style={{...S.btn, opacity: name.trim().length < 2 ? 0.4 : 1}}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

const S = {
  page:{ minHeight:"100vh",background:"#0f0f1a",display:"flex",alignItems:"center",justifyContent:"center" },
  card:{ background:"#1a1a2e",borderRadius:16,padding:"40px 36px",width:340,textAlign:"center",border:"1px solid #2a2a3e" },
  input:{ width:"100%",background:"#0f0f1a",border:"1px solid #333",borderRadius:8,padding:"11px 14px",color:"#fff",fontSize:14,marginBottom:12,outline:"none",boxSizing:"border-box" },
  btn:{ width:"100%",background:"#e94560",color:"#fff",border:"none",borderRadius:8,padding:12,fontSize:14,fontWeight:500,cursor:"pointer" },
};