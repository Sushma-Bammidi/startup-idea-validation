# Troubleshooting Guide

## Common Issues and Solutions

### 🔴 Backend Issues

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Causes:**
- MongoDB service not running
- Wrong connection string
- MongoDB not installed

**Solutions:**
1. **Start MongoDB locally:**
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. **Check .env file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/startup-validation
   ```

3. **If using MongoDB Atlas:**
   - Verify connection string format
   - Check username/password
   - Whitelist your IP address in MongoDB Atlas

---

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
1. **Find process using port 5000:**
   ```bash
   # macOS/Linux
   lsof -i :5000
   
   # Windows
   netstat -ano | findstr :5000
   ```

2. **Kill the process:**
   ```bash
   # macOS/Linux
   kill -9 <PID>
   
   # Windows
   taskkill /PID <PID> /F
   ```

3. **Or change PORT in .env:**
   ```env
   PORT=5001
   ```

---

#### JWT Secret Missing
```
Error: Cannot read property 'jwt.sign' of undefined
```

**Solution:**
```env
# In .env file
JWT_SECRET=your_super_secret_key_at_least_32_chars_long
```

---

#### Dependencies Installation Error
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and lock file:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Use legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

---

#### Mongoose Validation Error
```
Error: Idea validation failed: title is required
```

**Solution:**
- Ensure all required fields are provided in request body
- Check field names match schema definition
- Verify data types

---

### 🟠 Frontend Issues

#### CORS Error
```
Access to XMLHttpRequest from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Causes:**
- Backend not running
- Wrong API URL in .env
- CORS not configured in backend

**Solutions:**
1. **Start backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Check .env file in frontend:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Verify CORS is enabled in backend:**
   ```javascript
   // server.js should have:
   app.use(cors());
   ```

---

#### Blank Page
```
White page with no content
```

**Causes:**
- React app not compiled
- JavaScript error in console
- Build failed

**Solutions:**
1. **Check browser console for errors:**
   - Right-click → Inspect → Console tab
   - Look for red error messages

2. **Restart development server:**
   ```bash
   # Stop with Ctrl+C
   npm start
   ```

3. **Clear cache:**
   ```bash
   # In frontend folder
   rm -rf node_modules
   npm install
   npm start
   ```

---

#### API Not Found Error
```
Error: GET http://localhost:5000/api/ideas 404
```

**Causes:**
- Wrong endpoint URL
- Typo in route path
- Backend server crashed

**Solutions:**
1. **Check backend is running:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Verify API endpoint in service file:**
   ```javascript
   // Check services/ideaService.js
   const response = await api.get('/ideas');
   ```

3. **Check backend routes are registered:**
   ```javascript
   // In server.js
   app.use('/api/ideas', require('./routes/ideaRoutes'));
   ```

---

#### Token Not Valid Error
```
Error: Token is not valid
```

**Causes:**
- Token expired
- Invalid token format
- JWT_SECRET mismatch

**Solutions:**
1. **Clear localStorage:**
   ```javascript
   localStorage.clear()
   // Then refresh page
   ```

2. **Login again:**
   - The app should generate a new token

3. **Check JWT_SECRET is same:**
   - Backend JWT_SECRET must match

---

#### Form Submission Not Working
```
Button clicked but nothing happens
```

**Solutions:**
1. **Check browser console for errors**
   - Press F12 to open developer tools
   - Check Console tab

2. **Verify all required fields are filled:**
   - Don't leave fields empty

3. **Check backend is running:**
   - Test with `curl http://localhost:5000/health`

---

### 🟡 Data Issues

#### Ideas Not Showing
```
Browse page shows "No ideas found"
```

**Causes:**
- No ideas created yet
- Ideas exist but not fetching
- Database connection issue

**Solutions:**
1. **Create a test idea:**
   - Login and go to "Post Idea"
   - Fill in all fields and submit

2. **Check network requests:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try to fetch ideas
   - Check response

3. **Verify database:**
   ```bash
   # In MongoDB shell
   use startup-validation
   db.ideas.find()
   ```

---

#### Votes Not Incrementing
```
Clicked vote but count didn't increase
```

**Causes:**
- Vote not being saved
- API error
- Frontend not refreshing

**Solutions:**
1. **Check browser console for errors**

2. **Verify vote is saved in database:**
   ```bash
   # In MongoDB shell
   db.votes.find()
   ```

3. **Check API response:**
   - Open DevTools Network tab
   - Look at POST /api/votes response

---

#### Comments Not Showing
```
Added comment but doesn't appear
```

**Solutions:**
1. **Refresh the page**

2. **Check if comment was saved:**
   ```bash
   # In MongoDB shell
   db.comments.find()
   ```

3. **Check API error:**
   - Open DevTools Network tab
   - Look at POST /api/comments response

