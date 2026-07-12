const COLORS = ["#e74c3c","#3498db","#2ecc71","#f39c12","#9b59b6","#1abc9c","#e67e22"];
const colorCache = {};
let idx = 0;
export function getColor(name) {
  if (!colorCache[name]) colorCache[name] = COLORS[idx++ % COLORS.length];
  return colorCache[name];
}

export default function Sidebar({ username, onlineUsers, connected, onLeave }) {
  return (
    <div style={S.sidebar}>
      <div style={S.top}>
        <div style={{fontSize:16,fontWeight:500,color:"#fff"}}>💬 ChatRoom</div>
        <div style={{fontSize:12,color:connected?"#2ecc71":"#e74c3c",marginTop:4}}>
          {connected ? "● Connected" : "○ Disconnected"}
        </div>
      </div>
      <div style={{padding:14,flex:1}}>
        <div style={S.section}>Online — {onlineUsers.length}</div>
        {onlineUsers.map(u => (
          <div key={u} style={S.user}>
            <div style={{width:8,height:8,borderRadius:"50%",background:getColor(u),flexShrink:0}} />
            <span style={{fontSize:13,color:u===username?"#fff":"#aaa",fontWeight:u===username?500:400}}>
              {u}{u===username?" (you)":""}
            </span>
          </div>
        ))}
        <div style={{marginTop:14,padding:"10px 12px",background:"#1a1a2e",borderRadius:8,fontSize:12,color:"#666"}}>
          Tip: type <span style={{color:"#e94560"}}>/ai [question]</span> to ask the AI bot
        </div>
      </div>
      <div style={S.bottom}>
        <button onClick={onLeave} style={S.leave}>Leave chat</button>
      </div>
    </div>
  );
}

const S = {
  sidebar:{ width:210,background:"#1a1a2e",borderRight:"1px solid #2a2a3e",display:"flex",flexDirection:"column",flexShrink:0,height:"100%" },
  top:{ padding:"18px 14px",borderBottom:"1px solid #2a2a3e" },
  section:{ fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:".06em",marginBottom:8 },
  user:{ display:"flex",alignItems:"center",gap:8,padding:"5px 0" },
  bottom:{ padding:14,borderTop:"1px solid #222" },
  leave:{ width:"100%",background:"#2a2a2a",color:"#aaa",border:"none",borderRadius:8,padding:9,fontSize:13,cursor:"pointer" },
};