# AI-Sandbox

AI-Sandbox is a MERN stack application designed as a comprehensive coding platform. It provides features like real-time code visualization, time/space complexity analysis, a practice zone for coding questions, AI-powered real-time coding suggestions, and a reward system for solving coding challenges.

## Features
- **Home Page**: Overview of features.
- **Compiler**: A built-in online code editor with real-time AI suggestions.
- **Profile**: User management and progress tracking.
- **Reward System**: Users earn points and coupons based on performance.

## Tech Stack
### Frontend:
- React.js
- HTML/CSS
- JavaScript

### Backend:
- Node.js
- Express.js
- MongoDB

### AI Integration:
- AI tools for real-time suggestions (e.g., ChatGPT or Gamma AI).

---

## Project Structure
```
AI-Sandbox/
|-- backend/
|   |-- config/
|   |   |-- db.js
|   |-- controllers/
|   |   |-- auth.controller.js
|   |   |-- compiler.controller.js
|   |-- models/
|   |   |-- user.js
|   |-- routes/
|       |-- auth.js
|       |-- compiler.js
|-- .env
|-- server.js
|-- frontend/
    |-- node_modules/
    |-- public/
    |-- src/
        |-- api/
        |   |-- api.js
        |-- assets/
        |   |-- css/
        |-- components/
        |-- pages/
        |-- services/
        |-- App.jsx
        |-- main.jsx
    |-- index.html
    |-- .env
    |-- .gitignore
```

---

## Installation

### Prerequisites
- Node.js
- MongoDB
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/AdarshKumarSr/AI-SANDBOX.git
   ```

2. Navigate to the project directory:
   ```bash
   cd AI-Sandbox
   ```

3. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the `backend/` directory and add the following:
     ```env
     MONGO_URI=your-mongodb-uri
     JWT_SECRET=your-secret-key
     ```

5. Start the backend server:
   ```bash
   node server.js
   ```

6. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

7. Start the frontend application:
   ```bash
   npm run dev
   ```

---

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Register or log in to start using the platform.
3. Explore the Home, Compiler, and Profile sections.

---

## Contribution
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the changes to your fork:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request to the main repository.

---

## License
This project is licensed under the MIT License.

---

## Contact
- **Developer**: Adarsh Kumar
- **Email**: srivastavaadarsh084@gmail.com

