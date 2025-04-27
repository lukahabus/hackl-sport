import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn("flex w-full items-start gap-2 p-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 bg-zagi-blue text-white">
          <Bot className="h-4 w-4" />
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[80%] text-sm",
          isUser ? "bg-zagi-light-blue text-black" : "bg-muted text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message}</p>
        <div className={cn("text-xs mt-1 opacity-70", isUser ? "text-right" : "text-left")}>
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 bg-zagi-light-blue text-black">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  )
}
