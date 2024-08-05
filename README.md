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
    
- **Axios Usage Examples:**
    ```javascript
          axios.get('/posts/home')
          .then(response => {
           console.log(response.data);
          })
          .catch(error => {
           console.error("There was an error fetching the posts!", error);
          });
    ```

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
#
### GET /tables/all

Returns a list of all tables in the "public" schema.
- **Axios Usage Examples:**
    ```javascript
        axios.get('/tables/all')
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the tables!", error);
          });
    ```

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
#
### GET /posts/:id

Fetches a specific post by ID from the "home" table.

- **URL Params:**
  - `id` (required) - The ID of the post to fetch.

- **Axios Usage Examples:**
    ```javascript
       axios.get('/posts/1')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the post!", error);
      });
    ```

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
#
### POST /posts

Creates a new post in the "home" table.

- **Request Body:**
  - `title` (string, required)
  - `content` (string, required)
  - `author` (string, required)
 
- **Axios Usage Examples:**
    ```javascript
        axios.post('/posts', {
            title: 'New Post Title',
            content: 'This is the content of the new post.',
            author: 'Author Name'
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error("There was an error creating the post!", error);
          });
    ```

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
#
### PATCH /posts/:id

Updates a specific post by ID in the "home" table. Only the fields provided in the request body will be updated.

- **URL Params:**
  - `id` (required) - The ID of the post to update.
- **Request Body:**
  - `title` (string, optional)
  - `content` (string, optional)
  - `author` (string, optional)

 - **Axios Usage Examples:**
    ```javascript
        axios.patch('/posts/1', {
            title: 'Updated Post Title',
            content: 'This is the updated content of the post.'
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error("There was an error updating the post!", error);
          });
    ```

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
#
### DELETE /posts/:id

Deletes a specific post by ID from the "home" table.

- **URL Params:**
  - `id` (required) - The ID of the post to delete.
- **Axios Usage Examples:**
    ```javascript
        axios.delete('/posts/1')
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.error("There was an error deleting the post!", error);
              });
    ```

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
#
### POST /posts/data

Creates a new table that inherits from the "home" table.

- **Request Body:**
  - `table` (string, required) - The name of the table to create.
 
- **Axios Usage Examples:**
    ```javascript
        axios.post('/posts/data', {
            table: 'new_table_name'
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error("There was an error creating the table!", error);
          });
    ```

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
#
### Contributing
 Feel free to submit issues and pull requests. Contributions are welcome!
#
### License
This project is licensed under the MIT License - see the LICENSE file for details.
