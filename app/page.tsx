import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Products from "@/components/products"
import Works from "@/components/works"
import Delivery from "@/components/delivery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ShoppingCart from "@/components/shopping-cart"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Products />
      <Works />
      <Delivery />
      <Contact />
      <Footer />
      <ShoppingCart />
      <BackToTop />
    </main>
  )
}
