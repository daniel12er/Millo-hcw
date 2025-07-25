import { type NextRequest, NextResponse } from "next/server"
import { ChapaAPI } from "@/lib/chapa"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tx_ref, status } = body

    if (!tx_ref) {
      return NextResponse.json({ error: "Missing tx_ref" }, { status: 400 })
    }

    const chapa = new ChapaAPI()
    const verification = await chapa.verifyPayment(tx_ref)

    if (verification.status === "success" && verification.data.status === "success") {
      // Update order status to paid
      console.log("Payment successful for tx_ref:", tx_ref)

      // Here you would update your database
      // await updateOrderStatus(tx_ref, 'paid', 'completed')

      return NextResponse.json({ message: "Payment verified successfully" })
    } else {
      console.log("Payment failed for tx_ref:", tx_ref)

      // Update order status to failed
      // await updateOrderStatus(tx_ref, 'pending', 'failed')

      return NextResponse.json({ message: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Callback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
