# Project Structure Overview

## Complete Folder Structure

```
fullstack/
│
├── README.md                    # Main project documentation
├── SETUP.md                     # Quick setup guide
├── API_DOCS.md                 # Complete API documentation
├── .gitignore                  # Git ignore file
│
├── backend/                    # Backend Node.js + Express
│   │
│   ├── models/                # Mongoose schemas
│   │   ├── User.js           # User schema with password hashing
│   │   ├── Idea.js           # Idea schema with counters
│   │   ├── Vote.js           # Vote schema with unique constraints
│   │   ├── Comment.js        # Comment schema
│   │   └── WaitingList.js    # WaitingList schema
│   │
│   ├── controllers/           # Business logic
│   │   ├── authController.js      # Sign up, login, profile
│   │   ├── ideaController.js      # CRUD for ideas
│   │   ├── voteController.js      # Vote management
│   │   ├── commentController.js   # Comment management
│   │   ├── waitlistController.js  # Waitlist management
│   │   └── analyticsController.js # Analytics & insights
│   │
│   ├── routes/               # API endpoints
│   │   ├── authRoutes.js           # /api/auth
│   │   ├── ideaRoutes.js           # /api/ideas
│   │   ├── voteRoutes.js           # /api/votes
│   │   ├── commentRoutes.js        # /api/comments
│   │   ├── waitlistRoutes.js       # /api/waitlist
│   │   └── analyticsRoutes.js      # /api/analytics
│   │
│   ├── middleware/           # Custom middleware
│   │   └── auth.js          # JWT verification
│   │
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   ├── .env.example         # Environment template
│   └── .gitignore          # Git ignore
│
├── frontend/                 # React.js app
│   │
│   ├── public/              # Static files
│   │   └── index.html      # HTML template
│   │
│   ├── src/
│   │   │
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.js              # Navigation component
│   │   │   ├── IdeaCard.js            # Idea card display
│   │   │   ├── CommentSection.js      # Comments component
│   │   │   ├── WaitlistButton.js      # Waitlist interaction
│   │   │   └── ProtectedRoute.js      # Route protection
│   │   │
│   │   ├── pages/           # Page components
│   │   │   ├── SignupPage.js         # User registration
│   │   │   ├── LoginPage.js          # User login
│   │   │   ├── BrowseIdeasPage.js    # Ideas listing
│   │   │   ├── CreateIdeaPage.js     # Idea creation
│   │   │   ├── IdeaDetailPage.js     # Idea details
│   │   │   └── DashboardPage.js      # Creator analytics
│   │   │
│   │   ├── services/        # API services
│   │   │   ├── api.js                # Axios instance
│   │   │   ├── authService.js        # Auth API calls
│   │   │   ├── ideaService.js        # Idea API calls
│   │   │   ├── voteService.js        # Vote API calls
│   │   │   ├── commentService.js     # Comment API calls
│   │   │   ├── waitlistService.js    # Waitlist API calls
│   │   │   └── analyticsService.js   # Analytics API calls
│   │   │
│   │   ├── styles/          # CSS files
│   │   │   ├── index.css             # Global styles
│   │   │   ├── App.css              # App layout
│   │   │   ├── Navbar.css           # Navigation styling
│   │   │   ├── Browse.css           # Ideas listing page
│   │   │   ├── IdeaCard.css         # Idea card styling
│   │   │   ├── IdeaDetail.css       # Idea detail page
│   │   │   ├── CommentSection.css   # Comments styling
│   │   │   ├── WaitlistButton.css   # Waitlist button
│   │   │   ├── Auth.css             # Auth pages styling
│   │   │   ├── CreateIdea.css       # Create idea styling
│   │   │   └── Dashboard.css        # Dashboard styling
│   │   │
│   │   ├── App.js          # Main app component with routing
│   │   └── index.js        # React entry point
│   │
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment template
│   └── .gitignore         # Git ignore
│
```

## File Descriptions

### Backend Files

#### Models (Database Schemas)
- **User.js**: Stores user credentials with password hashing
- **Idea.js**: Stores startup ideas with vote/comment counters
- **Vote.js**: Records user votes with unique constraint per idea
- **Comment.js**: Stores user comments on ideas
- **WaitingList.js**: Tracks users interested in ideas

