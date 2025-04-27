"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquareIcon } from "lucide-react"
import { ChatDialog } from "./chat-dialog"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => setIsOpen(true)

  return (
    <>
      <Button
        onClick={onClick}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-[#0057B8] hover:bg-[#004494] text-white shadow-lg"
        aria-label="Open chat"
      >
        <MessageSquareIcon className="h-6 w-6" />
      </Button>
      <ChatDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
