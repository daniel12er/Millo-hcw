"use server"

import { supabase } from "@/lib/database"

export async function subscribeToNewsletter(email: string) {
  try {
    const { error } = await supabase.from("newsletter_subscribers").upsert([{ email }], { onConflict: "email" })

    if (error) throw error

    return { success: true, message: "Successfully subscribed to newsletter!" }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, message: "Failed to subscribe. Please try again." }
  }
}
