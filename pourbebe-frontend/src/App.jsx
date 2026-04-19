import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AnnouncementBar from './components/layout/AnnouncementBar'
import CartDrawer from './components/cart/CartDrawer'
import Spinner from './components/ui/Spinner'

const HomePage        = lazy(() => import('./pages/HomePage'))
const CategoryPage    = lazy(() => import('./pages/CategoryPage'))
const ProductPage     = lazy(() => import('./pages/ProductPage'))
const CartPage        = lazy(() => import('./pages/CartPage'))
const CheckoutPage    = lazy(() => import('./pages/CheckoutPage'))
const AccountPage     = lazy(() => import('./pages/AccountPage'))
const LoginPage       = lazy(() => import('./pages/LoginPage'))
const RegisterPage    = lazy(() => import('./pages/RegisterPage'))
const BirthListPage   = lazy(() => import('./pages/BirthListPage'))

export default function App() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/"                       element={<HomePage />} />
            <Route path="/categorie/:slug"         element={<CategoryPage />} />
            <Route path="/produit/:slug"           element={<ProductPage />} />
            <Route path="/panier"                  element={<CartPage />} />
            <Route path="/commande"                element={<CheckoutPage />} />
            <Route path="/mon-compte"              element={<AccountPage />} />
            <Route path="/connexion"               element={<LoginPage />} />
            <Route path="/inscription"             element={<RegisterPage />} />
            <Route path="/liste-naissance"         element={<BirthListPage />} />
            <Route path="/liste-naissance/:shareId" element={<BirthListPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
