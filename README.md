# 📝 Next.js Blog Platform (Full-Stack)

A modern full-stack blog application built with **Next.js App Router**, focused on clean architecture, server-driven mutations, and production-ready patterns.

<img width="800" height="600" alt="preview-bloglist" src="https://github.com/user-attachments/assets/705b4d7a-0a34-4cba-87b6-f4c6126cce43" />
<img width="800" height="600" alt="preview-dashboard" src="https://github.com/user-attachments/assets/9e2ece6c-6b3c-4d19-b48d-eded90ad0a00" />
<img width="800" height="600" alt="preview-create" src="https://github.com/user-attachments/assets/7765e7fe-ad33-43c2-84c1-ef1779cac3ab" />


---

## 🚀 Overview

This project is a production-minded blog platform that demonstrates:

- Full-stack capabilities using Next.js
- Server Actions for mutations
- Authentication & authorization
- Form validation and UX handling
- Data fetching and caching strategies
- Clean architecture and scalability mindset

---

## ✨ Features

### 🔐 Authentication

- Login / Register flow
- Server-side validation using Zod
- Secure session handling

### 📝 Blog Management

- Create / Edit / Delete posts
- Draft & Publish status
- Rich post data model:
  - Title
  - Content
  - Image
  - Status (Draft / Published)
  - Author
  - Created / Updated timestamps

### 📊 Admin Panel

- "My Posts" dashboard
- Ownership-based authorization
- Post management (CRUD)

### 🔍 Search & Pagination

- Full-text search (Convex)
- Pagination for scalable listing

### ⚡ UX & Performance

- Loading / Error / Empty states
- Optimistic and responsive UI
- Streaming with Suspense
- Partial Prerendering (PPR)

### 🧠 Data & Validation

- React Hook Form
- Zod schema validation

### 🔄 Caching Strategy

- Tag-based cache invalidation
- `revalidateTag` after mutations

---

## 🏗️ Tech Stack

- **Frontend & Backend**: Next.js (App Router)
- **Language**: TypeScript
- **Forms**: React Hook Form + Zod
- **Auth**: Better Auth
- **Backend / DB**: Convex
- **UI**: shadcn/ui
- **Data Fetching**: Server Actions + client-side fetch
- **Styling**: Tailwind CSS

---

## 🧩 Architecture Highlights

- Server Actions used for:
  - Authentication
  - Mutations (create/update)
- Cache revalidation strategy after mutations
- Clean folder structure for scalability

---

## 🐳 DevOps

### Docker

- Containerized application
- Easy local setup

### CI/CD (GitHub Actions)

- Linting
- Type checking
- Build validation

---

## 📁 Project Structure (Simplified)

```
app/
  (auth)/
  blog/
  dashboard/
  api/
components/
lib/
actions/
schemas/
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-name>
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Setup environment variables

Create a `.env.local` file:

```
# Add your environment variables here
```

### 4. Run the development server

```bash
yarn dev
```

---

## 📦 Build

```bash
yarn build
```

---

## 🎯 Why This Project?

This project was intentionally built to demonstrate:

- Modern Next.js architecture
- Server-driven UI patterns
- Clean form handling and validation
- Real-world application structure
- Performance and UX considerations

---

## 👨‍💻 Author

Hamed

---
