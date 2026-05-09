# Authentication System Guide

## Overview
Complete authentication system with user signup/login and admin login functionality. All forms feature attractive purple-themed UI matching the project design.

---

## Features Implemented

### 1. User Authentication
- **User Signup** (`/signup`)
  - Full registration form with validation
  - Fields: Full Name, Email, Phone, Password, Confirm Password
  - Real-time error validation
  - Password visibility toggle
  - Redux integration for state management
  - Mock authentication service (ready for backend integration)

- **User Login** (`/login`)
  - Email and password authentication
  - Remember me functionality
  - Forgot password placeholder
  - Social login placeholders (Google, Facebook)
  - Redirects to cart after successful login
  - Preserves intended destination (if redirected from cart)

### 2. Admin Authentication
- **Admin Login** (`/admin/login`)
  - Distinct admin portal design
  - Security notice and system status indicator
  - Demo credentials displayed
  - Redirects to admin dashboard after login
  - Separate authentication flow from users

### 3. Cart Integration
- **Checkout Protection**
  - Users must login before proceeding to checkout
  - "Login to Checkout" button when not authenticated
  - "Proceed to Checkout" button when authenticated
  - Automatic redirect to login with return path

### 4. Navigation Updates
- **PublicNavbar**
  - Admin button now redirects to `/admin/login` instead of `/admin`
  - Proper authentication flow enforcement

---

## Routes

```javascript
/signup          → User Signup Page
/login           → User Login Page
/admin/login     → Admin Login Page
/cart            → Cart Page (checkout requires login)
/admin           → Admin Dashboard (requires admin login)
```

---

## Demo Credentials

### Admin Login
- **Username:** `admin`
- **Password:** `admin123`

### User Login
- Users must first signup to create an account
- Then login with their registered email and password

---

## File Structure

```
src/
├── pages/
│   ├── auth/
│   │   ├── UserSignup.jsx      # User registration form
│   │   ├── UserLogin.jsx       # User login form
│   │   └── AdminLogin.jsx      # Admin login form
│   └── public/
│       └── CartPage.jsx        # Updated with auth check
├── features/
│   └── auth/
│       ├── authSlice.js        # Redux auth state management
│       └── authService.js      # Mock authentication API
├── components/
│   └── PublicNavbar.jsx        # Updated admin button
└── App.jsx                     # Routes configuration
```

---

## How It Works

### User Flow
1. User adds products to cart
2. User clicks "Proceed to Checkout" on cart page
3. If not logged in → Redirected to `/login`
4. After successful login → Redirected back to cart
5. User can now proceed with checkout

### Admin Flow
1. Admin clicks "Admin" button in navbar
2. Redirected to `/admin/login`
3. Enters admin credentials
4. After successful login → Redirected to admin dashboard

---

## Redux State Management

### Auth Slice
```javascript
state: {
  user: null | { id, name, email, phone },
  token: null | string,
  isAuthenticated: boolean,
  loading: boolean,
  error: null | string
}
```

### Actions
- `signup(userData)` - Register new user
- `login(credentials)` - Authenticate user
- `logoutUser()` - Clear auth state
- `clearAuthError()` - Clear error messages

### Selectors
- `selectCurrentUser` - Get current user object
- `selectAuthToken` - Get auth token
- `selectIsAuthenticated` - Check if user is logged in
- `selectAuthLoading` - Get loading state
- `selectAuthError` - Get error message

---

## Mock Authentication Service

Currently using localStorage-based mock authentication. Ready for backend integration.

### Mock Features
- User registration with duplicate email check
- Password validation
- Token generation
- Session persistence
- Simulated API delays (800ms)

### Backend Integration (TODO)
Replace mock service with actual API calls:

```javascript
// src/features/auth/authService.js
const API_URL = 'http://localhost:5000/api/auth'

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData)
  // ... handle response
}

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  // ... handle response
}
```

---

## Form Validation

### User Signup
- Full Name: Required
- Email: Required, valid email format
- Phone: Required, exactly 11 digits
- Password: Required, minimum 6 characters
- Confirm Password: Must match password

### User Login
- Email: Required, valid email format
- Password: Required

