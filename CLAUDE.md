# CLAUDE.md — Pour Bébé E-commerce

This file gives Claude Code full context about this project so it can assist
effectively without needing repeated explanations.

---

## Project Overview

A premium baby products e-commerce website targeting the Moroccan market.
Two separate apps: a React frontend (Vite) and a Node.js/Express REST API backend.

**Brand:** Pour Bébé — Vêtements et Accessoires
**Logo:** Sky-blue oval, white stroller illustration, yellow star accents
**Target audience:** Moroccan parents shopping for baby products, newborn gifts, maternity items
**Primary language:** French

**Business goals:**
- Full baby product catalog (puériculture, vêtements, chambre, hygiène, éveil, maman)
- Gift cards
- Physical store locations + online delivery across Morocco
- Free shipping threshold: 400 DH

---

## Architecture — Two Separate Repos

```
pourbebe-frontend/   ← React (Vite) SPA
pourbebe-backend/    ← Node.js + Express REST API
```

They communicate over HTTP. The frontend calls the backend API.
Never mix frontend and backend code in the same folder.

---

## Frontend Stack — `pourbebe-frontend/`

| Layer            | Choice                                         |
|------------------|------------------------------------------------|
| Framework        | React 18                                       |
| Build tool       | Vite                                           |
| Language         | JavaScript (JSX) — no TypeScript               |
| Routing          | React Router v6                                |
| Styling          | Pure CSS (CSS custom properties + CSS Modules) |
| State — server   | TanStack Query (React Query v5)                |
| State — client   | Zustand (cart, wishlist, UI state)             |
| Forms            | React Hook Form                                |
| HTTP client      | Axios (with baseURL pointing to API)           |
| Deployment       | Vercel / Netlify                               |

---

## Backend Stack — `pourbebe-backend/`

| Layer            | Choice                                      |
|------------------|---------------------------------------------|
| Runtime          | Node.js 20+                                 |
| Framework        | Express.js                                  |
| Language         | JavaScript — no TypeScript                  |
| Database         | PostgreSQL                                  |
| ORM              | Prisma                                      |
| Auth             | JWT (jsonwebtoken) + bcrypt                 |
| File uploads     | Multer + Cloudinary SDK                     |
| Email            | Resend                                      |
| Validation       | Zod                                         |
| Payments         | CMI / PayDunya (Moroccan gateways) + COD    |
| Deployment       | Railway / Render                            |

---

## Frontend Project Structure — `pourbebe-frontend/`

```
pourbebe-frontend/
├── public/
│   └── fonts/                    # Self-hosted Cormorant Garamond + Nunito
├── src/
│   ├── main.jsx                  # App entry point, imports tokens.css
│   ├── App.jsx                   # React Router setup
│   ├── index.css                 # Global reset + base body styles only
│   ├── styles/
│   │   ├── tokens.css            # ALL CSS custom properties (colors, type, spacing)
│   │   └── fonts.css             # @font-face declarations
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.module.css
│   │   ├── CategoryPage.jsx
│   │   ├── CategoryPage.module.css
│   │   ├── ProductPage.jsx
│   │   ├── ProductPage.module.css
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── AccountPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── BirthListPage.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.module.css
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.module.css
│   │   │   ├── AnnouncementBar.jsx
│   │   │   └── AnnouncementBar.module.css
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCard.module.css
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductGrid.module.css
│   │   │   ├── ProductGallery.jsx
│   │   │   └── ProductFilters.jsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CartDrawer.module.css
│   │   │   └── CartItem.jsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.jsx
│   │   │   └── OrderSummary.jsx
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HeroSection.module.css
│   │   │   ├── CategoryGrid.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   └── BirthListBanner.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Button.module.css
│   │       ├── Badge.jsx
│   │       ├── Badge.module.css
│   │       ├── Modal.jsx
│   │       └── Spinner.jsx
│   ├── hooks/
│   │   ├── useCart.js            # Zustand cart store + actions
│   │   ├── useWishlist.js        # Zustand wishlist store
│   │   ├── useAuth.js            # Auth state + JWT helpers
│   │   └── useProducts.js        # TanStack Query product hooks
│   ├── lib/
│   │   ├── api.js                # Axios instance with baseURL + interceptors
│   │   └── utils.js              # formatPrice(), slugify(), etc.
│   └── context/
│       └── AuthContext.jsx       # Global auth context provider
├── .env
├── vite.config.js
└── package.json
```

---

## Backend Project Structure — `pourbebe-backend/`

