# User Manager MERN App

This is a beginner-friendly MERN stack CRUD project with a separate `frontend` and `backend`.

The app lets you create, view, update, and delete users with:

- React + Vite frontend
- Node.js + Express backend
- MongoDB Atlas database
- Render backend deployment
- Vercel frontend deployment

## Project Structure

```text
mern-deploy-test/
|-- backend/
|   |-- config/
|   |   `-- db.js
|   |-- models/
|   |   `-- User.js
|   |-- routes/
|   |   `-- userRoutes.js
|   |-- .env.example
|   |-- package.json
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- App.css
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   `-- vite.config.mjs
`-- README.md
```

## Features

- Add a user
- View all users
- Edit a user
- Delete a user
- Connect frontend and backend using environment variables

## API Routes

- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Local Development

### 1. Backend

Open a terminal in `backend` and run:

```bash
npm install
npm run dev
```

Create `backend/.env` using this format:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

The backend runs on:

```text
http://localhost:5000
```

### 2. Frontend

Open another terminal in `frontend` and run:

```bash
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Part 1: Git Workflow

Before deploying, push your code to GitHub. Render and Vercel watch your GitHub repository and rebuild when you push changes.

Run these commands from the root folder:

```bash
git init
git remote add origin https://github.com/YourUsername/YourRepoName.git
git add .
git commit -m "Finish deployment setup"
git push -u origin main
```

Use the same loop whenever you make updates:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

## Part 2: Backend Deployment on Render

The backend stays online and connects to MongoDB Atlas.

### Render setup

- Create a new `Web Service`
- Connect your GitHub repository
- Set `Root Directory` to `backend`
- Set `Build Command` to `npm install`
- Set `Start Command` to `node server.js`

### Render environment variables

Add these in Render:

```env
MONGO_URI=your_atlas_connection_string
FRONTEND_URL=https://your-frontend.vercel.app
```

### How to verify backend deployment

When Render finishes deploying, open the backend URL.

If you see:

```text
User Manager API is running
```

that means the Express server is live.

You can also test:

```text
https://your-backend.onrender.com/api/users
```

If it returns `[]`, that means the API is working and the database is connected.

## Part 3: Connecting Frontend to Backend

This is the glue between the React app and the deployed API.

In this project, the frontend reads the backend URL from `VITE_API_BASE_URL`.

Set this in Vercel:

```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

The frontend code uses that value in `frontend/src/App.jsx`.

Without this, the deployed frontend will not know where the backend lives.

## Part 4: Frontend Deployment on Vercel

The frontend serves the React UI to the browser.

### Vercel setup

- Import your GitHub repository
- Set `Root Directory` to `frontend`
- Let Vercel detect `Vite`
- Keep the default build command: `npm run build`
- Output directory: `dist`
- npm install


### Vercel environment variable

Add:

```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

After deployment, copy your Vercel URL and update Render:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

Then redeploy the backend so CORS allows your real frontend domain.

## Part 5: Troubleshooting

| Symptom | Probable Cause | Fix |
| --- | --- | --- |
| White screen on Vercel | Wrong root directory or build settings | Set Vercel root directory to `frontend` |
| Fetch or network error in browser console | Wrong backend URL or sleeping backend | Check `VITE_API_BASE_URL` and make sure Render is live |
| CORS error | `FRONTEND_URL` missing or wrong on Render | Set `FRONTEND_URL` to the exact Vercel domain |
| MongoDB connection failed | `MONGO_URI` missing or invalid | Recheck Render environment variables |
| Atlas IP error | MongoDB network access is blocked | In Atlas, allow access for `0.0.0.0/0` |
| Data not saving | Backend cannot reach Atlas | Verify DB user, password, and connection string |

## Final Deployment Checklist

- MongoDB Atlas cluster created
- Atlas database user created
- Atlas network access configured
- Code pushed to GitHub
- Backend deployed to Render
- `MONGO_URI` added in Render
- `FRONTEND_URL` added in Render
- Frontend deployed to Vercel
- `VITE_API_BASE_URL` added in Vercel
- Frontend and backend URLs tested

## Live Links

Update this section after deployment:

- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.onrender.com`

## Notes

- Do not commit `backend/.env`
- Keep secrets in Render and Vercel environment variables
- If MongoDB Atlas gives SRV/DNS issues locally, the non-SRV connection string may still work for local development