### Admin Login
- Username: Required
- Password: Required

---

## UI Features

### Design Elements
- Purple gradient theme (#9955ff, #7c3aed)
- Glassmorphism effects
- Smooth animations and transitions
- Hover effects with glow
- Loading states with disabled buttons
- Error messages with icons
- Password visibility toggle
- Responsive design

### Light Theme Support
- All forms support light/dark theme toggle
- Automatic color adjustments
- Maintains readability in both themes

---

## Security Features

### Current Implementation
- Password visibility toggle
- Client-side validation
- Error handling
- Session persistence
- Duplicate email prevention

### TODO (Backend Integration)
- Password hashing (bcrypt)
- JWT token authentication
- Refresh token mechanism
- Rate limiting
- CSRF protection
- Email verification
- Password reset functionality
- Two-factor authentication

---

## Testing the System

### Test User Signup
1. Navigate to `/signup`
2. Fill in all fields:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 03001234567
   - Password: password123
   - Confirm Password: password123
3. Click "Create Account"
4. Should redirect to login page

### Test User Login
1. Navigate to `/login`
2. Enter registered credentials
3. Click "Login to Account"
4. Should redirect to cart page

### Test Admin Login
1. Navigate to `/admin/login`
2. Enter credentials:
   - Username: admin
   - Password: admin123
3. Click "Access Dashboard"
4. Should redirect to admin dashboard

### Test Cart Checkout Protection
1. Add products to cart
2. Navigate to `/cart`
3. If not logged in, button shows "Login to Checkout"
4. Click button → Redirects to login
5. After login → Returns to cart
6. Button now shows "Proceed to Checkout"

---

## Next Steps

### Immediate Tasks
- [ ] Connect to actual backend API
- [ ] Implement protected route wrapper for admin pages
- [ ] Add logout functionality to navbar
- [ ] Display user name in navbar when logged in
- [ ] Add user profile page
- [ ] Implement password reset flow

### Future Enhancements
- [ ] Social login integration (Google, Facebook)
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Remember me functionality (persistent sessions)
- [ ] Session timeout handling
- [ ] Account settings page
- [ ] Order history for logged-in users

---

## Team Workflow

### For Frontend Developers
1. Use mock authentication for development
2. Test all authentication flows
3. Ensure UI matches project theme
4. Handle loading and error states

### For Backend Developers
1. Create authentication API endpoints
2. Implement JWT token generation
3. Add password hashing
4. Set up database models
5. Update authService.js to use real API

### Integration Steps
1. Backend team creates API endpoints
2. Frontend team updates authService.js
3. Test authentication flow end-to-end
4. Deploy and monitor

---

## Troubleshooting

### Common Issues

**Issue:** "User already exists" error
- **Solution:** Email is already registered. Try different email or login.

**Issue:** "Invalid credentials" error
- **Solution:** Check email/password. For admin, use: admin / admin123

**Issue:** Not redirected after login
- **Solution:** Check browser console for errors. Ensure Redux store is configured.

**Issue:** Button still shows "Login to Checkout" after login
- **Solution:** Refresh page or check if auth state is properly updated.

---

## Code Examples

### Using Authentication in Components

```javascript
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectCurrentUser } from '../features/auth/authSlice'

function MyComponent() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectCurrentUser)
  
  if (!isAuthenticated) {
    return <div>Please login</div>
  }
  
  return <div>Welcome, {user.name}!</div>
}
```

### Protecting Routes

```javascript
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../features/auth/authSlice'

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Usage in App.jsx
<Route 
  path="/checkout" 
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  } 
/>
```

---

## Summary

✅ **Completed:**
- User signup form with validation
- User login form with remember me
- Admin login with distinct design
- Cart checkout authentication check
- Redux state management integration
- Mock authentication service
- Light/dark theme support
- Error handling and loading states
- Responsive design

🔄 **In Progress:**
- Backend API integration

📋 **Pending:**
- Protected route wrapper
- Logout functionality
- User profile page
- Password reset flow

---

**Last Updated:** May 8, 2026
**Status:** ✅ Ready for Testing
**Next:** Backend API Integration
