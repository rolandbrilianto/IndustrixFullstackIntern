# Industrix Todo App - Full Stack Coding Challenge

A full-stack todo list application built with Fastify (Node.js), PostgreSQL (Supabase), and React.

---

## Tech Stack

**Backend:**

- Node.js + Fastify
- PostgreSQL (Supabase)
- Sequelize ORM
- Fastify Swagger (API Documentation)

**Frontend:**

- React + Vite
- Ant Design (antd)
- Axios
- React Context API

---

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm
- Git
- A Supabase account (free tier is enough)

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Database Setup (Supabase)

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project → **SQL Editor** → **New Query**
3. Run the following migrations **in order**:

**Migration 1 - Create Categories Table:**

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) NOT NULL DEFAULT '#6B7280',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Migration 2 - Create Todos Table:**

```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_todos_title ON todos(title);
CREATE INDEX idx_todos_category_id ON todos(category_id);
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_priority ON todos(priority);
```

4. Go to your project → **Connect** → choose **Session Pooler** → copy the **URI** connection string

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder (use `.env.example` as reference):

```env
PORT=3000
DATABASE_URL=your_supabase_session_pooler_uri_here
```

> ⚠️ Make sure to use the **Session Pooler** URI from Supabase, not the Direct Connection, to avoid IPv4 compatibility issues.

Run the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:3000`

You can access the interactive API documentation at `http://localhost:3000/documentation`

### 4. Frontend Setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

> ⚠️ Make sure the backend is running before starting the frontend.

---

## Features

- ✅ Create, Read, Update, Delete todos
- ✅ Create, Read, Update, Delete categories
- ✅ Mark todos as complete / incomplete
- ✅ Search todos by title
- ✅ Filter by priority, category, and completion status (bonus)
- ✅ Pagination (10–20 items per page)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ React Context API for global state management (bonus)

---

## API Documentation

Once the backend is running, visit:

```
http://localhost:3000/documentation
```

This opens the interactive Swagger UI where you can explore and test all endpoints directly from the browser.

### Endpoints Overview

**Todos**

| Method | Endpoint                | Description                                |
| ------ | ----------------------- | ------------------------------------------ |
| GET    | /api/todos              | Get all todos (pagination, search, filter) |
| GET    | /api/todos/:id          | Get todo by ID                             |
| POST   | /api/todos              | Create new todo                            |
| PUT    | /api/todos/:id          | Update todo                                |
| DELETE | /api/todos/:id          | Delete todo                                |
| PATCH  | /api/todos/:id/complete | Toggle completion status                   |

**Categories**

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | /api/categories     | Get all categories  |
| POST   | /api/categories     | Create new category |
| PUT    | /api/categories/:id | Update category     |
| DELETE | /api/categories/:id | Delete category     |

### Query Parameters (GET /api/todos)

| Parameter   | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| page        | integer | Page number (default: 1)                |
| limit       | integer | Items per page (default: 10, max: 20)   |
| search      | string  | Search by title (case-insensitive)      |
| priority    | string  | Filter by priority: high / medium / low |
| category_id | uuid    | Filter by category                      |
| completed   | boolean | Filter by completion status             |

### Example Request & Response

**POST /api/todos**

Request Body:

```json
{
  "title": "Learn React",
  "description": "Learn hooks and state management",
  "priority": "high",
  "category_id": "uuid-here",
  "due_date": "2024-08-03T23:59:59Z"
}
```

Response 201:

```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": "uuid",
    "title": "Learn React",
    "description": "Learn hooks and state management",
    "completed": false,
    "priority": "high",
    "category_id": "uuid",
    "due_date": "2024-08-03T23:59:59Z",
    "created_at": "2024-07-31T10:00:00Z",
    "updated_at": "2024-07-31T10:00:00Z"
  }
}
```

**GET /api/todos**

Response 200:

```json
{
  "success": true,
  "message": "Todos fetched successfully",
  "data": {
    "data": [...],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 25,
      "total_pages": 3
    }
  }
}
```

---

## Technical Questions

### Database Design

**1. What database tables did you create and why?**

I created 2 tables:

- **categories** — stores todo categories. Each category has a `name` and a `color` (hex code) used for visual distinction in the UI. Kept separate from todos to allow reusable categories across multiple todos.

- **todos** — stores all todo items with `title`, `description`, `completed` status, `priority` level, `category_id` (foreign key), and `due_date`. References the categories table via `category_id`.

**Relationships:**

