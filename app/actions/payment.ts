"use server"

import { ChapaAPI } from "@/lib/chapa"
import type { CartItem, CustomerInfo, PaymentResult } from "@/lib/types"

export async function initializePayment(items: CartItem[], customer: CustomerInfo): Promise<PaymentResult> {
  try {
    const chapa = new ChapaAPI()
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const txRef = chapa.generateTxRef()

    const paymentData = {
      amount: total,
      currency: "ETB",
      email: customer.email,
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone_number: customer.phone,
      tx_ref: txRef,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?tx_ref=${txRef}`,
      customization: {
        title: "Millo Handcraft",
        description: "Payment for handcrafted products",
        logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
      },
    }

    const response = await chapa.initializePayment(paymentData)

    if (response.status === "success") {
      // Store order in database here
      await storeOrder(txRef, items, customer, total)

      return {
        success: true,
        checkoutUrl: response.data.checkout_url,
        txRef,
      }
    } else {
      return {
        success: false,
        error: response.message,
      }
    }
  } catch (error) {
    console.error("Payment initialization error:", error)
    return {
      success: false,
      error: "Failed to initialize payment. Please try again.",
    }
  }
}

export async function verifyPayment(txRef: string) {
  try {
    const chapa = new ChapaAPI()
    const response = await chapa.verifyPayment(txRef)

    if (response.status === "success" && response.data.status === "success") {
      // Update order status in database
      await updateOrderStatus(txRef, "paid", "completed")
      return { success: true, data: response.data }
    } else {
      await updateOrderStatus(txRef, "pending", "failed")
      return { success: false, error: "Payment verification failed" }
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return { success: false, error: "Failed to verify payment" }
  }
}

// Mock database functions - replace with actual database operations
async function storeOrder(txRef: string, items: CartItem[], customer: CustomerInfo, total: number) {
  // Store order in your database
  console.log("Storing order:", { txRef, items, customer, total })
}

async function updateOrderStatus(txRef: string, status: string, paymentStatus: string) {
  // Update order status in your database
  console.log("Updating order status:", { txRef, status, paymentStatus })
}
