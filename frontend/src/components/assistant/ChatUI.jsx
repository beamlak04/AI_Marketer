import React, { useState } from "react";
import { apiUrl, getAuthHeaders } from "../../lib/api";

const ChatUi = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hi — I can help you create captions, analyze a product, or suggest campaigns.",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [sending, setSending] = useState(false);

  async function send(customPrompt) {
    const text = (customPrompt || input).trim();
    if (!text || sending) return;

    setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
    setSending(true);

    try {
      const res = await fetch(apiUrl("/chat/message"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ message: text, conversationId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          text: err.message || "Unable to process your request right now.",
        },
      ]);
    }

    setInput("");
    setSending(false);
  }

  return (
    <div className="flex flex-col h-[32rem]">
      <div className="flex-1 overflow-auto p-1 md:p-2 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={`inline-block max-w-[85%] p-4 rounded-3xl leading-6 shadow-sm ${
                m.role === "user"
                  ? "bg-[#102033] text-white rounded-tr-sm"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => send("Generate an engaging social caption for my new product launch.")}
            className="px-3 py-2 rounded-full bg-slate-100 text-sm font-medium hover:bg-slate-200 transition"
          >
            Generate caption
          </button>
          <button
            onClick={() => send("Analyze this product and suggest improvements to improve conversion.")}
            className="px-3 py-2 rounded-full bg-slate-100 text-sm font-medium hover:bg-slate-200 transition"
          >
            Analyze product
          </button>
          <button
            onClick={() => send("Suggest a pricing strategy for better margins and faster sales.")}
            className="px-3 py-2 rounded-full bg-slate-100 text-sm font-medium hover:bg-slate-200 transition"
          >
            Optimize price
          </button>
        </div>
        <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white/90 p-2 shadow-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 outline-none"
            placeholder="Ask MarketMeda AI to draft, analyze, or optimize..."
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <button
            onClick={send}
            className="px-4 py-2 bg-[#0f6b57] text-white rounded-2xl shadow-lg shadow-emerald-900/15 hover:bg-[#125f4f] transition"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
