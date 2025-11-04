🌸 Her Blog — MERN Stack Integration

Her Blog is a full-stack blog application built using the MERN Stack — MongoDB, Express.js, React.js, and Node.js.
It demonstrates seamless integration between a secure backend and a dynamic frontend for a smooth user experience.

📘 Assignment Overview

This project showcases:

A RESTful API built with Express.js and MongoDB

A responsive React frontend with modular components

Full CRUD functionality (Create, Read, Update, Delete) for blog posts

User authentication & authorization

Advanced features like image uploads and comments

🏗️ Project Structure
mern-stack-integration-graceakhati-dev/
├── client/                 # React front-end
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express.js back-end
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/            # Uploaded images
│   ├── server.js
│   └── package.json
└── README.md

⚙️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-graceakhati-dev.git
cd mern-stack-integration-graceakhati-dev

2️⃣ Set Up the Server
cd server
npm install


Create a .env file inside the server/ directory:

MONGODB_URI=mongodb://localhost:27017/her-blog
# or MongoDB Atlas connection string:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/her-blog

JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development

3️⃣ Set Up the Client
cd ../client
npm install


(Optional) Create a .env file inside the client/ directory:

VITE_API_URL=http://localhost:5000/api

🚀 Running the Application
Step 1: Start MongoDB
mongod

Step 2: Start the Server
cd server
npm run dev


Expected output:

MongoDB connected
Her Blog server running on port 5000

Step 3: Start the Client
cd client
npm run dev


Expected output:

VITE v5.x.x ready in xxx ms
➜  Local: http://localhost:5173/


Now visit 👉 http://localhost:5173

✨ Application Features
👤 User Authentication

Register new users (username, email, password)

Secure login using JWT tokens

Session persistence via localStorage

📝 Blog Management

Create, view, edit, and delete blog posts

Rich post editor with image upload (max 5MB)

Responsive UI built with Tailwind CSS

💬 Social Features

Add and view comments on posts

Author name and timestamp displayed

Comment management for authenticated users

🖼️ Media Support

Upload and preview post images

Supported formats: JPG, PNG, GIF

🧱 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login a user
📰 Posts
Method	Endpoint	Description
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get a single post
POST	/api/posts	Create new post (protected)
PUT	/api/posts/:id	Update post (author only)
DELETE	/api/posts/:id	Delete post (author only)
💭 Comments
Method	Endpoint	Description
GET	/api/comments/:postId	Get all comments for a post
POST	/api/comments/:postId	Add comment (protected)
🧰 Technology Stack
🖥️ Frontend

React 18 (Hooks, Router)

Vite (Fast dev build tool)

Axios (API requests)

Tailwind CSS (Styling)

⚙️ Backend

Express.js (Server & routing)

MongoDB + Mongoose (Database)

Multer (Image uploads)

JWT + bcryptjs (Auth & password hashing)

Nodemon (Dev auto-reload)

🔐 Security Features

Secure password hashing with bcryptjs

JWT-based route protection

CORS configuration for safe API access

Input validation & sanitization

🩺 Troubleshooting Guide
❌ Server Not Running (ERR_CONNECTION_REFUSED)

Fix:

cd server
npm run dev


Ensure MongoDB is connected first.

⚠️ Port 5000 Already in Use


✅ Visit http://localhost:5000 → “Her Blog API is running”
✅ Visit http://localhost:5000/api/posts → Returns JSON
✅ Client loads at http://localhost:5173
✅ Server logs: “MongoDB connected”

💡 Development Tips

Auto-reload: Nodemon + Vite = seamless hot reload

Restart server: Type rs in terminal running nodemon

Browser tools: Check console + network tab for debugging

Hard refresh: Ctrl + Shift + R to clear cache

Logs: Use terminal and browser dev tools for real-time feedback


## 📸 Screenshots

### 🏠 Home Page
![Home Page](./screenshots/home.png)
All blog posts displayed in a grid layout.

### 📰 Single Post
![Single Post](./screenshots/single-post.png)
Detailed post view with comments.

### ✍️ Create Post
![Create Post](./screenshots/create-post.png)
Form for adding new blog posts.

### 🔑 Login Page
![Login Page](./screenshots/login.png)

### 🆕 Register Page
![Register Page](./screenshots/register.png)



💫 Author

Grace Akhati
Software Developer | Power Learn Project Student
GitHub: graceakhati-dev