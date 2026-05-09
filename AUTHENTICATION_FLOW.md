# Authentication Flow Diagrams

## User Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

1. NEW USER (First Time)
   ┌──────────┐
   │  Browse  │
   │ Products │
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │   Add    │
   │ to Cart  │
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │   Cart   │
   │   Page   │
   └────┬─────┘
        │
        ▼
   ┌──────────────────┐
   │ Click "Login to  │
   │    Checkout"     │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │  Login Page      │
   │  /login          │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Click "Sign up   │
   │     here"        │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │  Signup Page     │
   │  /signup         │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Fill Form:       │
   │ - Full Name      │
   │ - Email          │
   │ - Phone          │
   │ - Password       │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Submit Form      │
   │ (Redux Action)   │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Mock Auth        │
   │ Service          │
   │ - Validate       │
   │ - Store User     │
   │ - Generate Token │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Success!         │
   │ Redirect to      │
   │ /login           │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Login with       │
   │ Credentials      │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Authenticated!   │
   │ Redirect to Cart │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ "Proceed to      │
   │  Checkout"       │
   │  Button Active   │
   └──────────────────┘


2. RETURNING USER (Already Registered)
   ┌──────────┐
   │  Browse  │
   │ Products │
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │   Add    │
   │ to Cart  │
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │   Cart   │
   │   Page   │
   └────┬─────┘
        │
        ▼
   ┌──────────────────┐
   │ Click "Login to  │
   │    Checkout"     │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │  Login Page      │
   │  /login          │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Enter Email &    │
   │ Password         │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Submit Form      │
   │ (Redux Action)   │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Mock Auth        │
   │ Service          │
   │ - Validate       │
   │ - Get User       │
   │ - Generate Token │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Success!         │
   │ Redirect to Cart │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ "Proceed to      │
   │  Checkout"       │
   │  Button Active   │
   └──────────────────┘
```

---

## Admin Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       ADMIN JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

   ┌──────────────────┐
   │  Any Page with   │
   │  PublicNavbar    │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Click "Admin"    │
   │    Button        │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Redirect to      │
   │ /admin/login     │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Admin Login Page │
   │ (Distinct Design)│
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Enter:           │
   │ Username: admin  │
   │ Password:        │
   │   admin123       │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Submit Form      │
   │ (Local State)    │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │ Validate         │
   │ Credentials      │
   └────┬─────────────┘
        │
        ├─── Valid ────────────┐
        │                      │
        │                      ▼
        │              ┌──────────────────┐
        │              │ Store Admin Data │
        │              │ in localStorage  │
        │              └────┬─────────────┘
        │                   │
        │                   ▼
        │              ┌──────────────────┐
        │              │ Success Alert    │
        │              └────┬─────────────┘
        │                   │
        │                   ▼
        │              ┌──────────────────┐
        │              │ Redirect to      │
        │              │ /admin           │
        │              └──────────────────┘
        │
        └─── Invalid ──────────┐
                               │
                               ▼
                       ┌──────────────────┐
                       │ Show Error:      │
                       │ "Invalid         │
                       │  credentials"    │
                       └──────────────────┘
```

---

## Redux State Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    REDUX AUTH STATE                              │
└─────────────────────────────────────────────────────────────────┘

Initial State:
┌──────────────────────────────┐
│ auth: {                      │
│   user: null,                │
│   token: null,               │
│   isAuthenticated: false,    │
│   loading: false,            │
│   error: null                │
│ }                            │
└──────────────────────────────┘

User Signup/Login Flow:
┌──────────────────┐
│ Component        │
│ dispatches       │
│ signup() or      │
│ login()          │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ authSlice        │
│ (pending)        │
│ loading: true    │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ authService      │
│ - Mock API call  │
│ - Validate       │
│ - Return data    │
└────┬─────────────┘
     │
     ├─── Success ──────────┐
     │                      │
     │                      ▼
     │              ┌──────────────────┐
     │              │ authSlice        │
     │              │ (fulfilled)      │
     │              │ user: {...}      │
     │              │ token: "..."     │
     │              │ isAuthenticated: │
     │              │   true           │
     │              │ loading: false   │
     │              └──────────────────┘
     │
     └─── Error ────────────┐
                            │
                            ▼
                    ┌──────────────────┐
                    │ authSlice        │
                    │ (rejected)       │
                    │ error: "..."     │
                    │ loading: false   │
                    └──────────────────┘

Components Access State:
┌──────────────────────────────┐
│ useSelector(                 │
│   selectIsAuthenticated      │
│ )                            │
│                              │
│ useSelector(                 │
│   selectCurrentUser          │
│ )                            │
│                              │
│ useSelector(                 │
│   selectAuthLoading          │
│ )                            │
└──────────────────────────────┘
```

---

## Cart Checkout Protection

```
┌─────────────────────────────────────────────────────────────────┐
│                  CART CHECKOUT LOGIC                             │
└─────────────────────────────────────────────────────────────────┘

CartPage Component:
┌──────────────────────────────┐
│ const isAuthenticated =      │
│   useSelector(               │
│     selectIsAuthenticated    │
│   )                          │
└────┬─────────────────────────┘
     │
     ▼
┌──────────────────────────────┐
│ Render Checkout Button:     │
│                              │
│ {isAuthenticated ? (         │
│   "Proceed to Checkout"      │
│ ) : (                        │
│   "Login to Checkout"        │
│ )}                           │
└────┬─────────────────────────┘
     │
     ▼
