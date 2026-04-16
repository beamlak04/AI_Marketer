# Frontend

React application for AI Marketer.

## Scripts
- `npm run dev`: run Vite dev server
- `npm run build`: production build
- `npm run preview`: preview build

## Environment Variables
Create a `.env` file in `frontend/` if needed:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

If not set, the app defaults to `http://localhost:8080`.

## Main Flows
- Auth: signup/login and protected app routes
- Products: list/add/delete products and generate descriptions with AI
- Campaigns: generate campaign caption from selected product
- Assistant: chat with AI and persist conversation context
- Settings: load and update profile data

