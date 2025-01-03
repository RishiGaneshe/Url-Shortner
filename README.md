# 🌐 URL Shortener Website
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


## Overview
A **scalable URL shortener** web application that provides a fast and efficient way to shorten URLs. The website uses a secure **user authentication system**  by **JWT tokens**, along with **Redis** for caching frequently accessed URLs and for **JWT token invalidation**. The backend is built on **Express.js**, and the data is stored in a **MongoDB** database. The frontend is developed using **HTML**, **CSS**, and **JavaScript**.
- **[Visit Url-Shortner](https://url.studentshub.fun)** - 'A scaleble tool for link shortning.'.

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
![architecture-diagram](https://drive.google.com/uc?id=1Jfd6pfxXSxzyX0Tp88Rp8seh2xjJMp1C)
1. **Client Requests**: User sends requests from the frontend (HTML, CSS, JS) after login.
2. **Authentication**: User login is verified using JWT. Redis handles the session storage.
3. **Caching Layer**: Frequently accessed URLs are stored in Redis to avoid database lookups.
4. **Database Storage**: MongoDB stores the original and shortened URLs along with user information.
5. **Scalability**: The system is built to scale efficiently as the number of users grows, utilizing Redis caching and token management for faster response times.

## Installation ⚙️

1. **Clone the repository**:
    ```bash
    git clone https://github.com/RishiGaneshe/url-shortener.git
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

---

Made by [Abhishek Ganeshe](https://github.com/RishiGaneshe)

 
