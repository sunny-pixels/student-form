# Student Form Application

A full-stack student registration form application built with React (Vite) and Node.js/Express/MongoDB.

## Features

- Student registration form with Gujarati language support
- Family members management
- Student details management
- Responsive design for mobile and desktop
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd formsetup
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` folder (already exists) and ensure it has:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Application

### Start Backend Server
```bash
cd backend
node server.js
```
The backend will run on `http://localhost:3002`

### Start Frontend Development Server
Open a new terminal and run:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## Usage

1. Fill in all the form fields
2. Add family members using the "+ Add Member" button
3. Add student details using the "+ Add Student" button
4. Click "Submit" to save the form data to MongoDB
5. The form will reset after successful submission

## Bug Fixes

- Fixed: "Add Student" and "Add Member" buttons no longer submit the form (added `type="button"`)
- Fixed: Form data now properly includes family members and students arrays
- Fixed: State management lifted to parent component for proper data flow

## API Endpoints

### POST /api/form/submit
Submit a new form
- Body: JSON object with form data, familyMembers array, and students array

### GET /api/form/all
Get all submitted forms (for admin use)

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS

## Project Structure
```
formsetup/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Form.js
│   ├── routes/
│   │   └── formRoutes.js
│   ├── .env
│   └── server.js
├── src/
│   ├── App.jsx
│   ├── FamilyMembersTable.jsx
│   ├── StudentDetailsTable.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```
