"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"
import { Send, X, Loader2 } from "lucide-react"
import { getChatResponse } from "@/app/actions/chat"

interface Message {
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Pozdrav! Ja sam ZagiBot. Kako vam mogu pomoći s informacijama o sportskim natjecanjima?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      content: input,
      role: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Format messages for the AI API
      const formattedMessages = messages.concat(userMessage).map(({ content, role }) => ({ content, role }))

      const { response } = await getChatResponse(formattedMessages)

      setMessages((prev) => [
        ...prev,
        {
          content: response,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          content: "Oprostite, došlo je do pogreške. Molimo pokušajte ponovno kasnije.",
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-20 right-4 z-50 w-full max-w-[350px] sm:max-w-[400px] rounded-lg shadow-lg border bg-background flex flex-col h-[500px] max-h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between p-3 border-b bg-zagi-blue text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="font-semibold">ZagiBot</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-zagi-light-blue hover:text-black"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isUser={message.role === "user"}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-3 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Napišite poruku..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-zagi-blue hover:bg-zagi-light-blue hover:text-black"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
