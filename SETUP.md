# Quick Start Guide - Startup Idea Validation Platform

## 📋 Checklist

### Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Update MongoDB URI in `.env`
- [ ] Update JWT_SECRET in `.env`
- [ ] Run `npm start` or `npm run dev`
- [ ] Backend should run on http://localhost:5000

### Frontend Setup
- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Run `npm start`
- [ ] Frontend should open on http://localhost:3000

## 🛠️ Setup Instructions

### Option 1: Using Local MongoDB

1. **Install MongoDB Community Edition**
   - Download from: https://www.mongodb.com/try/download/community

2. **Start MongoDB service**
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Backend .env file:**
   ```
   MONGODB_URI=mongodb://localhost:27017/startup-validation
   JWT_SECRET=your_super_secret_key_12345
   PORT=5000
   NODE_ENV=development
   ```

### Option 2: Using MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free cluster

2. **Get Connection String**
   - Copy connection string from Atlas dashboard
   - Replace `<password>` and `<username>` with your credentials

3. **Backend .env file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/startup-validation?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_12345
   PORT=5000
   NODE_ENV=development
   ```

## ▶️ Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```

## ✅ Testing the Application

### 1. Sign Up
- Go to http://localhost:3000
- Click on "Signup"
- Create account with:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `password123`
  - Confirm Password: `password123`

### 2. Post an Idea
- Click "Post Idea"
- Fill in idea details:
  - Title: "AI-Powered Study Planner"
  - Category: "Education"
  - Problem Statement: "Students struggle to organize study time"
  - Description: "An AI tool that creates personalized study schedules..."
- Click "Post Idea"

### 3. Test Voting
- Click on an idea card
- Click "Vote 👍" button
- Vote count should increase

### 4. Test Comments
- Add a comment in the comment section
- Comment should appear immediately

### 5. Test Waitlist
- Click "Join Waitlist"
- Button should change to show you're on the list

### 6. View Analytics
- Click on "Dashboard"
- See all your ideas with statistics
- Click "View Details" to see detailed analytics

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** 
- Make sure MongoDB service is running
- Check MONGODB_URI in .env file
- Verify database name is correct

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in .env
PORT=5001
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Make sure backend is running
- Verify REACT_APP_API_URL in frontend .env
- Check backend has CORS middleware enabled

### JWT Token Error
```
Error: Token is not valid
```
**Solution:**
- Log out and log back in
- Check JWT_SECRET is consistent
- Clear browser localStorage: `localStorage.clear()`

## 📚 Key Features to Try

1. **Browse Ideas**: Check different categories
2. **Search Ideas**: Search by title or description
3. **Vote System**: Vote on ideas you like
4. **Comments**: Leave feedback on ideas
5. **Waiting List**: Join waitlists for interested ideas
6. **Analytics**: View detailed metrics on dashboard
7. **Filter**: Filter ideas by category

## 🎯 Next Steps

1. **Customize UI**: Modify styles in `/frontend/src/styles/`
2. **Add Features**: Implement advanced features from docs
3. **Deploy**: Deploy to Heroku (backend) and Vercel (frontend)
4. **Database**: Set up MongoDB Atlas for production
5. **Security**: Update JWT_SECRET for production

## 📞 Need Help?

- Check main README.md for detailed documentation
- Review API endpoints section
- Check browser console for errors
- Check terminal for backend errors

---

**Happy Building! 💡**
