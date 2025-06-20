# USDT Tracker

This app tracks live USDT transfers on the Ethereum blockchain in real time. It surfaces the 5 largest transfers as they happen, giving you instant visibility into major on-chain movements.

---

## 📂 Project Structure

```
/frontend   # Next.js frontend
/backend    # Node.js backend
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Set Up Environment Variables

Before running the app, you'll need an **Alchemy API Key**.

Create the following files:

- `/backend/.env` – for backend secrets:

```env
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

---

### 3. Start the Backend

```bash
cd backend
npm install
node server.js
```

---

### 4. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

- The frontend runs on [`http://localhost:3000`](http://localhost:3000) by default
