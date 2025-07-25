"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Package, Truck } from "lucide-react"

// Mock orders data - replace with actual API call
const mockOrders = [
  {
    id: "millo-1704123456789-abc123",
    customer: "John Doe",
    email: "john@example.com",
    total: 4500,
    status: "paid",
    paymentStatus: "completed",
    items: [
      { name: "Kenbet", quantity: 1, price: 1500 },
      { name: "Home Decor Set", quantity: 1, price: 3000 },
    ],
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "millo-1704123456790-def456",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 2500,
    status: "processing",
    paymentStatus: "completed",
    items: [{ name: "Znte", quantity: 1, price: 2500 }],
    createdAt: "2024-01-01T11:00:00Z",
  },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Order Management</h1>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search orders by customer, email, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.id.split("-").pop()}</CardTitle>
                  <p className="text-gray-600">
                    {order.customer} • {order.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{order.total.toLocaleString()} ETB</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Badge variant="outline">{order.paymentStatus === "completed" ? "Paid" : "Pending"}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Items:</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>{(item.price * item.quantity).toLocaleString()} ETB</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                  {order.status === "paid" && (
                    <Button variant="outline" size="sm">
                      <Package size={16} className="mr-2" />
                      Mark as Processing
                    </Button>
                  )}
                  {order.status === "processing" && (
                    <Button variant="outline" size="sm">
                      <Truck size={16} className="mr-2" />
                      Mark as Shipped
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
