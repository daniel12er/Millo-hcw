"use server"

import { OrderService } from "@/lib/services/order-service"
import type { CartItem, CustomerInfo } from "@/lib/types"

export async function createOrder(items: CartItem[], customer: CustomerInfo, txRef: string) {
  try {
    const orderItems = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    const result = await OrderService.createOrder(customer, orderItems, txRef)
    return { success: true, data: result }
  } catch (error) {
    console.error("Error creating order:", error)
    return { success: false, error: "Failed to create order" }
  }
}

export async function updateOrderStatus(txRef: string, status: string, paymentStatus: string) {
  try {
    await OrderService.updateOrderStatus(txRef, status, paymentStatus)
    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { success: false, error: "Failed to update order status" }
  }
}

export async function getOrderByTxRef(txRef: string) {
  try {
    const order = await OrderService.getOrderByTxRef(txRef)
    return { success: true, data: order }
  } catch (error) {
    console.error("Error fetching order:", error)
    return { success: false, error: "Failed to fetch order" }
  }
}