```
pourbebe-backend/
├── src/
│   ├── server.js                 # Entry point — starts Express on PORT
│   ├── app.js                    # Middleware setup + routes registration
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── products.routes.js
│   │   ├── categories.routes.js
│   │   ├── orders.routes.js
│   │   ├── users.routes.js
│   │   ├── birthlist.routes.js
│   │   └── admin.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── products.controller.js
│   │   ├── orders.controller.js
│   │   └── birthlist.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js    # Verify JWT, attach req.user
│   │   ├── admin.middleware.js   # Check role === ADMIN
│   │   └── validate.middleware.js # Zod schema validation
│   └── lib/
│       ├── prisma.js             # Prisma client singleton
│       ├── cloudinary.js         # Upload helpers
│       └── email.js              # Resend email helpers
├── prisma/
│   └── schema.prisma
├── .env
└── package.json
```

---

## Design System

**Aesthetic:** Premium, soft & editorial. Inspired directly by the client's logo —
sky blue, clean white, and warm star-yellow accents. Friendly yet refined,
never childish or generic.

---

### Color Tokens — `src/styles/tokens.css`

Import once in `main.jsx`. All components reference these variables.
**Never hardcode hex values anywhere in the project.**

```css
:root {
  /* ── Brand blues (extracted from logo) ── */
  --sky:            #7DD8E8;   /* logo fill, icon backgrounds, light surfaces  */
  --sky-dark:       #4BBDD4;   /* primary CTAs, active borders, hover states   */
  --sky-deep:       #1A7A8F;   /* headings, strong accents, links              */
  --sky-light:      #C8EFF6;   /* dividers, card borders, banner backgrounds   */
  --sky-pale:       #EAF8FC;   /* page section backgrounds, category card bg   */

  /* ── Star yellow (extracted from logo) ── */
  --star:           #F5E6A3;   /* decorative star shapes                       */
  --star-dark:      #D4B84A;   /* "Nouveau" badge background                   */
  --star-text:      #7A5C10;   /* text placed on star-yellow backgrounds        */

  /* ── Neutrals ── */
  --white:          #FFFFFF;
  --off-white:      #F7FCFE;   /* page background (white with sky tint)        */

  /* ── Text ── */
  --text-dark:      #133A45;   /* primary text, footer background              */
  --text-mid:       #3A7080;   /* body text, descriptions                      */
  --text-light:     #6BAAB8;   /* secondary labels, muted info                 */
  --text-faint:     #A8CDD6;   /* placeholders, disabled states                */

  /* ── Semantic ── */
  --color-success:  #3B9E6A;
  --color-error:    #D95B5B;
  --color-warning:  #D4A84A;

  /* ── Type scale ── */
  --text-xs:        10px;      /* section tags, uppercase labels               */
  --text-sm:        11px;      /* badges, meta info, footer links              */
  --text-base:      13px;      /* body text, descriptions                      */
  --text-md:        15px;      /* nav links, card names                        */
  --text-lg:        18px;      /* subheadings                                  */
  --text-xl:        24px;      /* stats, small section titles                  */
  --text-2xl:       34px;      /* section titles                               */
  --text-3xl:       48px;      /* hero headline                                */

  /* ── Spacing scale ── */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-14:  56px;

  /* ── Breakpoints (reference in @media queries) ── */
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
}
```

---

### Typography

Fonts loaded via Google Fonts in `index.html` or self-hosted in `public/fonts/`.

```
Display / all headings  →  'Cormorant Garamond', serif
                           Weights: 300, 400, 600
                           Use font-style: italic on <em> inside titles

Body / UI / buttons     →  'Nunito', sans-serif
                           Weights: 300, 400, 500, 600
```

Never use: Inter, Roboto, Arial, system-ui as primary typefaces.

---

### CSS Architecture Rules

**One `.module.css` per component**, always next to its `.jsx` file:

```
src/components/product/ProductCard.jsx
src/components/product/ProductCard.module.css
```

Import pattern in every component:
```jsx
import styles from './ProductCard.module.css'
// className={styles.card}  className={styles.title}
```

**`index.css` (global) contains only:**
- `*` box-sizing reset
- `body` font, color, background
- `a` link reset
- Scrollbar styling

**`tokens.css`** — imported once at the top of `main.jsx`, nowhere else.

