# Her Blog - Full Stack Blogging Application

A modern, full-featured blogging platform built with the MERN stack (MongoDB, Express, React, Node.js). Users can create accounts, publish posts with images, comment on posts, and manage their content.

## 🎨 Project Overview

This is a complete full-stack web application that demonstrates:

- **User Authentication** - JWT-based authentication with secure password hashing
- **Blog Post Management** - Create, read, update, and delete blog posts
- **Image Uploads** - Multer integration for handling image uploads
- **Comments System** - Users can comment on posts
- **Protected Routes** - Authorization middleware for secure endpoints
- **Modern UI** - Responsive design with Tailwind CSS and a beautiful pink/brown theme

### Tech Stack

**Frontend:**
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer

## 📁 Folder Structure

```
her-blog/
├── client/                    # React frontend application
│   ├── public/                # Static assets
│   └── src/
│       ├── components/        # Reusable React components
│       │   ├── Navbar.jsx
│       │   ├── PostCard.jsx
│       │   ├── PostForm.jsx
│       │   ├── CommentsSection.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/             # Page components
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── SinglePostPage.jsx
│       │   ├── CreatePostPage.jsx
│       │   └── EditPostPage.jsx
│       ├── context/           # React Context providers
│       │   └── AuthContext.jsx
│       ├── services/          # API service functions
│       │   └── api.js
│       ├── hooks/             # Custom React hooks
│       ├── App.jsx            # Main app component
│       ├── main.jsx           # Entry point
│       └── index.css          # Global styles
│
├── server/                    # Express backend application
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   │   ├── authController.js
│   │   ├── postsController.js
│   │   └── commentsController.js
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── utils/                 # Utility functions
│   ├── uploads/               # Uploaded images (gitignored)
│   ├── server.js              # Entry point
│   └── package.json
│
└── README.md                  # This file
```

## 🚀 Setup Steps

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd her-blog/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   # Create .env file in server directory
   # See Example .env section below
   ```

4. **Start the server:**
   ```bash
   npm run dev    # Development mode with nodemon
   # or
   npm start      # Production mode
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd her-blog/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Client will run on `http://localhost:5173`

### MongoDB Setup

#### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (M0 free tier)
3. Create a database user (username + password)
4. Add your IP address to Network Access (or use `0.0.0.0/0` for development)
5. Get connection string: Click "Connect" → "Drivers" → Copy connection string
6. Add connection string to `.env` file

#### Option 2: Local MongoDB

1. Install MongoDB Community Server
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/her-blog`

## 📋 Example .env File

Create a `.env` file in the `server` directory with the following:

```env
# MongoDB Connection String
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/her-blog?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/her-blog

# JWT Secret Key (generate a random string for production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000
```

**⚠️ Important:** 
- Never commit `.env` file to version control
- Use a strong, random string for `JWT_SECRET` in production
- Keep your MongoDB credentials secure

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register Request:**
```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Posts Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts/:id` | Get single post | No |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/:id` | Update post | Yes (Author only) |
| DELETE | `/api/posts/:id` | Delete post | Yes (Author only) |

**Create Post Request:**
```json
POST /api/posts
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "title": "My First Post",
  "content": "This is the content of my post...",
  "image": <file> (optional)
}
```

**Update Post Request:**
```json
PUT /api/posts/:id
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "title": "Updated Title",
  "content": "Updated content...",
  "image": <file> (optional)
}
```

### Comments Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/comments/:postId` | Get comments for a post | No |
| POST | `/api/comments/:postId` | Add comment to post | Yes |

**Add Comment Request:**
```json
POST /api/comments/:postId
Authorization: Bearer <token>

{
  "content": "Great post! Thanks for sharing."
}
```

### Authorization

For protected endpoints, include the JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

## 🖼️ Screenshots

### Home Page
![Home Page](./screenshots/home.png)
*Home page displaying all blog posts in a grid layout*

### Single Post View
![Single Post](./screenshots/post.png)
*Detailed view of a single post with comments section*

### Create Post
![Create Post](./screenshots/create.png)
*Form for creating a new blog post with image upload*

### Login Page
![Login](./screenshots/login.png)
*User login page with authentication form*

### Register Page
![Register](./screenshots/register.png)
*User registration page*


## 🔒 Security Features

- **Password Hashing** - Passwords are hashed using bcryptjs before storage
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Server-side and client-side route protection
- **Input Validation** - Request validation and sanitization
- **CORS Configuration** - Controlled cross-origin resource sharing
- **Error Handling** - Centralized error handling with secure error messages

## 🎨 Features

### User Features
- ✅ User registration and authentication
- ✅ JWT token-based session management
- ✅ User profile display

### Post Features
- ✅ Create, read, update, delete posts
- ✅ Image upload for posts
- ✅ Rich text content
- ✅ Author-only editing/deleting
- ✅ Post listing and pagination

### Comment Features
- ✅ Add comments to posts
- ✅ View all comments for a post
- ✅ Real-time comment updates

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern pink/brown theme
- ✅ Smooth transitions and animations
- ✅ Loading states and error handling
- ✅ Intuitive navigation

## 🛠️ Development

### Available Scripts

**Server:**
```bash
npm run dev    # Start server with nodemon (auto-reload)
npm start      # Start server in production mode
```

**Client:**
```bash
npm run dev    # Start Vite dev server
npm run build  # Build for production
npm run preview # Preview production build
```

### Testing the API

You can test the API endpoints using:
- **Postman** - API testing tool
- **Thunder Client** - VS Code extension
- **cURL** - Command line tool
- **Browser** - For GET requests

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure IP address is whitelisted (for Atlas)

2. **CORS Errors**
   - Verify CORS configuration in `server.js`
   - Check if client is running on allowed port (5173 or 3000)

3. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in `.env`
   - Check token expiration (default: 7 days)
   - Verify token is included in Authorization header

4. **Image Upload Issues**
   - Check `uploads` folder exists and has write permissions
   - Verify file size (max 5MB)
   - Ensure correct MIME type

5. **Port Already in Use**
   - Change port in `.env` (server) or `vite.config.js` (client)
   - Kill process using the port

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for learning purposes.

## 📄 License

This project is created for educational purposes as part of the Power Learn Project.

## 👏 Credits

**Developer:** Grace Akhati  
**Program:** Power Learn Project

---

Built with ❤️ 