#### Controllers (Business Logic)
- **authController.js**: Handles signup, login, JWT token generation
- **ideaController.js**: CRUD operations for ideas
- **voteController.js**: Vote/unvote functionality
- **commentController.js**: Add/delete comments
- **waitlistController.js**: Join/leave waitlist
- **analyticsController.js**: Calculate idea metrics and insights

#### Routes (API Endpoints)
- Define HTTP endpoints
- Link to controller functions
- Apply middleware for protection

#### Middleware
- **auth.js**: JWT verification for protected routes

### Frontend Files

#### Components (Reusable UI)
- **Navbar.js**: Top navigation with user menu
- **IdeaCard.js**: Individual idea card with voting
- **CommentSection.js**: Comments display and add form
- **WaitlistButton.js**: Waitlist join/leave button
- **ProtectedRoute.js**: Route access control

#### Pages (Full Page Components)
- **SignupPage.js**: User registration form
- **LoginPage.js**: User login form
- **BrowseIdeasPage.js**: Main ideas listing with filters
- **CreateIdeaPage.js**: Create new idea form
- **IdeaDetailPage.js**: Full idea details with interactions
- **DashboardPage.js**: Creator analytics dashboard

#### Services (API Communication)
- Centralized API calls
- Error handling
- JWT token management

#### Styles (CSS)
- Component-specific styling
- Responsive design
- Visual feedback for interactions

---

## Data Flow

### User Registration & Login Flow
```
SignupPage → authService.signup() → Backend /api/auth/signup
→ Returns token → Stored in localStorage → Redirect to home
```

### Idea Creation Flow
```
CreateIdeaPage → ideaService.createIdea() → Backend /api/ideas
→ Stored in DB → Redirect to idea detail → Show confirmation
```

### Voting Flow
```
IdeaCard → voteService.voteForIdea() → Backend /api/votes
→ Idea vote count incremented → UI updated
```

### Comment Flow
```
CommentSection → commentService.addComment() → Backend /api/comments
→ Comment stored → Idea comment count incremented → Display in list
```

### Waitlist Flow
```
WaitlistButton → waitlistService.joinWaitlist() → Backend /api/waitlist/join
→ User added to list → Idea waitlist count incremented → UI updated
```

### Analytics Flow
```
DashboardPage → analyticsService.getCreatorAnalytics()
→ Backend calculates metrics → Display in dashboard
```

---

## Key Features Implementation

### ✅ Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Logout functionality

### ✅ Idea Management
- Create, read, update, delete ideas
- Category filtering
- Search functionality
- Trend calculation based on votes

### ✅ Community Features
- Voting system (one vote per user per idea)
- Comments with user context
- Waiting lists for interested users
- Real-time counter updates

### ✅ Analytics
- Vote tracking
- Comment engagement
- Waitlist metrics
- Engagement rate calculation

### ✅ User Experience
- Responsive design (mobile, tablet, desktop)
- Error handling and messages
- Loading states
- Protected navigation

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js | UI framework |
| Frontend | React Router | Client-side routing |
| Frontend | Axios | HTTP requests |
| Frontend | CSS3 | Styling |
| Backend | Node.js | Runtime |
| Backend | Express.js | Web framework |
| Backend | MongoDB | Database |
| Backend | Mongoose | ODM |
| Backend | JWT | Authentication |
| Backend | Bcryptjs | Password hashing |

---

## Environment Files

### Backend .env
```env
MONGODB_URI=your_db_uri
JWT_SECRET=your_secret
PORT=5000
NODE_ENV=development
```

### Frontend .env
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Development Workflow

1. **Backend Development**
   - Create models/schemas
   - Implement controller logic
   - Define routes with endpoints
   - Test with Postman

2. **Frontend Development**
   - Create UI components
   - Build page layouts
   - Implement API services
   - Connect to backend

3. **Integration**
   - Test complete flows
   - Fix bugs
   - Optimize performance
   - Add error handling

4. **Deployment**
   - Backend: Heroku/Railway
   - Frontend: Vercel/Netlify
   - Database: MongoDB Atlas

---

## Useful Commands

### Backend
```bash
cd backend
npm install              # Install dependencies
npm start               # Start server
npm run dev             # Start with nodemon
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm start               # Start dev server
npm run build           # Create production build
```

---

**For detailed setup instructions, see SETUP.md**
**For complete API documentation, see API_DOCS.md**
