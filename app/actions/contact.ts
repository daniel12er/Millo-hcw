"use server"

import { supabase } from "@/lib/database"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const { error } = await supabase.from("contact_messages").insert([formData])

    if (error) throw error

    return { success: true, message: "Message sent successfully! We will get back to you soon." }
  } catch (error) {
    console.error("Contact form error:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}
