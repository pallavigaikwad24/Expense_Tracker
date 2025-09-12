"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  PaperAirplaneIcon,
  CommandLineIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChatbotUIProps, Message } from "@/utils/typeDefinition/typeFile";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next-nprogress-bar";

const ChatbotUI: React.FC<ChatbotUIProps> = ({ setChatView }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (isExpense: boolean): string => {
    return isExpense
      ? "The expense has been successfully recorded"
      : "Sorry, I couldn't find an expense in that message. Please try again with details like the amount, category, and date.(e.g 'Bought groceries for $50 on Jun 24')";
  };

  const handleSendMessage = async () => {
    try {
      if (!inputText.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setIsLoading(true);

      const response = await axiosInstance(false).post("/api/chat-bot", {
        message: inputText,
      });

      const expenseData = response.data.data.data;
      if (expenseData.date && expenseData.amount) {
        const newExpense = await axiosInstance(false).post("/api/addExpense", {
          ...expenseData,
          owner: localStorage.getItem("email"),
        });

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: simulateBotResponse(true),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        console.log("New expense added:", newExpense.data);
      } else {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: simulateBotResponse(false),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }

      inputRef.current?.focus();
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message to chatbot API:", error);
      router.push("/service-error");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="absolute top-[5%] left-[25%] w-[60vw] flex mt-[5%] flex-col h-[70vh] max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 p-4 rounded-tl-3xl rounded-t-2xl">
        <div className="flex items-center space-x-3">
          {/* Close Button */}
          <button
            onClick={() => setChatView(false)}
            type="button"
            className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <CommandLineIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              AI Assistant
            </h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === "user"
                ? "flex-row-reverse space-x-reverse"
                : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600"
              }`}
            >
              {message.sender === "user" ? (
                <UserIcon className="w-4 h-4 text-white" />
              ) : (
                <CommandLineIcon className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-tr-sm"
                  : "bg-white text-gray-800 rounded-tl-sm border border-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === "user" ? "text-green-100" : "text-gray-500"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CommandLineIcon className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 rounded-ee-3xl rounded-bl-3xl">
        <div className="flex items-end space-x-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:scale-105 active:scale-95 shadow-lg"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