---

### 🔵 Performance Issues

#### Slow Page Load
```
Taking more than 5 seconds to load
```

**Solutions:**
1. **Check network tab in DevTools:**
   - See which requests are slow
   - Check API response times

2. **Verify database is responsive:**
   ```bash
   # Test MongoDB connection
   mongo mongodb://localhost:27017
   ```

3. **Check for database indexing:**
   - Add indexes for frequently queried fields
   - See API_DOCS.md for optimization

---

#### High Memory Usage
```
App getting slower or consuming lots of memory
```

**Solutions:**
1. **Check for memory leaks:**
   - Close and reopen browser
   - Restart development server

2. **Optimize re-renders:**
   - Check React DevTools Profiler

3. **Clear browser cache:**
   ```bash
   # Clear frontend build cache
   rm -rf node_modules/.cache
   ```

---

### 🟣 Authentication Issues

#### Can't Login
```
"Invalid credentials" error
```

**Causes:**
- Wrong email or password
- User doesn't exist
- Database issue

**Solutions:**
1. **Check user exists:**
   ```bash
   # In MongoDB shell
   db.users.findOne({email: "test@example.com"})
   ```

2. **Reset password:**
   - Create new user account
   - Try logging in again

3. **Verify database connection:**
   - Check MongoDB is running

---

#### Stuck on Login Page
```
Login button not working
```

**Solutions:**
1. **Check backend is running**

2. **Verify .env has JWT_SECRET:**
   ```env
   JWT_SECRET=your_secret_key
   ```

3. **Check browser console for errors**

4. **Test API directly:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

---

### ⚪ Deployment Issues

#### Deploy to Heroku Failed
```
Error: can't find module 'express'
```

**Solutions:**
1. **Ensure package.json in root:**
   ```bash
   # Should be in backend/package.json
   ```

2. **Set Heroku environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   ```

3. **Check Heroku logs:**
   ```bash
   heroku logs --tail
   ```

---

#### Frontend Deploy to Vercel Failed
```
Build error: Cannot find module
```

**Solutions:**
1. **Ensure all dependencies installed:**
   ```bash
   npm install
   ```

2. **Set environment variable in Vercel:**
   - Dashboard → Settings → Environment Variables
   - Add REACT_APP_API_URL

3. **Build locally to test:**
   ```bash
   npm run build
   ```

---

## Debug Checklist

### Before Debugging
- [ ] Is the error in frontend or backend?
- [ ] Can you reproduce the error?
- [ ] When did it start happening?
- [ ] What did you change recently?

### Debugging Steps
1. **Check browser console:**
   ```
   F12 → Console tab → Look for errors
   ```

2. **Check backend logs:**
   ```
   Check terminal where backend is running
   ```

3. **Check network requests:**
   ```
   F12 → Network tab → Look for failed requests
   ```

4. **Test API directly:**
   ```bash
   # Use curl or Postman
   curl http://localhost:5000/api/ideas
   ```

5. **Check database:**
   ```bash
   # MongoDB commands
   mongo
   use startup-validation
   db.ideas.count()
   ```

---

## Getting Help

1. **Check error message carefully**
   - Google the error message
   - Check Stack Overflow

2. **Check documentation:**
   - README.md
   - API_DOCS.md
   - PROJECT_STRUCTURE.md

3. **Check GitHub issues:**
   - Look for similar issues
   - Create new issue with details

4. **Enable detailed logging:**
   ```javascript
   // Add console.logs in code
   console.log('API called with:', data);
   console.log('Response:', response);
   ```

---

## Useful Tools

### Testing APIs
- **Postman**: https://www.postman.com/
- **Thunder Client**: VS Code extension
- **curl**: Command line tool

### Database Tools
- **MongoDB Compass**: GUI for MongoDB
- **MongoDB Shell**: CLI tool

### Development Tools
- **VS Code**: Code editor
- **DevTools**: Browser developer tools
- **Nodemon**: Auto-restart Node.js

### Debugging
- **React DevTools**: Browser extension
- **Redux DevTools**: For state management (if added)

---

## Performance Tips

1. **Optimize API calls:**
   - Don't fetch data on every render
   - Use React hooks (useEffect)

2. **Optimize database:**
   - Add indexes for frequently queried fields
   - Use select() to get only needed fields

3. **Optimize frontend:**
   - Lazy load components
   - Minify CSS and JavaScript
   - Optimize images

---

## Security Checklist

- [ ] Never commit .env file
- [ ] Change JWT_SECRET for production
- [ ] Use HTTPS for production
- [ ] Update dependencies regularly
- [ ] Use environment variables for sensitive data
- [ ] Validate all user inputs
- [ ] Sanitize database queries

---

**Last Updated:** January 2024
**Version:** 1.0