- One category can have many todos (one-to-many)
- `category_id` in todos is a foreign key referencing `categories.id`
- `ON DELETE SET NULL` — if a category is deleted, todos are not deleted, their `category_id` is simply set to NULL

I chose this structure because it is simple (only 2 tables as recommended), avoids data duplication, and covers all required features.

**2. How did you handle pagination and filtering in the database?**

Pagination uses Sequelize's `limit` and `offset`:

```js
const offset = (page - 1) * limit;
Todo.findAndCountAll({ limit, offset, where });
```

Filtering builds a dynamic `where` object based on query params:

- Search uses `Op.iLike` for case-insensitive title search: `{ title: { [Op.iLike]: '%search%' } }`
- Other filters (priority, category_id, completed) are added directly to the `where` object if provided

`findAndCountAll` returns both the rows and total count in one query, used to calculate `total_pages`.

Indexes added to speed up frequent queries:

- `idx_todos_title` — for title search
- `idx_todos_category_id` — for filter by category
- `idx_todos_completed` — for filter by completion status
- `idx_todos_priority` — for filter by priority

---

### Technical Decisions

**1. How did you implement responsive design?**

Used Ant Design's `Row` and `Col` grid system with responsive breakpoints:

```jsx
<Col xs={24} sm={24} md={12} lg={8}>
```

- `xs={24}` → 1 column on mobile (full width)
- `md={12}` → 2 columns on tablet
- `lg={8}` → 3 columns on desktop

The filter card also uses the same grid system to stack vertically on mobile and display side by side on desktop. Ant Design components like `Modal`, `Form`, and `Layout` are responsive by default.

**2. How did you structure your React components?**

```
App
└── HomePage (main page, holds all state logic)
     ├── Filter Card (search + priority / category / status filters)
     ├── TodoList (renders list of TodoItem)
     │    └── TodoItem (single todo card with actions)
     ├── TodoForm (modal for create / edit todo)
     └── CategoryForm (modal for create / edit category)
```

State is managed globally using **React Context API** (`TodoContext`) which holds:

- `todos` — list of todos
- `categories` — list of categories
- `pagination` — current pagination info
- `filters` — current active filters
- `loading` — loading state
- `fetchTodos` / `fetchCategories` — functions to refresh data

This avoids prop drilling and makes state accessible from any component without passing props manually through every level.

**3. What backend architecture did you choose and why?**

Used a 3-layer architecture:

- **Routes** — define endpoints and attach JSON Schema validation
- **Controllers** — handle HTTP request/response and error handling
- **Services** — contain all business logic and database queries via Sequelize

This separation makes the code easier to read, maintain, and debug. The service layer is independent of HTTP, making it straightforward to test in isolation.

**4. How did you handle data validation?**

Validation is done on both layers:

- **Frontend** — Ant Design Form with built-in rules (required fields, min length, etc.). Prevents invalid data from being sent to the API.
- **Backend** — Fastify JSON Schema validation on all request bodies and query params. Returns a 400 error automatically if the schema is not satisfied.

Validating on both layers ensures data integrity even if someone bypasses the frontend and calls the API directly.

---

### Testing & Quality

**1. What did you choose to unit test and why?**

Unit tests were not implemented

**2. If you had more time, what would you improve or add?**

- **Authentication** with JWT — currently there is no login system
- **Toast notifications** on the frontend for better error/success feedback instead of silent console.error
- **Due date indicators** — visual warnings for overdue todos
- **Docker** containerization for easier local setup

---

## Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── category.controller.js
│   │   │   └── todo.controller.js
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── category.model.js
│   │   │   └── todo.model.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── category.route.js
│   │   │   └── todo.route.js
│   │   ├── schemas/
│   │   │   ├── category.schema.js
│   │   │   └── todo.schema.js
│   │   ├── services/
│   │   │   ├── category.service.js
│   │   │   └── todo.service.js
│   │   └── app.js
│   ├── migrations/
│   │   ├── 001_create_categories.up.sql
│   │   ├── 001_create_categories.down.sql
│   │   ├── 002_create_todos.up.sql
│   │   └── 002_create_todos.down.sql
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CategoryForm.jsx
    │   │   ├── TodoForm.jsx
    │   │   ├── TodoItem.jsx
    │   │   └── TodoList.jsx
    │   ├── context/
    │   │   └── TodoContext.jsx
    │   ├── pages/
    │   │   └── HomePage.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── index.html
```

---

## Bonus Features Implemented

- ✅ React Context API for state management (+6 points)
- ✅ Advanced filtering by status, category, and priority (+5 points)