**Hard rules:**
- Never hardcode hex values — always `var(--token-name)`
- No inline `style={{}}` except truly dynamic values (e.g. `style={{ width: pct + '%' }}`)
- No `!important`
- No utility class names — every class is semantic (`card`, `btn-primary`, `section-title`)
- No nesting deeper than 3 levels
- No Tailwind, no styled-components, no emotion, no CSS-in-JS of any kind
- Animations: CSS `transition` and `@keyframes` only

---

### Reusable CSS Patterns

**Primary button:**
```css
.btn-primary {
  background: var(--sky-dark);
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 13px 28px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-primary:hover { background: var(--sky-deep); }
```

**Ghost button:**
```css
.btn-ghost {
  background: transparent;
  color: var(--sky-deep);
  font-family: 'Nunito', sans-serif;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 13px 28px;
  border: 1.5px solid var(--sky);
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-ghost:hover { background: var(--sky-pale); }
```

**Section tag (label above every section title):**
```css
.section-tag {
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sky-dark);
  font-weight: 600;
}
```

**Section title:**
```css
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: var(--text-2xl);
  font-weight: 300;
  color: var(--text-dark);
  line-height: 1.15;
}
.section-title em {
  font-style: italic;
  color: var(--sky-deep);
}
```

**Product card image area:** background `var(--sky-pale)` — never pure white.
**Borders:** `1px solid var(--sky-light)` — never heavier.
**Border radius:** `2px` for cards/buttons, `50%` for circles only.

---

## Axios API Setup

```js
// src/lib/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
```

All API calls go through this instance — never use `fetch` directly.

---

## REST API Endpoints

```
Auth
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/me

Products
  GET    /api/products            ?category= &brand= &min= &max= &sort= &page=
  GET    /api/products/:slug

Categories
  GET    /api/categories          full tree
  GET    /api/categories/:slug    single + products

Orders
  POST   /api/orders
  GET    /api/orders/mine
  GET    /api/orders/:id

Birth List
  POST   /api/birthlist
  GET    /api/birthlist/:shareId  public view
  PATCH  /api/birthlist/:id
  POST   /api/birthlist/:id/items
  DELETE /api/birthlist/:id/items/:itemId

Admin (requires ADMIN role)
  GET    /api/admin/products
  POST   /api/admin/products
  PATCH  /api/admin/products/:id
  DELETE /api/admin/products/:id
  GET    /api/admin/orders
  PATCH  /api/admin/orders/:id/status
```

---

## Key Features to Build

### 1. Product Catalog
- Category pages with faceted filters (brand, price range, age, color)
- Sort by: newest, price asc/desc, bestsellers, promos
- ProductCard: image, brand, name, price, discount badge, wishlist toggle

### 2. Product Detail Page
- Image gallery with thumbnail switcher
- Variant selector (color, size where applicable)
- Add to cart / wishlist
- Related products row

### 3. Cart & Checkout
- Slide-out CartDrawer via Zustand
- Multi-step checkout: address → shipping → payment
- Payment methods: CMI card, bank transfer, cash on delivery
- Order confirmation email via Resend

### 4. User Account
- Register / login (JWT in localStorage)
- Order history + tracking status
- Wishlist management
- Saved addresses

### 5. Liste de Naissance
- Create named list with due date
- Add products from catalog
- Share via unique public URL
- Guests mark items reserved / purchased
- Owner sees purchase status per item

### 6. Admin Dashboard (`/admin` — protected)
- Product CRUD + Cloudinary image upload
- Order management + status updates
- Customer list
- Promo code management

---

## Database Schema (Prisma)

