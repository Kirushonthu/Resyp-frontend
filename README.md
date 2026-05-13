# 🍽️ Resyp — Recipe Discovery App

A modern recipe management web app built with React. Browse, search, and manage recipes with a clean UI and secure authentication.

🔗 **Live Demo:** [resyp.vercel.app](https://resyp-frontend.vercel.app/)  
👨‍💻 **Developer:** [Kish](https://github.com/Kirushonthu)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔐 Authentication | JWT-based login & logout with protected routes |
| 🍳 Recipe Browsing | Browse 50+ recipes from multiple cuisines |
| 🔍 Search | Filter recipes by name or cuisine in real time |
| ➕ CRUD Operations | Add, edit, and delete recipes |
| 📖 Recipe Details | Full view with ingredients, instructions, calories & more |
| 🛡️ Protected Routes | Unauthorized users are redirected to login |
| 🔔 Toast Notifications | Success & error feedback on all actions |
| 📱 Responsive Design | Works seamlessly on mobile and desktop |

---

## 🛠️ Tech Stack

- **Frontend** — React 18 + Vite
- **Routing** — React Router DOM v6
- **HTTP Client** — Axios
- **Styling** — Tailwind CSS
- **Notifications** — React Toastify
- **API** — [DummyJSON Recipes](https://dummyjson.com/recipes)

## 📁 Project Structure

src/
├── componets/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── RecipeDetails.jsx
│   ├── Services.jsx
│   └── login-page/
│       ├── Form.jsx
│       └── Protectedroute.jsx
├── home/
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Home.jsx
│   └── Recipe.jsx
├── App.jsx
└── main.jsx

---

## 📡 API Reference

Base URL: `https://dummyjson.com/recipes`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/recipes` | GET | Fetch all recipes |
| `/recipes/:id` | GET | Fetch single recipe by ID |

---

## ▶️ Getting Started

```bash
# Clone the repository
git clone https://github.com/Kirushonthu/Resyp-frontend.git

# Navigate to project
cd Resyp-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📸 Pages

- `/` — Home page with featured recipes
- `/recipes` — Full recipe listing with search & CRUD
- `/recipe/:id` — Detailed recipe view
- `/about` — About the app
- `/services` — Features & services
- `/contact` — Contact form & developer info

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by [Kishore](https://github.com/Kirushonthu)
---


