# 🍽️ Recipe App

🔗 **Live Demo:** [https://recipes-r.netlify.app/](https://recipes-r.netlify.app/)

A modern **Recipe Application** built with **React**, allowing users to search for recipes, view detailed recipe pages, and create new recipes. The app includes a fully functional **Dark / Light Mode**, smooth navigation, and a clean, responsive UI.

---

## 🚀 Features

* 🔍 **Search Recipes** and display results as interactive cards
* 📄 **Recipe Details Page** using dynamic routing
* ➕ **Create New Recipes**
* 🌗 **Dark Mode / Light Mode** with instant toggle
* 🧭 **Client-side Routing** with React Router
* ⚛️ **Global State Management** using React Context
 * 📱 **Fully Responsive Design**

---

## 🛠️ Tech Stack

* **React**
* **React Router DOM**
* **Context API**
* **CSS / Responsive Design**

---

## 📂 Pages & Routes

* `/` – Home Page
* `/search` – Search Recipes
* `/results` – Search Results
* `/recipe/:id` – Recipe Details
* `/create` – Create a New Recipe

---

## 🌗 Dark Mode Implementation

* Theme state is managed using **React Context**
* The class `dark-theme` is applied dynamically
* The `<body>` element updates to reflect the active theme
* Smooth and consistent theme switching across all pages

---

 
 
* Handles loading state (`isPending`)
* Handles errors gracefully (`error`)
* Cancels fetch requests on component unmount or URL change
* Improves performance and user experience

---

## 📦 Installation & Usage

```bash
npm install
npm start
```

---

## ✨ Future Improvements

- 💾 Persist theme using Local Storage
- ⭐ Favorite recipes feature
- 🔐 Authentication system
- 🖼️ Upload recipe images using Firebase Storage


---

## 👨‍💻 Author : Awadh Aldeabi :
- This project was built as part of a **React learning journey**, focusing on real-world patterns, clean architecture, and best practices.

 
