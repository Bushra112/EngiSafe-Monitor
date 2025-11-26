import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import "./FloatingChatbot.css";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat/ask", {
        question: input,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to fetch response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button className="chatbot-button" onClick={() => setOpen(true)}>
          <FaComments size={26} />
        </button>
      )}

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <strong>EngiSafe AI Assistant</strong>
            <FaTimes onClick={() => setOpen(false)} style={{ cursor: "pointer" }} />
          </div>

          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-msg bot">Thinking...</div>}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
