# Kanban
Kanban is an application to manage your task list like Trello. This app has :<br>
* RESTful endpoint for task's CRUD operation
* JSON formatted response

| URL               | Method        |
| -------------     |:-------------:|
| /register         | POST          |
| /login            | POST          |
| /googleSign       | POST          |
| /task             | POST          |
| /task             | GET           |
| /task/:id         | GET           |
| /task/:id         | PUT           |
| /task/:id         | DELETE        |

<br>

## RESTful endpoints
### POST /register
> Register new account

_Request Body_
```json
{
    "email": "<your email>",
    "password": "<your password>",
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>",
  "organization": "Hacktiv8"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Email can't be empty, Email already exist, Password must be between 7 & 20 characters"
}
```
_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal server error"
}
```
---
### POST /login
> Login using user account

_Request Body_
```json
{
    "email": "<your email>",
    "password": "<your password>",
}
```
_Response (200 - Ok)_
```
{
    "id": <given id by system>,
    "email": "<posted email>",
    "token": "<your token>"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Email/Password not match"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Email not found"
}
```
_Response(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### POST /googleSign
> Login with google account

_Request Body_
```
{
    "id_token": "<token from google>"
}
```
_Response (200 - Ok)_
```
{
    "id": <given id by system>,
    "email": "<posted email>",
    "token": "<your token>"
}
```
_Response(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### POST /task
> Create new task

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Request Body_
```json
{
    "title": "task title",
    "description": "task description",
    "category": "task category",
    "due_date": "2020-06-18"
}
```
_Response (201 - Created)_
```json
{
    "id": 1,
    "title": "task title",
    "description": "task description",
    "category": "task category",
    "due_date": "2020-07-11T00:00:00.000Z",
    "UserId": 1 ,
    "updatedAt": "2020-06-17T16:38:51.584Z",
    "createdAt": "2020-06-17T16:38:51.584Z"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Tittle can't be empty, Date must be greater than today"
}
```
_Response(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### GET /task
> Show all task

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - Ok)_
```json
[
    {
        "id": 1,
        "title": "task title",
        "description": "task description",
        "status": false,
        "due_date": "2020-06-18",
        "UserId": 1,
        "createdAt": "2020-06-13T09:20:35.951Z",
        "updatedAt": "2020-06-13T09:20:35.951Z"
    },
    {
        "id": 2,
        "title": "task 2",
        "description": "task description 2",
        "status": false,
        "due_date": "2020-06-18",
        "UserId": 1,
        "createdAt": "2020-06-13T09:20:35.951Z",
        "updatedAt": "2020-06-13T09:20:35.951Z"
    }
]
```
_Response(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### GET /task/:id
> Show task based on ID

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "task title",
    "description": "task description",
    "due_date": "2020-06-18",
    "UserId": 1,
    "updatedAt": "2020-06-13T09:20:35.951Z",
    "createdAt": "2020-06-13T09:20:35.951Z",
    "status": false
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Todo with id <search id> not found"
}
```
_Re sponse(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### PUT /task/:id
> Edit task based on ID

_Request Params_
```json
{
    "id": "<your id>"
}
```
_Request Header_
```json
{
    "token": "<your token>"
}
```
_Request Body_
```json
{
    "title": "task title 2",
    "description": "task description 2",
    "due_date": "2020-06-19"
}
```
_Response (201 - Updated)_
```json
{
    "title": "task title 2",
    "description": "task description 2",
    "category": "update category",
    "due_date": "2020-06-19"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Title can't be empty, Date must be greater than today"
}
```
_Response(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### DELETE /task/:id
> Delete task based on ID

_Request Params_
```json
{
    "id": "<your id>"
}
```
_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - oK)_
```json
{
    "message": "task successfully deleted"
}
```
_Response(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```