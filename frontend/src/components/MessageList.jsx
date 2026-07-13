import { getColor } from "./Sidebar";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageList({ messages, username }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={S.list}>
      {/* Dynamic Font Injection: Pulling clean clean geometric weights */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
      `}} />

      {messages.map((msg, i) => {
        if (msg.type === "system") {
          return (
            <div key={i} style={S.sysContainer}>
              <div style={S.sys}>
                {msg.content} · {msg.timestamp}
              </div>
            </div>
          );
        }

        const isMe = msg.username === username;
        const isBot = msg.username === "AI Bot";
        const color = isBot ? "#8A8D98" : getColor(msg.username);

        return (
          <div
            key={i}
            style={{
              ...S.row,
              justifyContent: isMe ? "flex-end" : "flex-start",
              marginBottom: i === messages.length - 1 ? 0 : 10,
            }}
          >
            {!isMe && (
              <div style={{ ...S.avatar, background: color }}>
                {msg.username[0].toUpperCase()}
              </div>
            )}

            {/* Premium Wide Layout Engine Mapping */}
            <div 
              style={{ 
                maxWidth: isBot ? "95%" : "75%", 
                width: "100%", 
                display: "flex", 
                flexDirection: "column" 
              }}
            >
              {!isMe && (
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isBot ? "#A0A5B5" : color,
                    marginBottom: 6,
                    paddingLeft: 4,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {msg.username}
                </div>
              )}

              <div
                style={{
                  ...S.bubble,
                  background: isMe
                    ? "#2C2F3A" /* Premium Steel/Slate Variant for Self User */
                    : isBot
                    ? "#161922" /* Midnight Black Canvas for AI Content */
                    : "#222531",/* Deep Charcoal Slate for standard network nodes */
                  color: "#E6E8F0",
                  borderRadius: isMe
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                  border: isBot
                    ? "1px solid rgba(138, 141, 152, 0.25)"
                    : "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {isBot ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, children }) {
                        return inline ? (
                          <code style={S.inlineCode}>
                            {children}
                          </code>
                        ) : (
                          <pre style={S.codeBlock}>
                            <code style={{ fontFamily: "ui-monospace, monospace" }}>{children}</code>
                          </pre>
                        );
                      },
                      /* FIXED MARGINS: Zeroes out erratic default spacings from react-markdown elements */
                      p({ children }) {
                        return <p style={{ margin: "0 0 12px 0", padding: 0 }}>{children}</p>;
                      },
                      ul({ children }) {
                        return <ul style={{ margin: "4px 0 16px 0", paddingLeft: "24px" }}>{children}</ul>;
                      },
                      ol({ children }) {
                        return <ol style={{ margin: "4px 0 16px 0", paddingLeft: "24px", listStylePosition: "outside" }}>{children}</ol>;
                      },
                      li({ children }) {
                        return <li style={{ margin: "8px 0", paddingLeft: "4px", lineHeight: "1.65" }}>{children}</li>;
                      }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                )}
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: "#6A6E7C",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  textAlign: isMe ? "right" : "left",
                  marginTop: 6,
                  paddingLeft: isMe ? 0 : 4,
                  paddingRight: isMe ? 4 : 0,
                  letterSpacing: "0.2px",
                }}
              >
                {msg.timestamp}
              </div>
            </div>

            {isMe && (
              <div
                style={{
                  ...S.avatar,
                  background: getColor(username),
                }}
              >
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
  list: {
    flex: 1,
    overflowY: "auto",
    padding: "32px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    background: "#0F111A", /* Dark theme synchronized matching main body background */
  },

  sysContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "12px 0",
  },

  sys: {
    textAlign: "center",
    fontSize: 11,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    color: "#8A8D98",
    padding: "6px 20px",
    background: "#1E2230",
    borderRadius: 20,
    letterSpacing: "0.5px",
  },

  row: {
    display: "flex",
    alignItems: "flex-end",
    gap: 16,
    width: "100%",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 700,
    color: "#FFFFFF",
    flexShrink: 0,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  bubble: {
    padding: "16px 24px",
    fontSize: "14.5px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "400",
    lineHeight: "1.65",
    wordBreak: "break-word",
    width: "100%",
    letterSpacing: "0.2px",
  },

  inlineCode: {
    background: "#090A0F",
    color: "#E2E4DE",
    padding: "2px 6px",
    borderRadius: 4,
    fontFamily: "ui-monospace, monospace",
    fontSize: "13px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },

  codeBlock: {
    background: "#090A0F",
    padding: 18,
    borderRadius: 8,
    overflowX: "auto",
    marginTop: 14,
    marginBottom: 6,
    color: "#E2E4DE",
    fontFamily: "ui-monospace, monospace",
    fontSize: "13px",
    lineHeight: 1.55,
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
};