import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import AdminRoute from './components/admin/AdminRoute'
import Spinner from './components/ui/Spinner'

// ── Public pages ──
const HomePage      = lazy(() => import('./pages/HomePage'))
const CategoryPage  = lazy(() => import('./pages/CategoryPage'))
const ProductPage   = lazy(() => import('./pages/ProductPage'))
const CartPage      = lazy(() => import('./pages/CartPage'))
const CheckoutPage  = lazy(() => import('./pages/CheckoutPage'))
const AccountPage   = lazy(() => import('./pages/AccountPage'))
const LoginPage     = lazy(() => import('./pages/LoginPage'))
const RegisterPage  = lazy(() => import('./pages/RegisterPage'))
const BirthListPage = lazy(() => import('./pages/BirthListPage'))
const BlogPage      = lazy(() => import('./pages/BlogPage'))
const BlogPostPage  = lazy(() => import('./pages/BlogPostPage'))

// ── Admin pages ──
const AdminDashboard  = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts   = lazy(() => import('./pages/admin/AdminProducts'))
const AdminOrders     = lazy(() => import('./pages/admin/AdminOrders'))
const AdminCustomers  = lazy(() => import('./pages/admin/AdminCustomers'))
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'))
const AdminBlog       = lazy(() => import('./pages/admin/AdminBlog'))

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* ── Public routes ── */}
        <Route element={<PublicLayout />}>
          <Route path="/"                         element={<HomePage />} />
          <Route path="/categorie/:slug"          element={<CategoryPage />} />
          <Route path="/produit/:slug"            element={<ProductPage />} />
          <Route path="/panier"                   element={<CartPage />} />
          <Route path="/commande"                 element={<CheckoutPage />} />
          <Route path="/mon-compte"               element={<AccountPage />} />
          <Route path="/connexion"                element={<LoginPage />} />
          <Route path="/inscription"              element={<RegisterPage />} />
          <Route path="/liste-naissance"          element={<BirthListPage />} />
          <Route path="/liste-naissance/:shareId" element={<BirthListPage />} />
          <Route path="/blog"                     element={<BlogPage />} />
          <Route path="/blog/:slug"               element={<BlogPostPage />} />
        </Route>

        {/* ── Admin routes — own layout, no public Navbar/Footer ── */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index                  element={<AdminDashboard />} />
          <Route path="produits"        element={<AdminProducts />} />
          <Route path="commandes"       element={<AdminOrders />} />
          <Route path="clients"         element={<AdminCustomers />} />
          <Route path="categories"      element={<AdminCategories />} />
          <Route path="blog"            element={<AdminBlog />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
