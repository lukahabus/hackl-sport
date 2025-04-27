"use server"

import { revalidatePath } from "next/cache"

// Mock database of user subscriptions
// In a real application, this would be stored in a database
const userSubscriptions: Record<string, string[]> = {}

/**
 * Subscribe a user to a competition
 * @param competitionId The ID of the competition to subscribe to
 */
export async function subscribeToCompetition(competitionId: string) {
  // In a real application, you would get the user ID from the session
  const userId = "current-user"

  // Initialize user's subscriptions if they don't exist
  if (!userSubscriptions[userId]) {
    userSubscriptions[userId] = []
  }

  // Add the competition to the user's subscriptions if not already subscribed
  if (!userSubscriptions[userId].includes(competitionId)) {
    userSubscriptions[userId].push(competitionId)
  }

  // Revalidate the competition page to update the subscription status
  revalidatePath(`/natjecanja/${competitionId}`)

  return { success: true }
}

/**
 * Unsubscribe a user from a competition
 * @param competitionId The ID of the competition to unsubscribe from
 */
export async function unsubscribeFromCompetition(competitionId: string) {
  // In a real application, you would get the user ID from the session
  const userId = "current-user"

  // Remove the competition from the user's subscriptions
  if (userSubscriptions[userId]) {
    userSubscriptions[userId] = userSubscriptions[userId].filter((id) => id !== competitionId)
  }

  // Revalidate the competition page to update the subscription status
  revalidatePath(`/natjecanja/${competitionId}`)

  return { success: true }
}

/**
 * Check if a user is subscribed to a competition
 * @param competitionId The ID of the competition to check
 * @returns Whether the user is subscribed to the competition
 */
export async function isSubscribedToCompetition(competitionId: string) {
  // In a real application, you would get the user ID from the session
  const userId = "current-user"

  // Check if the user is subscribed to the competition
  return userSubscriptions[userId]?.includes(competitionId) || false
}

/**
 * Get all competitions a user is subscribed to
 * @returns An array of competition IDs the user is subscribed to
 */
export async function getUserSubscriptions() {
  // In a real application, you would get the user ID from the session
  const userId = "current-user"

  // Return the user's subscriptions
  return userSubscriptions[userId] || []
}
