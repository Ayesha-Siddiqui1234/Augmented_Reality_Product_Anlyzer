# Authentication System - Testing Guide

## Quick Start Testing

### Prerequisites
```bash
npm install
npm run dev
```

---

## Test Scenarios

### ✅ Scenario 1: New User Registration

**Steps:**
1. Open browser: `http://localhost:5173`
2. Click "Admin" button in navbar
3. You'll be redirected to `/admin/login`
4. Click browser back button
5. Navigate to `/signup` manually or click any product
6. Add product to cart
7. Go to cart page
8. Click "Login to Checkout" button
9. On login page, click "Sign up here"

**On Signup Page:**
- Fill in the form:
  - Full Name: `Test User`
  - Email: `test@example.com`
  - Phone: `03001234567`
  - Password: `test123`
  - Confirm Password: `test123`
- Click "Create Account"

**Expected Result:**
- ✅ Success alert appears
- ✅ Redirected to `/login` page
- ✅ User data stored in localStorage

**Verify:**
```javascript
// Open browser console
localStorage.getItem('registeredUsers')
// Should show array with your user
```

---

### ✅ Scenario 2: User Login

**Steps:**
1. On login page (or navigate to `/login`)
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `test123`
3. Click "Login to Account"

**Expected Result:**
- ✅ Success alert appears
- ✅ Redirected to `/cart` page
- ✅ Button now shows "Proceed to Checkout" (with lock icon 🔒)
- ✅ Token and user stored in localStorage

**Verify:**
```javascript
// Open browser console
localStorage.getItem('token')
// Should show: "mock_token_..."

localStorage.getItem('user')
// Should show: {"id":"...","name":"Test User",...}
```

---

### ✅ Scenario 3: Admin Login

**Steps:**
1. Click "Admin" button in navbar
2. Redirected to `/admin/login`
3. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
4. Click "Access Dashboard"

**Expected Result:**
- ✅ Success alert appears
- ✅ Redirected to `/admin` dashboard
- ✅ Admin data stored in localStorage

**Verify:**
```javascript
// Open browser console
localStorage.getItem('adminToken')
// Should show: "admin_token_..."

localStorage.getItem('admin')
// Should show: {"username":"admin","role":"admin",...}
```

---

### ✅ Scenario 4: Cart Checkout Protection

**Test A: Not Logged In**
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Add products to cart
4. Go to cart page
5. Observe button text

**Expected Result:**
- ✅ Button shows "Login to Checkout" (with unlock icon 🔐)
- ✅ Clicking button redirects to `/login`

**Test B: Logged In**
1. Login as user (see Scenario 2)
2. Add products to cart
3. Go to cart page
4. Observe button text

**Expected Result:**
- ✅ Button shows "Proceed to Checkout" (with lock icon 🔒)
- ✅ Button is clickable (will show alert for now)

---

### ✅ Scenario 5: Form Validation

**Test Signup Validation:**
1. Go to `/signup`
2. Try submitting empty form
   - ✅ Should show "Name is required"
   - ✅ Should show "Email is required"
   - ✅ Should show "Phone is required"
   - ✅ Should show "Password is required"

3. Enter invalid email: `notanemail`
   - ✅ Should show "Email is invalid"

4. Enter invalid phone: `123`
   - ✅ Should show "Phone must be 11 digits"

5. Enter short password: `123`
   - ✅ Should show "Password must be at least 6 characters"

6. Enter mismatched passwords:
   - Password: `test123`
   - Confirm: `test456`
   - ✅ Should show "Passwords do not match"

**Test Login Validation:**
1. Go to `/login`
2. Try submitting empty form
   - ✅ Should show "Email is required"
   - ✅ Should show "Password is required"

3. Enter invalid email: `notanemail`
   - ✅ Should show "Email is invalid"

4. Enter wrong credentials
   - ✅ Should show "Invalid email or password"

**Test Admin Login Validation:**
1. Go to `/admin/login`
2. Try submitting empty form
   - ✅ Should show "Username is required"
   - ✅ Should show "Password is required"

3. Enter wrong credentials
   - ✅ Should show "Invalid credentials. Try: admin / admin123"

---

### ✅ Scenario 6: Password Visibility Toggle

**Steps:**
1. Go to any auth page (`/signup`, `/login`, `/admin/login`)
2. Enter password
3. Click eye icon (👁️ or 👁️‍🗨️)

**Expected Result:**
- ✅ Password toggles between hidden and visible
- ✅ Icon changes between 👁️ and 👁️‍🗨️

---

### ✅ Scenario 7: Loading States

**Steps:**
1. Go to `/signup` or `/login`
2. Fill form with valid data
3. Click submit button
4. Observe button during submission

**Expected Result:**
- ✅ Button shows "Creating Account..." or "Logging in..."
- ✅ Button is disabled during loading
- ✅ Button has reduced opacity (50%)
- ✅ Cursor shows not-allowed

---

### ✅ Scenario 8: Error Messages

**Test Duplicate Email:**
1. Signup with email: `test@example.com`
2. Try signing up again with same email
3. ✅ Should show "User with this email already exists"

**Test Invalid Login:**
1. Go to `/login`
2. Enter email: `wrong@example.com`
3. Enter password: `wrongpass`
4. Click submit
5. ✅ Should show "Invalid email or password"

---

### ✅ Scenario 9: Navigation Flow

**Test Signup → Login:**
1. Go to `/signup`
2. Click "Login here" link at bottom
3. ✅ Should navigate to `/login`

**Test Login → Signup:**
1. Go to `/login`
2. Click "Sign up here" link at bottom
3. ✅ Should navigate to `/signup`