```prisma
model Product {
  id            String         @id @default(cuid())
  slug          String         @unique
  name          String
  brand         String
  description   String
  price         Decimal
  compareAt     Decimal?
  images        String[]
  categoryId    String
  tags          String[]
  inStock       Boolean        @default(true)
  isNew         Boolean        @default(false)
  createdAt     DateTime       @default(now())
  category      Category       @relation(fields: [categoryId], references: [id])
  variants      Variant[]
  orderItems    OrderItem[]
  wishlistItems WishlistItem[]
}

model Category {
  id        String     @id @default(cuid())
  slug      String     @unique
  name      String
  parentId  String?
  parent    Category?  @relation("SubCategories", fields: [parentId], references: [id])
  children  Category[] @relation("SubCategories")
  products  Product[]
}

model User {
  id         String        @id @default(cuid())
  email      String        @unique
  password   String
  name       String?
  role       Role          @default(CUSTOMER)
  createdAt  DateTime      @default(now())
  orders     Order[]
  wishlist   WishlistItem[]
  birthLists BirthList[]
}

enum Role { CUSTOMER ADMIN }

model Order {
  id        String      @id @default(cuid())
  userId    String?
  status    OrderStatus @default(PENDING)
  total     Decimal
  currency  String      @default("MAD")
  items     OrderItem[]
  address   Json
  payment   Json?
  createdAt DateTime    @default(now())
  user      User?       @relation(fields: [userId], references: [id])
}

enum OrderStatus { PENDING CONFIRMED SHIPPED DELIVERED CANCELLED REFUNDED }

model BirthList {
  id        String          @id @default(cuid())
  shareId   String          @unique @default(cuid())
  name      String
  dueDate   DateTime?
  userId    String
  user      User            @relation(fields: [userId], references: [id])
  items     BirthListItem[]
  createdAt DateTime        @default(now())
}

model BirthListItem {
  id          String    @id @default(cuid())
  birthListId String
  productId   String
  quantity    Int       @default(1)
  reserved    Boolean   @default(false)
  purchased   Boolean   @default(false)
  birthList   BirthList @relation(fields: [birthListId], references: [id])
}
```

---

## Naming Conventions

- Components: PascalCase — `ProductCard.jsx`, `CartDrawer.jsx`
- CSS Modules: same name — `ProductCard.module.css`
- Pages: PascalCase + Page suffix — `HomePage.jsx`
- Hooks: camelCase + `use` prefix — `useCart.js`
- Backend files: camelCase + type suffix — `products.controller.js`
- CSS class names: semantic, lowercase, hyphenated — `card-header`, `btn-primary`
- No utility-style names — never `mt-4`, `flex-col`, `text-sm`
- All user-facing text: French

---

## Environment Variables

**Frontend — `pourbebe-frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=
```

**Backend — `pourbebe-backend/.env`:**
```env
PORT=5000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RESEND_API_KEY=

CMI_MERCHANT_ID=
CMI_SECRET_KEY=

CLIENT_URL=http://localhost:5173
```

---

## Coding Guidelines for Claude

**General:**
- JavaScript only — no TypeScript in this project
- `async/await` everywhere — never `.then()` chains
- Always wrap async operations in try/catch
- Small, focused functions — one responsibility each

**React frontend:**
- Functional components only — no class components
- One component per file
- `useQuery` for all data fetching — never `useEffect` + `fetch`/`axios`
- `useMutation` for all writes (POST, PATCH, DELETE)
- Zustand for cart, wishlist, and UI state (drawer open/close, modal)
- `React.lazy` + `Suspense` for page-level code splitting
- `formatPrice(amount)` for every price display → outputs `1 299 DH`
- Images: always set `width` and `height` attributes or use `aspect-ratio` in CSS

**Pure CSS rules:**
- No Tailwind, no CSS-in-JS, no styled-components
- Every component has its own `.module.css` file
- Import: `import styles from './MyComponent.module.css'`
- Colors: always `var(--token)` — never hardcoded hex
- Animations: CSS `transition` and `@keyframes` only
- Responsive: CSS Grid + Flexbox, mobile-first with `min-width` media queries

**Express backend:**
- Routes → Controllers → Prisma (never skip layers)
- Validate all inputs with Zod before touching the DB
- Consistent response shape: `{ success: true, data: ... }` or `{ success: false, error: '...' }`
- Use `express-async-errors` package — no manual try/catch in every controller
- Passwords: bcrypt with 12 salt rounds
- JWT: 7-day expiry, stored in frontend localStorage

---

## Useful Commands

**Frontend:**
```bash
cd pourbebe-frontend
npm run dev        # Vite dev server → http://localhost:5173
npm run build      # production build
npm run preview    # preview production build locally
```

**Backend:**
```bash
cd pourbebe-backend
npm run dev        # nodemon → http://localhost:5000
npm start          # node src/server.js

npx prisma db push        # sync schema to dev DB (no migration file)
npx prisma migrate dev    # create + apply named migration
npx prisma studio         # open DB browser GUI
npx prisma generate       # regenerate Prisma client after schema change
```

---

## Competitive Context

Main Moroccan competitors: gobebe.ma, hellokids.ma, babyfive.ma, trendymom.ma.

**Our differentiators:**
- Premium design aesthetic — competitors all look generic
- Birth list feature with shareable URL (only babyfive.ma has this)
- Dedicated "Pour Maman" section
- Better mobile UX and Lighthouse performance (target > 90)
- Bilingual French + Arabic — planned v2
