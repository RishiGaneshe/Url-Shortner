# 🌐 URL Shortener Website

## Overview
A **scalable URL shortener** web application that provides a fast and efficient way to shorten URLs. The website uses a secure **user authentication system**  by **JWT tokens**, along with **Redis** for caching frequently accessed URLs and for **JWT token invalidation**. The backend is built on **Express.js**, and the data is stored in a **MongoDB** database. The frontend is developed using **HTML**, **CSS**, and **JavaScript**.

## Features 🚀

- **User Authentication**: 🔒 Secure login and registration using JWT.
- **URL Shortening**: Shorten long URLs into user-friendly and manageable links.
- **Scalability**: Designed for growth, ensuring fast API responses even with an increase in users  by using redis caching.
- **Redis Caching**: 🚀 Frequently accessed URLs are cached in Redis to provide blazing fast response times.
- **Token Invalidation**: Session handling with Redis, which stores and invalidates JWT tokens on logout.
- **MongoDB**: Persistent storage of shortened URLs and user data.
- **Fast and Reliable**: The API is optimized for quick responses, leveraging caching and efficient database interactions.

## Tech Stack 💻

### Backend:
- **Express.js**: Lightweight web framework for handling API routes.
- **JWT**: JSON Web Tokens for secure user authentication and session management.
- **MongoDB**: NoSQL database for storing URLs and user data.
- **Redis**: Used for caching frequently accessed URLs and invalidating JWT tokens during logout.

### Frontend:
- **HTML5**: For structuring the webpage.
- **CSS3**: For styling the website with responsive design.
- **JavaScript**: For frontend interactivity and form validations.

## Architecture 🏗️
![architecture-diagram](https://example.com/architecture-diagram.png) _
1. **Client Requests**: User sends requests from the frontend (HTML, CSS, JS) after login.
2. **Authentication**: User login is verified using JWT. Redis handles the session storage.
3. **Caching Layer**: Frequently accessed URLs are stored in Redis to avoid database lookups.
4. **Database Storage**: MongoDB stores the original and shortened URLs along with user information.
5. **Scalability**: The system is built to scale efficiently as the number of users grows, utilizing Redis caching and token management for faster response times.

## Installation ⚙️

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/url-shortener.git
    ```
2. **Install dependencies**:
    ```bash
    cd url-shortener
    npm install
    ```
3. **Set environment variables**:
    Create a `.env` file and add the following:
    ```bash
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    REDIS_URL=<your-redis-url>
    PORT=3000
    ```

4. **Start the application**:
    ```bash
    npm start
    ```

## API Endpoints 🔗

| Method | Endpoint            | Description                   | Authentication |
|--------|---------------------|-------------------------------|-----------------|
| POST   | `/sign-up`          | Create a new user account     | ❌              |
| POST   | `/login`            | Log in to the system          | ❌              |
| POST   | `/url/logout`       | Log out from the system       | ✅              |
| POST   | `/url/shorten`      | Shorten a new URL             | ✅              |
| GET    | `/url/:shortUrl`    | Redirect to the original URL  | ❌              |

---

Made with ❤️ by [Abhishek Ganeshe](https://github.com/RishiGaneshe)

 
