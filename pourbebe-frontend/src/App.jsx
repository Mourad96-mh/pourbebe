import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import AdminRoute from './admin/components/AdminRoute'
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
const BirthListPage      = lazy(() => import('./pages/BirthListPage'))
const BlogPage           = lazy(() => import('./pages/BlogPage'))
const BlogPostPage       = lazy(() => import('./pages/BlogPostPage'))
const SearchPage         = lazy(() => import('./pages/SearchPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage  = lazy(() => import('./pages/ResetPasswordPage'))
const WishlistPage          = lazy(() => import('./pages/WishlistPage'))
const LivraisonPage         = lazy(() => import('./pages/LivraisonPage'))
const RetoursPage           = lazy(() => import('./pages/RetoursPage'))
const CGVPage               = lazy(() => import('./pages/CGVPage'))
const MentionsLegalesPage   = lazy(() => import('./pages/MentionsLegalesPage'))
const ConfidentialitePage   = lazy(() => import('./pages/ConfidentialitePage'))

// ── Admin pages ──
const AdminDashboard  = lazy(() => import('./admin/pages/AdminDashboard'))
const AdminProducts   = lazy(() => import('./admin/pages/AdminProducts'))
const AdminOrders     = lazy(() => import('./admin/pages/AdminOrders'))
const AdminCategories = lazy(() => import('./admin/pages/AdminCategories'))
const AdminBlog        = lazy(() => import('./admin/pages/AdminBlog'))
const AdminBirthLists  = lazy(() => import('./admin/pages/AdminBirthLists'))
const AdminBanners     = lazy(() => import('./admin/pages/AdminBanners'))
const AdminCuration    = lazy(() => import('./admin/pages/AdminCuration'))

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
          <Route path="/blog"                                          element={<BlogPage />} />
          <Route path="/blog/:slug"                                    element={<BlogPostPage />} />
          <Route path="/recherche"                                     element={<SearchPage />} />
          <Route path="/mot-de-passe-oublie"                          element={<ForgotPasswordPage />} />
          <Route path="/reinitialiser-mot-de-passe/:token"            element={<ResetPasswordPage />} />
          <Route path="/favoris"                                       element={<WishlistPage />} />
          <Route path="/livraison"                                     element={<LivraisonPage />} />
          <Route path="/retours"                                       element={<RetoursPage />} />
          <Route path="/cgv"                                           element={<CGVPage />} />
          <Route path="/mentions-legales"                              element={<MentionsLegalesPage />} />
          <Route path="/confidentialite"                               element={<ConfidentialitePage />} />
        </Route>

        {/* ── Admin routes — own layout, no public Navbar/Footer ── */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index                  element={<AdminDashboard />} />
          <Route path="produits"        element={<AdminProducts />} />
          <Route path="commandes"       element={<AdminOrders />} />
          <Route path="categories"      element={<AdminCategories />} />
          <Route path="blog"            element={<AdminBlog />} />
          <Route path="listes-naissance" element={<AdminBirthLists />} />
          <Route path="bannieres"        element={<AdminBanners />} />
          <Route path="selections"       element={<AdminCuration />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
