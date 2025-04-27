"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function getChatResponse(messages: { role: string; content: string }[]) {
  try {
    // Create a system message with context about ZagiSport
    const systemMessage = {
      role: "system",
      content: `You are ZagiBot, a helpful assistant for the ZagiSport platform. 
      ZagiSport is a platform for sports competitions in Zagreb, Croatia. 
      You help users find information about competitions, venues, registration, and other features.
      Always respond in Croatian language. Be friendly, helpful, and concise.
      
      Key features of ZagiSport:
      - Browse and search sports competitions
      - View competition details, participants, and results
      - Find competition venues on an interactive map
      - Register for competitions
      - View upcoming competitions
      - Access information for parents
      
      If you don't know the answer to a specific question about a competition or venue, suggest that the user check the specific competition page or contact support.`,
    }

    // Add the system message at the beginning of the conversation
    const conversationWithSystem = [systemMessage, ...messages]

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      messages: conversationWithSystem,
      temperature: 0.7,
      maxTokens: 500,
    })

    return { response: text }
  } catch (error) {
    console.error("Error getting chat response:", error)
    return {
      response: "Oprostite, došlo je do pogreške. Molimo pokušajte ponovno kasnije.",
    }
  }
}
