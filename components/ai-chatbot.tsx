"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your StartupTN AI assistant. I can help you find funding opportunities, connect with mentors, and guide you through your startup journey. What can I help you with today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("funding") || lowerMessage.includes("investment")) {
      return "I can help you find funding opportunities! Based on your query, here are some personalized recommendations:\n\n1. **Seed Funding Programs**: Tennessee has several seed funding initiatives\n2. **Angel Investor Networks**: Connect with local angel investors\n3. **Grant Opportunities**: Explore state and federal grants\n\nWould you like me to create a detailed action plan for any of these options?"
    }

    if (lowerMessage.includes("mentor") || lowerMessage.includes("guidance")) {
      return "Great! Mentorship is crucial for startup success. Here's what I recommend:\n\n1. **Industry-Specific Mentors**: I can match you with mentors in your field\n2. **SCORE Mentorship**: Free business mentoring program\n3. **Startup Accelerators**: Programs that provide mentorship and resources\n\nWhat industry is your startup in? This will help me provide more targeted recommendations."
    }

    if (lowerMessage.includes("incubator") || lowerMessage.includes("accelerator")) {
      return "Tennessee has excellent incubator and accelerator programs! Here are the top options:\n\n1. **Nashville Entrepreneur Center**: Premier startup hub\n2. **Knoxville Entrepreneur Center**: East Tennessee's startup ecosystem\n3. **Memphis Bioworks**: Life sciences focused incubator\n\nEach offers different benefits. Would you like me to create a comparison and application timeline for you?"
    }

    if (lowerMessage.includes("legal") || lowerMessage.includes("incorporation")) {
      return "Legal setup is important! Here's your step-by-step legal checklist:\n\n1. **Business Structure**: Choose LLC, Corporation, etc.\n2. **State Registration**: File with Tennessee Secretary of State\n3. **EIN Number**: Get your federal tax ID\n4. **Operating Agreements**: Draft founding documents\n\nI can connect you with startup-friendly attorneys in Tennessee. Would you like referrals?"
    }

    return "That's a great question! I'm here to help with all aspects of your startup journey including funding, mentorship, legal setup, market research, and connecting with the Tennessee startup ecosystem. Could you tell me more about your specific needs or what stage your startup is in?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">StartupTN AI Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900",
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "ai" && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-0.5 text-white" />}
                    <div className="whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-600" />
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
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about startups..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
