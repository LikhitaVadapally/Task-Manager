# Task Manager

A full-stack task management application with JWT authentication. Users can create, edit, delete, and manage tasks.

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

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm

### Clone the Repository

git clone https://github.com/YOUR_USERNAME/Task-Manager.git
cd Task-Manager### Backend Setup

1. Navigate to Backend directory:
   ```cd Backend```
   
3. Install dependencies:
   ``` npm install```
   
5. Set up database:
   - Create a PostgreSQL database
   - Run `database/schema.sql` to create tables

4. Create `.env` file in the Backend directory:
  
   PORT=3000
   JWT_SECRET=your-secret-key
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=taskmanager
   DB_USER=your-username
   DB_PASSWORD=your-password
   5. Start backend server:
   ```npm run start```
      Backend runs on `http://localhost:3000`

### Frontend Setup

1. Navigate to Frontend directory:
   ```cd Frontend```
   
3. Install dependencies:
   ```npm install```
   
4. Start development server:
  ``` npm run dev```
      Frontend runs on `http://localhost:5173`
