import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { OrderProvider } from "@/order-context"
import { CartPage } from "@/pages/cart-page"
import { CheckoutPage } from "@/pages/checkout-page"
import { DatePage } from "@/pages/date-page"
import { MenuPage } from "@/pages/menu-page"

export default function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<DatePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  )
}
