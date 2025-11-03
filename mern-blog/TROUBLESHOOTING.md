# Troubleshooting Guide - Her Blog

## Login & Blog Creation Issues

### Quick Fixes

1. **Clear Browser Storage**
   - Open Browser DevTools (F12)
   - Go to Application/Storage tab
   - Clear LocalStorage
   - Try logging in again

2. **Check Server Status**
   - Server should be running on `http://localhost:5000`
   - Check browser console for errors
   - Check terminal for server errors

3. **Verify Environment Variables**
   - Check `server/.env` file exists
   - Verify `MONGODB_URI` and `JWT_SECRET` are set

### Common Issues & Solutions

#### Issue: "Login failed" or "Invalid credentials"

**Possible Causes:**
1. User doesn't exist - Try registering first
2. Wrong email/password
3. Server not running
4. MongoDB connection issue

**Solutions:**
1. Verify server is running: `cd server && npm run dev`
2. Check MongoDB connection in server logs
3. Try registering a new user
4. Check browser console for error messages

#### Issue: "Cannot create blog post"

**Possible Causes:**
1. Not logged in / Token expired
2. Server not running
3. Network/CORS error
4. FormData upload issue (FIXED)

**Solutions:**
1. Check if you're logged in (check navbar for username)
2. Try logging out and back in
3. Check browser console for errors
4. Verify server is running on port 5000

### Step-by-Step Debugging

1. **Check Server Logs**
   ```powershell
   # In server terminal, you should see:
   # - "MongoDB connected"
   # - "Server running on port 5000"
   ```

2. **Check Browser Console (F12)**
   - Look for red error messages
   - Check Network tab for failed requests
   - Verify API calls are going to correct URL

3. **Test API Directly**
   ```powershell
   # Test if server is responding
   curl http://localhost:5000/
   # Should return: "API is running"
   ```

4. **Verify Authentication**
   - Open Browser DevTools → Application → LocalStorage
   - Check if `token` exists
   - If not, login again

5. **Check MongoDB**
   - Verify MongoDB is running (local) or Atlas connection works
   - Check server logs for connection errors

### Reset Everything

If nothing works:

1. **Clear all data:**
   ```powershell
   # Clear browser localStorage
   # In browser console:
   localStorage.clear()
   ```

2. **Restart servers:**
   ```powershell
   # Stop both servers (Ctrl+C)
   # Restart:
   npm run dev
   ```

3. **Re-register:**
   - Create a new account
   - Try logging in with new credentials

### Need More Help?

Check:
- Server terminal output for errors
- Browser console (F12) for client errors
- Network tab in DevTools for failed API calls
- MongoDB connection status

