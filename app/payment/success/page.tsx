"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyPayment } from "@/app/actions/payment"

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const txRef = searchParams.get("tx_ref")
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "failed">("loading")
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    if (txRef) {
      verifyPayment(txRef).then((result) => {
        if (result.success) {
          setVerificationStatus("success")
          setPaymentData(result.data)
        } else {
          setVerificationStatus("failed")
        }
      })
    } else {
      setVerificationStatus("failed")
    }
  }, [txRef])

  if (verificationStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600 text-center">Please wait while we confirm your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (verificationStatus === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Payment Failed</h2>
            <p className="text-gray-600 text-center mb-6">
              We couldn't verify your payment. Please contact support if you believe this is an error.
            </p>
            <div className="space-y-3 w-full">
              <Link href="/" className="w-full">
                <Button className="w-full">Return to Home</Button>
              </Link>
              <Link href="#contact" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>
          </div>

          {paymentData && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm">{txRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">{paymentData.amount?.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="capitalize">{paymentData.method}</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              You will receive an email confirmation shortly. We'll also send you tracking information once your order
              ships.
            </p>

            <div className="space-y-2">
              <Link href="/" className="w-full">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
              </Link>
              <Link href="#contact" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
