# Task Manager

A full-stack task management application with JWT authentication.

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm

### Backend Setup

1. Navigate to Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up database:
   - Create PostgreSQL database
   - Run `database/schema.sql` to create tables

4. Create `.env` file:
   ```env
   PORT=3000
   JWT_SECRET=your-secret-key
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=taskmanager
   DB_USER=your-username
   DB_PASSWORD=your-password
   ```

5. Start backend server:
   ```bash
   npm start
   ```
   Backend runs on `http://localhost:3000`

### Frontend Setup

1. Navigate to Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Running Both

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

Open `http://localhost:5173` in your browser.
