# AR Product Analyzer

A React + Vite + Redux + Tailwind CSS project for AR-powered furniture browsing.

## Setup

```bash
npm install
npm run dev
```

## Folder Structure

```
src/
├── assets/               # Images, SVGs
├── components/
│   ├── common/           # Shared UI (Member 1)
│   ├── product/          # ProductCard etc. (Member 2) ✅
│   └── admin/            # Admin components (Member 4)
├── data/                 # Static data & helpers
│   ├── products.js
│   ├── categories.js
│   ├── users.js
│   ├── adminStats.js
│   ├── helpers.js
│   └── index.js
├── layouts/              # Page layout wrappers
├── pages/
│   ├── public/
│   │   ├── HomePage.jsx          (Member 1)
│   │   ├── ProductListPage.jsx   (Member 2) ✅
│   │   ├── ProductDetailPage.jsx (Member 3)
│   │   ├── FavoritesPage.jsx     (Member 2) ✅
│   │   ├── LoginPage.jsx         (Member 4)
│   │   └── AboutPage.jsx         (Member 1)
│   └── admin/
│       ├── AdminLoginPage.jsx      (Member 4)
│       ├── AdminDashboardPage.jsx  (Member 4)
│       ├── AddProductPage.jsx      (Member 4)
│       ├── ManageProductsPage.jsx  (Member 4)
│       └── EditProductPage.jsx     (Member 4)
├── routes/
│   └── ProtectedRoute.jsx
├── store/
│   ├── productsSlice.js
│   ├── favoritesSlice.js
│   ├── authSlice.js
│   ├── adminSlice.js
│   ├── selectors.js
│   └── index.js
└── styles/               # Global / shared styles
```

## Git Workflow

Always pull `dev` before starting work:
```bash
git pull origin dev
```

Branch naming:
- `feature/member1-home-layout`
- `feature/member2-listing-favorites`
- `feature/member3-product-detail`
- `feature/member4-admin`
