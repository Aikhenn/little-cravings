import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { OrderProvider } from "@/order-context"
import { CartPage } from "@/pages/Orders/cart-page"
import { CheckoutPage } from "@/pages/Orders/checkout-page"
import { DatePage } from "@/pages/Orders/date-page"
import { MenuPage } from "@/pages/Orders/menu-page"
import Main from "./pages/Main"

export default function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route index element={<Main />} />

          <Route path="orders" >
            <Route index element={<DatePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  )
}
