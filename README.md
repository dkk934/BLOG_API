# BLOG API

This project is an Express.js REST API that interacts with a PostgreSQL database. The API allows for basic CRUD operations (Create, Read, Update, Delete) on a "home" table and other dynamically created tables that inherit from it.

## Table of Contents

- [API Endpoints](#api-endpoints)
  - [GET /posts/:table?](#get-poststable)
  - [GET /tables/all](#get-tablesall)
  - [GET /posts/:id](#get-postsid)
  - [POST /posts](#post-posts)
  - [PATCH /posts/:id](#patch-postsid)
  - [DELETE /posts/:id](#delete-postsid)
  - [POST /posts/data](#post-postsdata)
- [License](#license)


## Usage

The API provides endpoints for managing posts and database tables. Use the following endpoints to interact with the API.

## API Endpoints

### GET /posts/:table?

Fetches all posts from the specified table. If no table is specified, it defaults to the "home" table.

- **URL Params:**
  - `table` (optional) - The name of the table to fetch posts from.
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    [
      { 
        "id": 1, 
        "title": "Post title", 
        "content": "Post content", 
        "author": "Author", 
        "time": "2023-01-01T00:00:00.000Z" 
      },
      ...
    ]
    ```
- **Error Response:**
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    ```json
    { "error": "Error fetching posts" }
    ```

### GET /tables/all

Returns a list of all tables in the "public" schema.

- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    [
      { "table_name": "home" }, 
      { "table_name": "another_table" }, 
      ...
    ]
    ```
- **Error Response:**
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    ```json
    { "error": "Error fetching tables" }
    ```

### GET /posts/:id

Fetches a specific post by ID from the "home" table.

- **URL Params:**
  - `id` (required) - The ID of the post to fetch.
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    { 
      "id": 1, 
      "title": "Post title", 
      "content": "Post content", 
      "author": "Author", 
      "time": "2023-01-01T00:00:00.000Z" 
    }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** 
    ```json
    { "message": "Post not found" }
    ```
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    ```json
    { "error": "Error fetching post" }
    ```

### POST /posts

Creates a new post in the "home" table.

- **Request Body:**
  - `title` (string, required)
  - `content` (string, required)
  - `author` (string, required)
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    [
      { 
        "id": 1, 
        "title": "Post title", 
        "content": "Post content", 
        "author": "Author", 
        "time": "2023-01-01T00:00:00.000Z" 
      }
    ]
    ```
- **Error Response:**
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    ```json
    { "error": "Error creating post" }
    ```

### PATCH /posts/:id

Updates a specific post by ID in the "home" table. Only the fields provided in the request body will be updated.

- **URL Params:**
  - `id` (required) - The ID of the post to update.
- **Request Body:**
  - `title` (string, optional)
  - `content` (string, optional)
  - `author` (string, optional)
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    { 
      "id": 1, 
      "title": "Updated title", 
      "content": "Updated content", 
      "author": "Updated author", 
      "time": "2023-01-01T00:00:00.000Z" 
    }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** 
    ```json
    { "message": "Post not found" }
    ```
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    ```json
    { "error": "Error updating post" }
    ```

### DELETE /posts/:id

Deletes a specific post by ID from the "home" table.

- **URL Params:**
  - `id` (required) - The ID of the post to delete.
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    { "message": "Post deleted" }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** 
    ```json
    { "message": "Post not found" }
    ```
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    ```json
    { "error": "Error deleting post" }
    ```

### POST /posts/data

Creates a new table that inherits from the "home" table.

- **Request Body:**
  - `table` (string, required) - The name of the table to create.
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    { "message": "Table table_name created or already exists." }
    ```
- **Error Response:**
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    ```json
    { "error": "Error creating table" }
    ```

## Axios Usage Examples

### GET /posts/:table?

Fetch all posts from the specified table or from the "home" table by default.

```javascript
axios.get('/posts/home')
.then(response => {
 console.log(response.data);
})
.catch(error => {
 console.error("There was an error fetching the posts!", error);
});```

