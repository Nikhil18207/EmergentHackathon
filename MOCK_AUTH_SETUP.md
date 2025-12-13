# 🚀 TrendPilot - Mock Authentication Setup (No MongoDB Required)

## ✅ Quick Setup for Hackathon Demo

Your backend is now configured to work **without MongoDB** using in-memory storage!

### Step 1: Update Your `.env` File

Add this line to your `f:\Fashion\backend\.env` file:

```env
USE_MOCK_AUTH=true
```

Your complete `.env` should look like:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
JWT_EXPIRES_IN=7d
MONGODB_URI=mongodb://localhost:27017/emergent_hackathon
USE_MOCK_AUTH=true
```

### Step 2: Restart Your Backend Server

1. Stop the current backend server (Ctrl+C in the terminal)
2. Run `npm run dev` again

You should see:
```
🚀 Running with in-memory authentication (no MongoDB required)
💡 Users will be stored in memory - data will be lost on server restart
✅ Server running on port 5000
```

---

## 🎯 How It Works

### ✅ What You CAN Do:
- ✅ Sign up with any email/password
- ✅ Login with created accounts
- ✅ Full authentication flow works
- ✅ JWT tokens work perfectly
- ✅ Protected routes work
- ✅ Multiple users can register
- ✅ Password hashing and validation

### ⚠️ Limitations:
- ❌ Data is lost when server restarts
- ❌ No persistent storage
- ❌ Perfect for hackathon demo, not for production

---

## 🧪 Testing the Authentication

### 1. Sign Up a New User

**Frontend:** Go to http://localhost:5173 and click "Register"

Fill in:
- Display Name: `John Doe`
- Email: `john@trendpilot.ai`
- Role: `Fashion Creator`
- Password: `Test@1234`
- Confirm Password: `Test@1234`

Click "Create Account" → You'll be logged in automatically!

### 2. Login with Existing User

Logout and try logging in with:
- Email: `john@trendpilot.ai`
- Password: `Test@1234`

### 3. Test Error Handling

**Try logging in with non-existent account:**
- Email: `nobody@test.com`
- Password: `anything`

You'll see: "User not found. Please create an account first."

**Try signing up with duplicate email:**
- Use the same email twice
- You'll see: "User with this email already exists"

---

## 🔍 Debug Endpoint (Hackathon Only)

To see all registered users:

```bash
GET http://localhost:5000/api/auth/users
```

Or in your browser: http://localhost:5000/api/auth/users

---

## 📝 Enhanced Error Messages

The frontend now provides smart error handling:

1. **Account doesn't exist** → Auto-suggests switching to Register tab
2. **Account already exists** → Auto-suggests switching to Login tab
3. **Wrong password** → Clear error message
4. **Network errors** → Helpful connection tips

---

## 🎬 Ready for Demo!

Your authentication system is now fully functional without MongoDB. Perfect for the VibeHack 2025 hackathon demo!

**Next Steps:**
1. Add `USE_MOCK_AUTH=true` to your `.env`
2. Restart backend server
3. Test signup and login
4. You're ready to demo! 🚀
