# API Documentation - Startup Idea Validation Platform

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🔐 Auth Endpoints

### POST /auth/signup
Register a new user

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com"
  },
  "token": "jwt_token"
}
```

**Error (400):**
```json
{
  "message": "User already exists"
}
```

---

### POST /auth/login
Login user

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com"
  },
  "token": "jwt_token"
}
```

**Error (400):**
```json
{
  "message": "Invalid credentials"
}
```

---

### GET /auth/profile
Get current user profile (Protected)

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 💡 Ideas Endpoints

### POST /ideas
Create new idea (Protected)

**Request Body:**
```json
{
  "title": "string (max 100)",
  "description": "string (max 2000)",
  "category": "Technology|Health|Finance|Education|E-commerce|Social|Entertainment|Other",
  "problemStatement": "string (max 1000)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Idea created successfully",
  "idea": {
    "_id": "idea_id",
    "title": "AI Study Planner",
    "description": "...",
    "category": "Education",
    "problemStatement": "...",
    "createdBy": "user_id",
    "creatorName": "username",
    "voteCount": 0,
    "commentCount": 0,
    "waitlistCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### GET /ideas
Get all ideas (optional filters)

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search by title or description

**Example:**
```
GET /ideas?category=Technology&search=ai
```

**Response (200):**
```json
{
  "success": true,
  "ideas": [
    {
      "_id": "idea_id",
      "title": "AI Study Planner",
      "description": "...",
      "category": "Education",
      "creatorName": "username",
      "voteCount": 5,
      "commentCount": 2,
      "waitlistCount": 3,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /ideas/:id
Get specific idea by ID

**Response (200):**
```json
{
  "success": true,
  "idea": {
    "_id": "idea_id",
    "title": "AI Study Planner",
    "description": "...",
    "category": "Education",
    "problemStatement": "...",
    "createdBy": {
      "_id": "user_id",
      "username": "username"
    },
    "voteCount": 5,
    "commentCount": 2,
    "waitlistCount": 3,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### PUT /ideas/:id
Update idea (Protected - only creator)

**Request Body:**
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "category": "string (optional)",
  "problemStatement": "string (optional)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Idea updated successfully",
  "idea": { ... }
}
```

---

### DELETE /ideas/:id
Delete idea (Protected - only creator)

**Response (200):**
```json
{
  "success": true,
  "message": "Idea deleted successfully"
}
```

---

### GET /ideas/my-ideas
Get user's own ideas (Protected)

**Response (200):**
```json
{
  "success": true,
  "ideas": [...]
}
```

---

## 👍 Votes Endpoints

### POST /votes
Vote for an idea (Protected)

**Request Body:**
```json
{
  "ideaId": "idea_id"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Vote recorded successfully",
  "vote": {
    "_id": "vote_id",
    "ideaId": "idea_id",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### POST /votes/remove
Remove vote (Protected)

**Request Body:**
```json
{
  "ideaId": "idea_id"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Vote removed successfully"
}
```

---

### GET /votes/check/:ideaId
Check if user voted (Protected)

**Response (200):**
```json
{
  "success": true,
  "hasVoted": true
}
```

---

### GET /votes/count/:ideaId
Get vote count for an idea

**Response (200):**
```json
{
  "success": true,
  "voteCount": 15
}
```

---

## 💬 Comments Endpoints

### POST /comments
Add comment (Protected)

**Request Body:**
```json
{
  "ideaId": "idea_id",
  "commentText": "string (max 500)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "comment": {
    "_id": "comment_id",
    "ideaId": "idea_id",
    "userId": "user_id",
    "username": "username",
    "commentText": "Great idea!",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### GET /comments/:ideaId
Get comments for an idea

**Response (200):**
```json
{
  "success": true,
  "comments": [
    {
      "_id": "comment_id",
      "ideaId": "idea_id",
      "userId": "user_id",
      "username": "username",
      "commentText": "Great idea!",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### DELETE /comments/:id
Delete comment (Protected - only creator)

**Response (200):**
```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

---

## 📋 Waiting List Endpoints

### POST /waitlist/join
Join waiting list (Protected)

**Request Body:**
```json
{
  "ideaId": "idea_id"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Added to waiting list successfully",
  "entry": {
    "_id": "waitlist_id",
    "ideaId": "idea_id",
    "userId": "user_id",
    "email": "user@example.com",
    "joinedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### POST /waitlist/leave
Leave waiting list (Protected)

**Request Body:**
```json
{
  "ideaId": "idea_id"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Removed from waiting list successfully"
}
```

---

### GET /waitlist/check/:ideaId
Check if user in waiting list (Protected)

**Response (200):**
```json
{
  "success": true,
  "inWaitlist": true
}
```

---

### GET /waitlist/count/:ideaId
Get waiting list count

**Response (200):**
```json
{
  "success": true,
  "waitlistCount": 10
}
```

---

### GET /waitlist/:ideaId
Get waiting list details (Protected - only idea creator)

**Response (200):**
```json
{
  "success": true,
  "waitlist": [
    {
      "_id": "waitlist_id",
      "ideaId": "idea_id",
      "userId": "user_id",
      "email": "user@example.com",
      "joinedAt": "2024-01-01T00:00:00.000Z",
      "userId": {
        "username": "username",
        "email": "user@example.com"
      }
    }
  ]
}
```

---

## 📊 Analytics Endpoints

### GET /analytics/idea/:ideaId
Get idea analytics (Protected)

**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "ideaId": "idea_id",
    "title": "AI Study Planner",
    "voteCount": 15,
    "commentCount": 8,
    "waitlistCount": 12,
    "totalEngagement": 35,
    "engagementRate": 77.14,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### GET /analytics/creator/dashboard
Get creator dashboard (Protected)

**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalIdeas": 5,
    "totalVotes": 50,
    "totalComments": 20,
    "totalWaitlist": 30,
    "averageEngagement": 20,
    "ideas": [
      {
        "ideaId": "idea_id",
        "title": "AI Study Planner",
        "category": "Education",
        "voteCount": 15,
        "commentCount": 8,
        "waitlistCount": 12,
        "totalEngagement": 35,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### GET /analytics/trending/ideas
Get trending ideas

**Response (200):**
```json
{
  "success": true,
  "trendingIdeas": [
    {
      "_id": "idea_id",
      "title": "AI Study Planner",
      "description": "...",
      "category": "Education",
      "creatorName": "username",
      "voteCount": 50,
      "commentCount": 25,
      "waitlistCount": 40,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error message"
}
```

---

## Testing with Postman

1. **Import Collection**
   - Create new Postman collection
   - Add all endpoints above

2. **Set Variables**
   - `{{baseUrl}}`: http://localhost:5000/api
   - `{{token}}`: JWT token from login

3. **Test Flow**
   - Sign up
   - Login (save token)
   - Create idea
   - Vote on idea
   - Add comment
   - Join waitlist
   - View analytics

---

**API Documentation Last Updated: 2024**
