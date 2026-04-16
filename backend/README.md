# Backend API

Express API for authentication, product management, and AI endpoints.

## Scripts
- `npm run dev`: start with nodemon
- `npm start`: start with node

## Required Environment Variables
- `PORT` (optional, default `8080`)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PROJECT_BUCKET`
- `FIREBASE_APIKEY`
- `GCLOUD_PROJECT_ID`
- `GOOGLE_APPLICATION_CREDENTIALS` (optional if using `gcloud auth application-default login`)

See `.env.example` for a starter template.

## Auth
- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/get` (requires Bearer token)
- `PUT /auth/profile` (requires Bearer token)

## Products
- `GET /products/`
- `GET /products/list`
- `POST /products/add`
- `PUT /products/:id/edit`
- `DELETE /products/:id`
- `POST /products/generate-description`

## Chat
- `POST /chat/message`

