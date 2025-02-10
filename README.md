# Instagram Auto-Reply Automation Tool

## 📌 Project Overview
This full-stack project is an **Instagram Auto-Reply Automation Tool** that automatically replies to Instagram comments based on pre-defined keywords. It also provides analytics and keyword management features.

---

## 🚀 Tech Stack
- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB
- **Authentication**: Instagram OAuth
- **API Integration**: Instagram Graph API
- **Testing**: Jest, Supertest

---

## 🛠️ Setup & Installation

### 🔧 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local DB setup)
- [Git](https://git-scm.com/)

### 📥 Clone the Repository
```sh
git clone https://github.com/yourusername/instagram-auto-reply.git
cd instagram-auto-reply
```

### 📦 Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

### 🔑 Environment Variables (.env)
Create a `.env` file in the **backend** folder and add:
```env
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:5173/auth/instagram/callback
MONGO_URI=mongodb://localhost:27017/instagram_auto_reply
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🔄 Running the Project

### 🚀 Start Backend
```sh
cd backend
npm start
```
Backend runs on: `http://localhost:5000`

### 🚀 Start Frontend
```sh
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔐 Authentication Flow
1. User clicks "Login with Instagram".
2. Redirects to Instagram OAuth (`https://api.instagram.com/oauth/authorize`).
3. User approves permissions → **receives authorization code**.
4. Backend exchanges code for **access token** (`/oauth/access_token`).
5. Access token is used for API requests.

---

## 📡 API Endpoints
### 🛠 Authentication
- **`POST /api/auth/instagram`** → Handles Instagram login

### 💬 Comments Auto-Reply
- **`GET /api/comments`** → Fetches comments
- **`POST /api/comments/reply`** → Sends automated replies

### 📊 Analytics
- **`GET /api/analytics`** → Fetches Instagram insights

### 🔑 Keyword Management
- **`GET /api/keywords`** → Get all keywords
- **`POST /api/keywords`** → Add a keyword
- **`DELETE /api/keywords/:id`** → Remove a keyword

---

## ✅ Testing
Run backend tests:
```sh
cd backend
npm test
```

---

## 🐞 Troubleshooting
### ⚠️ Invalid Scope Error (user_profile, user_media)
- Ensure correct **App Permissions** in [Meta Developer Console](https://developers.facebook.com/).
- Check if the **redirect URI** is correctly added in **OAuth Settings**.

### ⚠️ MongoDB Connection Error
- Ensure **MongoDB is running** (`mongod` command).
- Check if **MONGO_URI** is correctly set.

### ⚠️ Instagram OAuth Redirects to Error Page
- Double-check the **client_id, redirect_uri, and scopes** in the login request.
- Verify your app is **Live Mode enabled** in Meta settings.

---

## 📜 License
This project is open-source and available under the MIT License.

---

## 💡 Future Improvements
- ✅ Webhooks for real-time Instagram comment tracking.
- ✅ Admin Dashboard for comment moderation.
- ✅ Improved Analytics UI.

---

## 🤝 Contributing
1. **Fork** the repository.
2. **Create a new branch** (`feature-xyz`)
3. **Commit your changes**
4. **Push** and create a PR.

---

## 🎉 Acknowledgements
Special thanks to the Instagram Graph API documentation and OpenAI for assistance!
