"use server"

import { ProductService } from "@/lib/services/product-service"

export async function getProducts() {
  try {
    const products = await ProductService.getAllProducts()
    return { success: true, data: products }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { success: false, error: "Failed to fetch products" }
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const products = await ProductService.getProductsByCategory(category)
    return { success: true, data: products }
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return { success: false, error: "Failed to fetch products" }
  }
}
