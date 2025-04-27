"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { ChatDialog } from "./chat-dialog"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 p-0 bg-zagi-blue hover:bg-zagi-light-blue hover:text-black shadow-lg"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <ChatDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