**Test Admin Back Button:**
1. Go to `/admin/login`
2. Click "← Back to Home" button
3. ✅ Should navigate to `/`

---

### ✅ Scenario 10: Theme Support

**Steps:**
1. Go to any auth page
2. Toggle theme using sun/moon icon in navbar
3. Observe page styling

**Expected Result:**
- ✅ Dark theme: Dark purple background
- ✅ Light theme: Light purple gradient background
- ✅ Text remains readable in both themes
- ✅ Forms maintain purple theme in both modes

---

### ✅ Scenario 11: Responsive Design

**Steps:**
1. Open any auth page
2. Resize browser window
3. Test on mobile viewport (375px)
4. Test on tablet viewport (768px)
5. Test on desktop viewport (1920px)

**Expected Result:**
- ✅ Forms are centered and readable
- ✅ Buttons are properly sized
- ✅ Text is legible
- ✅ No horizontal scrolling
- ✅ Touch targets are adequate (mobile)

---

### ✅ Scenario 12: Social Login Placeholders

**Steps:**
1. Go to `/login`
2. Scroll to bottom
3. Click "Google" button
4. Click "Facebook" button

**Expected Result:**
- ✅ Alert shows "Google login coming soon!"
- ✅ Alert shows "Facebook login coming soon!"

---

### ✅ Scenario 13: Remember Me

**Steps:**
1. Go to `/login`
2. Check "Remember me" checkbox
3. Login with credentials
4. Check console log

**Expected Result:**
- ✅ Remember me state is logged
- ✅ (Future: Session persists across browser restarts)

---

### ✅ Scenario 14: Forgot Password

**Steps:**
1. Go to `/login`
2. Click "Forgot Password?" link

**Expected Result:**
- ✅ Alert shows "Password reset feature coming soon!"

---

## Automated Testing Checklist

### Unit Tests (TODO)
- [ ] authService.signup() validates email
- [ ] authService.login() checks credentials
- [ ] authSlice updates state correctly
- [ ] Form validation functions work

### Integration Tests (TODO)
- [ ] Signup flow end-to-end
- [ ] Login flow end-to-end
- [ ] Admin login flow end-to-end
- [ ] Cart checkout protection

### E2E Tests (TODO)
- [ ] Complete user journey
- [ ] Complete admin journey
- [ ] Error handling scenarios

---

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Performance Testing

### Metrics to Check:
- [ ] Page load time < 2s
- [ ] Form submission response < 1s
- [ ] No memory leaks
- [ ] Smooth animations (60fps)

### Tools:
- Chrome DevTools Performance tab
- Lighthouse audit
- React DevTools Profiler

---

## Security Testing

### Current Mock Implementation:
- ⚠️ Passwords stored in plain text (localStorage)
- ⚠️ No encryption
- ⚠️ No rate limiting
- ⚠️ No CSRF protection

### After Backend Integration:
- [ ] Passwords are hashed (bcrypt)
- [ ] HTTPS only
- [ ] JWT tokens expire
- [ ] Rate limiting on login attempts
- [ ] CSRF tokens
- [ ] XSS protection
- [ ] SQL injection prevention

---

## Common Issues & Solutions

### Issue 1: "User already exists" on first signup
**Solution:** Clear localStorage
```javascript
localStorage.clear()
```

### Issue 2: Not redirected after login
**Solution:** Check Redux state
```javascript
// In browser console
window.__REDUX_DEVTOOLS_EXTENSION__
// Or check localStorage
localStorage.getItem('token')
```

### Issue 3: Button still shows "Login to Checkout"
**Solution:** Refresh page or check auth state
```javascript
// Check if authenticated
localStorage.getItem('token')
```

### Issue 4: Admin login not working
**Solution:** Use exact credentials
- Username: `admin` (lowercase)
- Password: `admin123`

### Issue 5: Form validation not showing
**Solution:** Check browser console for errors

---

## Test Data

### Valid Test Users:
```javascript
{
  name: "Test User",
  email: "test@example.com",
  phone: "03001234567",
  password: "test123"
}

{
  name: "John Doe",
  email: "john@example.com",
  phone: "03009876543",
  password: "john123"
}

{
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "03001112222",
  password: "jane123"
}
```

### Admin Credentials:
```javascript
{
  username: "admin",
  password: "admin123"
}
```

---

## Debugging Tips

### Enable Redux DevTools:
1. Install Redux DevTools browser extension
2. Open DevTools
3. Go to Redux tab
4. Monitor auth state changes

### Check localStorage:
```javascript
// View all stored data
console.log('Token:', localStorage.getItem('token'))
console.log('User:', localStorage.getItem('user'))
console.log('Admin:', localStorage.getItem('admin'))
console.log('Registered Users:', localStorage.getItem('registeredUsers'))
```

### Clear all auth data:
```javascript
localStorage.removeItem('token')
localStorage.removeItem('user')
localStorage.removeItem('admin')
localStorage.removeItem('adminToken')
localStorage.removeItem('registeredUsers')
```

---

## Success Criteria

All scenarios should pass:
- ✅ User can signup
- ✅ User can login
- ✅ Admin can login
- ✅ Cart checkout is protected
- ✅ Form validation works
- ✅ Error messages display
- ✅ Loading states show
- ✅ Navigation flows correctly
- ✅ Theme support works
- ✅ Responsive on all devices

---

## Next Steps After Testing

1. **Report Bugs:** Document any issues found
2. **Backend Integration:** Connect to real API
3. **Protected Routes:** Add route guards
4. **Logout:** Implement logout functionality
5. **User Profile:** Create profile page
6. **Password Reset:** Implement reset flow

---

**Happy Testing! 🚀**

If you find any issues, check the console for errors and refer to the troubleshooting section.
