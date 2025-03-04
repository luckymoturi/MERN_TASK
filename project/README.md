# JSONPlaceholder CRUD App

A clean, modern React application for performing CRUD operations using the JSONPlaceholder API.

## Features

- Create, read, update, and delete posts
- Material UI components for a clean, white interface
- Responsive design
- Notification system for operation feedback
- Confirmation dialogs for destructive actions

## Technologies Used

- React
- TypeScript
- Material UI
- Axios for API requests
- JSONPlaceholder API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jsonplaceholder-crud-app.git
   cd jsonplaceholder-crud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints Used

- GET /posts - Fetch all posts
- POST /posts - Create a new post
- PUT /posts/:id - Update a post
- DELETE /posts/:id - Delete a post

## Project Structure

```
src/
├── api/          # API service functions
├── components/   # Reusable UI components
├── types/        # TypeScript type definitions
├── App.tsx       # Main application component
└── main.tsx      # Application entry point
```

## Deployment

The application is deployed at: https://fabulous-hotteok-478339.netlify.app

## License

MIT