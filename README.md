# 🚀 Startup Idea Validation Platform

A full-stack **MERN** web application that helps entrepreneurs validate startup ideas through community feedback. Users can post startup ideas, vote, comment, join waitlists, and founders can track engagement through an analytics dashboard.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- Secure Login using JWT
- Protected Routes
- Password Hashing with bcrypt

### 💡 Idea Management
- Create Startup Ideas
- Browse All Ideas
- View Idea Details
- Search & Filter by Category
- Edit/Delete Own Ideas

### 🤝 Community Engagement
- Vote for Ideas
- Comment on Ideas
- Join/Leave Waitlist
- Real-time Engagement Counts

### 📊 Analytics Dashboard
- Total Votes
- Total Comments
- Waitlist Count
- Creator Statistics
- Trending Ideas

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas

---

## 📂 Project Structure

```
startup-idea-validation/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sushma-Bammidi/startup-idea-validation.git

cd startup-idea-validation
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install
```

Create a **.env** file inside the backend folder.

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000
```

Start the backend server

```bash
npm start
```

or

```bash
npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open a new terminal.

```bash
cd frontend

npm install
```

Create a **.env** file.

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start React

```bash
npm start
```

Frontend runs at

```
http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/signup |
| POST | /api/auth/login |
| GET | /api/auth/profile |

---

## Ideas

| Method | Endpoint |
|---------|----------|
| POST | /api/ideas |
| GET | /api/ideas |
| GET | /api/ideas/:id |
| PUT | /api/ideas/:id |
| DELETE | /api/ideas/:id |
| GET | /api/ideas/my-ideas |

---

## Votes

| Method | Endpoint |
|---------|----------|
| POST | /api/votes |
| POST | /api/votes/remove |
| GET | /api/votes/count/:ideaId |

---

## Comments

| Method | Endpoint |
|---------|----------|
| POST | /api/comments |
| GET | /api/comments/:ideaId |
| DELETE | /api/comments/:id |

---

## Waitlist

| Method | Endpoint |
|---------|----------|
| POST | /api/waitlist/join |
| POST | /api/waitlist/leave |
| GET | /api/waitlist/count/:ideaId |

---

## Analytics

| Method | Endpoint |
|---------|----------|
| GET | /api/analytics/creator/dashboard |
| GET | /api/analytics/trending/ideas |
| GET | /api/analytics/idea/:ideaId |

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- User Authorization
- One Vote per User
- One Waitlist Entry per User

---

# 🎯 User Flow

### Founder

- Register/Login
- Create Startup Idea
- View Dashboard
- Track Votes
- Track Comments
- Track Waitlist

### Community User

- Register/Login
- Browse Ideas
- Vote
- Comment
- Join Waitlist
- Explore Trending Ideas

---

# 📊 Database Collections

- Users
- Ideas
- Votes
- Comments
- WaitingList

---

# 🚀 Deployment

### Backend
- Render
- Railway
- Heroku

### Frontend
- Vercel
- Netlify

---

# 📹 Demo Video

https://drive.google.com/drive/folders/17ZpxL6nIG3VWCLBCFZTFfD_zG9Uzu-_v?usp=sharing

---

# 👩‍💻 Author

**Sushma Bammidi**

GitHub:
https://github.com/Sushma-Bammidi

---

## ⭐ If you found this project useful, consider giving it a Star!