┌──────────────────────────────┐
│ handleCheckout():            │
│                              │
│ if (!isAuthenticated) {      │
│   navigate('/login', {       │
│     state: { from: '/cart' } │
│   })                         │
│   return                     │
│ }                            │
│                              │
│ // Proceed with checkout     │
└──────────────────────────────┘

User Flow:
┌──────────────────┐
│ User on Cart     │
│ Page             │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Not Logged In?   │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Button shows:    │
│ "Login to        │
│  Checkout"       │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Click Button     │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Redirect to      │
│ /login with      │
│ state: {         │
│   from: '/cart'  │
│ }                │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ User Logs In     │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Redirect back    │
│ to /cart         │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Now Logged In!   │
│ Button shows:    │
│ "Proceed to      │
│  Checkout"       │
└──────────────────┘
```

---

## Data Storage

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOCALSTORAGE STRUCTURE                        │
└─────────────────────────────────────────────────────────────────┘

User Authentication:
┌──────────────────────────────┐
│ localStorage                 │
│                              │
│ "token"                      │
│   → "mock_token_123..."      │
│                              │
│ "user"                       │
│   → {                        │
│       id: "123",             │
│       name: "John Doe",      │
│       email: "john@...",     │
│       phone: "0300..."       │
│     }                        │
│                              │
│ "registeredUsers"            │
│   → [                        │
│       {                      │
│         id: "123",           │
│         name: "John Doe",    │
│         email: "john@...",   │
│         phone: "0300...",    │
│         password: "..."      │
│       },                     │
│       ...                    │
│     ]                        │
└──────────────────────────────┘

Admin Authentication:
┌──────────────────────────────┐
│ localStorage                 │
│                              │
│ "adminToken"                 │
│   → "admin_token_456..."     │
│                              │
│ "admin"                      │
│   → {                        │
│       username: "admin",     │
│       role: "admin",         │
│       isLoggedIn: true,      │
│       loginTime: "..."       │
│     }                        │
└──────────────────────────────┘
```

---

## Component Interaction

```
┌─────────────────────────────────────────────────────────────────┐
│                  COMPONENT HIERARCHY                             │
└─────────────────────────────────────────────────────────────────┘

App.jsx
  │
  ├── PublicNavbar
  │     │
  │     ├── Admin Button → /admin/login
  │     ├── Cart Badge (shows count)
  │     └── Theme Toggle
  │
  ├── Routes
  │     │
  │     ├── /signup → UserSignup
  │     │              │
  │     │              ├── Form Fields
  │     │              ├── Validation
  │     │              └── Redux dispatch(signup)
  │     │
  │     ├── /login → UserLogin
  │     │             │
  │     │             ├── Form Fields
  │     │             ├── Validation
  │     │             ├── Redux dispatch(login)
  │     │             └── Redirect to cart
  │     │
  │     ├── /admin/login → AdminLogin
  │     │                   │
  │     │                   ├── Form Fields
  │     │                   ├── Validation
  │     │                   ├── localStorage
  │     │                   └── Redirect to /admin
  │     │
  │     └── /cart → CartPage
  │                   │
  │                   ├── useSelector(isAuthenticated)
  │                   ├── Conditional Button
  │                   └── handleCheckout()
  │
  └── Redux Store
        │
        └── auth: authSlice
              │
              ├── State
              ├── Actions (signup, login, logout)
              └── Selectors
```

---

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     ERROR SCENARIOS                              │
└─────────────────────────────────────────────────────────────────┘

Signup Errors:
┌──────────────────────────────┐
│ User submits signup form     │
└────┬─────────────────────────┘
     │
     ├─── Email already exists ──┐
     │                           │
     │                           ▼
     │                   ┌──────────────────┐
     │                   │ Show error:      │
     │                   │ "User with this  │
     │                   │  email already   │
     │                   │  exists"         │
     │                   └──────────────────┘
     │
     ├─── Invalid email format ──┐
     │                           │
     │                           ▼
     │                   ┌──────────────────┐
     │                   │ Show error:      │
     │                   │ "Email is        │
     │                   │  invalid"        │
     │                   └──────────────────┘
     │
     ├─── Password mismatch ─────┐
     │                           │
     │                           ▼
     │                   ┌──────────────────┐
     │                   │ Show error:      │
     │                   │ "Passwords do    │
     │                   │  not match"      │
     │                   └──────────────────┘
     │
     └─── Phone invalid ─────────┐
                                 │
                                 ▼
                         ┌──────────────────┐
                         │ Show error:      │
                         │ "Phone must be   │
                         │  11 digits"      │
                         └──────────────────┘

Login Errors:
┌──────────────────────────────┐
│ User submits login form      │
└────┬─────────────────────────┘
     │
     ├─── Invalid credentials ───┐
     │                           │
     │                           ▼
     │                   ┌──────────────────┐
     │                   │ Show error:      │
     │                   │ "Invalid email   │
     │                   │  or password"    │
     │                   └──────────────────┘
     │
     └─── Empty fields ──────────┐
                                 │
                                 ▼
                         ┌──────────────────┐
                         │ Show error:      │
                         │ "Email/Password  │
                         │  is required"    │
                         └──────────────────┘
```

---

**Visual Guide Complete!**
Use these diagrams to understand the authentication flow.
