Create your configuration file `.env`

```yaml
#For client
VITE_PORT=3000

#For server
WEATHER_SERVER_HOST=localhost
WEATHER_SERVER_PORT=5000

ACCESS_SECRET=access_secret
REFRESH_SECRET=refresh_secret
ACCESS_TOKEN_TIME=15m
REFRESH_TOKEN_TIME=60d

SALT_ROUNDS=9
CLIENT_URL=http://localhost:3000

#For database
DB_USER=postgres
DB_PASS=root
DB_NAME=weatherdb
DB_DIALECT=postgres
```

# API Documentation

## Overview

This API provides authentication and user management functionalities.

## Base URL

http://localhost:3000/api/auth

## Authentication Endpoints

### 1. User Registration

- **URL:** `/registration`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - **201 Created**
    - **Description:** User registered successfully.
    - **Response Body:**
      ```json
      {
        "user": {
          "id": 1,
          "email": "john@example.com"
        }
      }
      ```
  - **400 Bad Request**
    - **Description:** User already exists.

---

### 2. User Login

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - **200 OK**
    - **Description:** User logged in successfully.
    - **Response Body:**
      ```json
      {
        "accessToken": "access_token_value",
        "refreshToken": "refresh_token_value",
        "user": {
          "id": 1,
          "email": "john@example.com"
        }
      }
      ```
  - **401 Unauthorized**
    - **Description:** Invalid email or password.

---

### 3. User Logout

- **URL:** `/logout`
- **Method:** `POST`
- **Description:** Logs out the current user.
- **Cookies:** `refreshToken` (set in the login response)
- **Responses:**
  - **204 No Content**
    - **Description:** User logged out successfully.
  - **401 Unauthorized**
    - **Description:** No refresh token provided.

---

### 4. Refresh Access Token

- **URL:** `/refresh`
- **Method:** `POST`
- **Description:** Refreshes the access token using a valid refresh token.
- **Cookies:** `refreshToken`
- **Responses:**
  - **200 OK**
    - **Description:** Access token refreshed successfully.
    - **Response Body:**
      ```json
      {
        "accessToken": "new_access_token_value",
        "refreshToken": "new_refresh_token_value",
        "user": {
          "id": 1,
          "email": "john@example.com"
        }
      }
      ```
  - **401 Unauthorized**
    - **Description:** Invalid refresh token.

---

## User Management Endpoints

### 5. Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Retrieves all users.
- **Responses:**
  - **200 OK**
    - **Description:** List of users.
    - **Response Body:**
      ```json
        [
          {
            "id": 1,
            "email": "john@example.com",
            "fullName": "John Doe"
          },
          {
            "id": 2,
            "email": "jane@example.com",
            "fullName": "Jane Doe"
          }
        ]
      ```

- **401 Unauthorized**
  - **Description:** No users found.

---

### 6. Get User by ID

- **URL:** `/users/:id`
- **Method:** `GET`
- **Description:** Retrieves a user by their ID.
- **Parameters:**
  - `id` (path parameter)
- **Responses:**
  - **200 OK**
    - **Description:** User found.
    - **Response Body:**
      ```json
      {
        "id": 1,
        "email": "john@example.com",
        "fullName": "John Doe"
      }
      ```
  - **401 Unauthorized**
    - **Description:** User not found.

---

### 7. Update User

- **URL:** `/users`
- **Method:** `PUT`
- **Description:** Updates user information.
- **Request Body:**
  ```json
  {
    "id": 1,
    "fullName": "John Doe Updated",
    "email": "john_updated@example.com",
    "password": "newpassword123"
  }
  ```
- **Responses:**
  - **201 Created**
    - **Description:** User updated successfully.
    - **Response Body:**
      ```json
      {
        "user": {
          "id": 1,
          "email": "john_updated@example.com"
        }
      }
      ```
  - **400 Bad Request**
    - **Description:** User not found or email already in use.

---

### 8. Delete User

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Description:** Deletes a user by their ID.
- **Parameters:**
  - `id` (path parameter)
- **Responses:**
  - **204 No Content**
    - **Description:** User deleted successfully.
  - **401 Unauthorized**
    - **Description:** User not found.
