import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import packageService from "../api/services/packageService";
import ReactMarkdown from "react-markdown"; // 👈 Import this

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setInput("");

        try {
            const res = await packageService.suggestPackage(text);
            const botReply = res?.suggestion || "Sorry, I couldn’t find anything.";
            setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "bot", content: "Error fetching results." },
            ]);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Toggle button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {/* Chat window */}
            {isOpen && (
                <div className="w-80 h-96 sm:w-96 sm:h-[500px] bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="flex justify-between items-center p-3 bg-primary-500 text-white rounded-t-xl">
                        <span className="font-semibold text-sm sm:text-base">
                            Travel Assistant
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-primary-600 rounded-md px-2 py-1 transition"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs sm:text-sm">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`p-2 rounded-lg max-w-[75%] ${msg.role === "user"
                                    ? "ml-auto bg-primary-100 text-primary-800"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {/* 👇 Render Markdown safely */}
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                            className="flex-1 border rounded-lg px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary-400"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={() => handleSendMessage(input)}
                            className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
