'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

ChatInterface.propTypes = {
  onClose: PropTypes.func,
  fullScreen: PropTypes.bool,
};

const MastodonIcon = () => (
  <svg
    className="h-5 w-5 text-yellow-500"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2a2 2 0 00-2 2v2H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-1 5h2v2h-2V7zm0 4h2v6h-2v-6z" />
  </svg>
);

export default function ChatInterface({ onClose, fullScreen }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const payload = conversationId
        ? { id: conversationId, message: userMessage.text }
        : { message: userMessage.text };

      const response = await fetch('http://127.0.0.1:5000/app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const chatHistory = data.map((item) => ({
        sender: item.sender.toLowerCase(),
        text: item.message,
        id: item.id || null,
      }));

      setMessages(chatHistory);

      const botResponseWithId = chatHistory.find((msg) => msg.sender === 'bot' && msg.id);
      if (botResponseWithId) {
        setConversationId(botResponseWithId.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/app/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: conversationId }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      setMessages([]);
      setConversationId(null);
    } catch (error) {
      console.error('Failed to clear chat:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Failed to clear chat. Please try again.',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col ${
        fullScreen
          ? 'fixed inset-0 w-1/2 h-screen max-h-screen top-0 left-1/4'
          : 'h-full max-w-xs min-h-[300px] mx-auto'
      } rounded-2xl overflow-hidden shadow-md border border-gray-300 animate-pop bg-white relative`}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="bg-black text-yellow-500 px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-wide font-serif">Mastadon GPT</h2>
        <button
          onClick={handleClearChat}
          disabled={isLoading}
          className="text-xs text-yellow-500 hover:text-yellow-300 disabled:text-gray-500"
        >
          Clear
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto p-3 bg-yellow-50"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://www.example.com/brick-wall.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 italic text-sm">
            <p className="mt-1">Ask me about campus life or anything!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start items-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="mr-1">
                  <MastodonIcon />
                </div>
              )}
              <div
                className={`inline-block px-3 py-2 rounded-lg max-w-[85%] text-sm ${
                  message.sender === 'user'
                    ? 'bg-yellow-500 text-black rounded-br-none'
                    : message.isError
                    ? 'bg-red-100 text-red-700'
                    : 'bg-white border border-gray-300 text-black rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-3 border-t border-gray-200">
        <div className="relative flex">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-2 pr-8 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-600 hover:text-yellow-800 disabled:text-gray-400"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
