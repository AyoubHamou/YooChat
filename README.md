# 🗨️ YooChat

**YooChat** is a modern, real-time chat web application built for language learners to connect, interact, and practice together.  
It provides a clean UI, friend requests, onboarding, and more — all built with the MERN stack and deployed via [Railway](https://railway.app).

🌐 Live App: [yoochat.up.railway.app](https://yoochat.up.railway.app/)  
📚 Indexed on DeepWiki: [deepwiki.com/AyoubHamou/YooChat](https://deepwiki.com/AyoubHamou/YooChat)  
📦 GitHub Repo: [github.com/AyoubHamou/YooChat](https://github.com/AyoubHamou/YooChat)  
🔴 Youtube Preview Link: [https://youtu.be/4F9rrb1utNo](https://youtu.be/4F9rrb1utNo)

---

## 🚀 Features

- 🔐 **Authentication** – Sign up, log in, and secure sessions with JWT.
- 💬 **Real-Time Messaging** – Chat with friends in real-time.
- 👥 **Friend Requests** – Send, accept, or reject friend connections.
- 📋 **User Onboarding** – Personalized setup to get started quickly.
- 🌍 **Geo-aware Experience** – (Planned) Location-based language practice.
- 📱 **Responsive Design** – Works seamlessly on both desktop and mobile.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Deployment |
|----------|---------|----------|------------|
| React + Tailwind | Express.js + Node.js | MongoDB | Railway |

Other Tools:
- **React Query** for data fetching and caching
- **Lucide Icons** for UI
- **Mongoose** for MongoDB ORM
- **DeepWiki** for project indexing and documentation

---

## 📸 Screenshots

> Coming Soon — add screenshots or screen recordings of your app here!

---

## 📁 Folder Structure

```
YooChat/
├── client/          # React frontend
├── server/          # Express backend
├── .env             # Environment variables
├── package.json     # Project metadata and scripts
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AyoubHamou/YooChat
cd YooChat
```

### 2. Set Up Environment Variables

Create a `.env` file in both `/client` and `/server` directories. Example for the server:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies

```bash
# For client
cd client
npm install

# For server
cd ../server
npm install
```

### 4. Run the App

```bash
# From root or use concurrently
npm run dev
```

---

## 🧠 About the Project

YooChat was built as a side project to experiment with building a **real-time chat app** from scratch using MERN and explore **modern UI practices** and **user experience flows**. It's also indexed on DeepWiki for long-term documentation and discoverability.


## 🤝 Contributing

Contributions are welcome!  
Feel free to open an issue or pull request.

---

## 📄 License

MIT License © [Ayoub Hamou](https://github.com/AyoubHamou)
