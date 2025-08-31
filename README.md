# ShopVoice

ShopVoice-Agent is an intelligent voice assistant designed to enhance the shopping experience by providing users with personalized recommendations, answering queries, and facilitating seamless interactions with e-commerce platforms. Utilizing advanced natural language processing and machine learning techniques, ShopVoice-Agent aims to streamline the shopping process and improve customer satisfaction.

## Essential Features

- Voice command integration for hands-free shopping list management
- User authentication and session management
- Product suggestions and alternatives
- Shopping list creation, update, and management
- Responsive UI with modern design using TailwindCSS
- Secure API with JWT authentication
- Integration with AI services for enhanced user experience

## Tech Stack

### Client

- React 18 with TypeScript
- Vite as the build tool
- TailwindCSS for styling
- React Router for routing
- Axios for API requests


### Server

- Node.js with Express framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Express-session with MongoDB session store
- Hugging-face Inference API
- Other utilities: bcrypt, cors, dotenv, (logging)

## Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ShopVoice
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd ../client
npm install
```

## Environment Variables Setup

Create a `.env` file in the `server` directory with the following variables:

```env
DATABASE_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
SESSION_SECRET=<your-session-secret>
PORT=3000
```

- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `REFRESH_TOKEN_SECRET`: Secret key for refresh tokens
- `SESSION_SECRET`: Secret key for Express session
- `PORT`: Port number for the server (default: 3000)

## Running the Project

### Server

From the `server` directory, run:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### Client

From the `client` directory, run:

```bash
npm run dev
```

The client will start on the default Vite port (usually `http://localhost:5173`).

## Folder Structure

```
ShopVoice/
├── client/          # React client application
│   ├── src/         # Source code
│   ├── public/      # Static assets
│   ├── package.json # Client dependencies and scripts
│   └── ...
├── server/          # Express server application
│   ├── routes/      # API route handlers
│   ├── models/      # Mongoose models
│   ├── config/      # Configuration files
│   ├── services/    # Business logic and external service integrations
│   ├── utils/       # Utility functions
│   ├── server.js    # Server entry point
│   ├── package.json # Server dependencies and scripts
│   └── ...
└── README.md        # Project overview and instructions
```

## Additional Notes

- The client app uses Firebase hosting (configured in `client/firebase.json`) for deployment.
- CORS is configured on the server to allow requests from the Firebase hosting URL.
- The project uses sessions stored in MongoDB for user session management.
- Voice command features are implemented in the client using Web Speech API and custom hooks.

---

This README provides a comprehensive overview to get started with the ShopVoice project. For any questions or issues, please refer to the source code or contact the project maintainers.
