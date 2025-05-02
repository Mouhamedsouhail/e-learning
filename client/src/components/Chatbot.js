import React, { useState, useRef, useEffect } from "react";
import api from "../services/api";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! Please select your role and ask your question.",
    },
  ]);
  const [input, setInput] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line no-unused-expressions
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/assistant/message", {
        message: input,
        userRole,
      });
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: res.data.response },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "assistant",
          text: "Sorry, there was an error. Please try again.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <button
        className={`chatbot-fab${open ? " chatbot-fab-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          "×"
        ) : (
          <span role="img" aria-label="Chat">
            💬
          </span>
        )}
      </button>
      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">EduConnect Assistant</div>
          <div className="chatbot-role-select">
            <label>
              <input
                type="radio"
                value="student"
                checked={userRole === "student"}
                onChange={() => setUserRole("student")}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="professor"
                checked={userRole === "professor"}
                onChange={() => setUserRole("professor")}
              />
              Professor
            </label>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message chatbot-message-${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
