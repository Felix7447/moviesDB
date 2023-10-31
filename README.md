
# Movies DB

This is a simple Node.js REST API created using the Express framework. It provides basic CRUD operations for a database of movies.



## Prerequisites

To use this API, you will need:

- Node.js installed
- Create mysql or postgresql DB just in case you don't want to use the local json
## Installation

To use this API, you will need:

- Clone this repository to your local machine.
- Install the dependencies: `npm install`
- Start the API: `npm run start`

The API will be running on port `3000` by default. You can change this by setting the PORT environment variable.
    
## API Reference

To use the API, you can send HTTP requests to the `/api/v1/movies` endpoint. The following requests are supported:

### Get all movies

```http
  GET /api/v1/movies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `genre` | `string` | **Filter by genre:** `movies?genre=${genre}` |

### Get movie by id

```http
  GET /api/v1/movies/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movie to fetch |

### Post movie

```http
  POST /api/v1/movies/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Content-type`      | `application/json` | **Required**. Content type |
| `title`      | `string` | **Required**. Movie title |
| `year`      | `int` | **Required**. Release year |
| `director`      | `string` | **Required**. Movie director |
| `duration`      | `int` | **Required**. Movie duration in minutes |
| `poster`      | `link` | **Required**. Movie poster image |
| `genre`      | `string[]` | **Required**. Movie genres (one or more) |
| `rate`      | `number` | **Optional**. Movie rate |

#### Genre must be: [ Action | Drama | Crime | Adventure | Sci-fi | Romance ]

### Update movie

```http
  PATCH /api/v1/movies/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movie to edit |
| `Content-type`      | `application/json` | **Required**. Content type |
| `title`      | `string` | **Optional**. Movie title |
| `year`      | `int` | **Optional**. Release year |
| `director`      | `string` | **Optional**. Movie director |
| `duration`      | `int` | **Optional**. Movie duration in minutes |
| `poster`      | `link` | **Optional**. Movie poster image |
| `genre`      | `string[]` | **Optional**. Movie genres (one or more) |
| `rate`      | `number` | **Optional**. Movie rate |

### Delete movie

```http
  DELETE /api/v1/movies/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movie to delete |



## Usage/Examples

### Get movies
```http
GET http://localhost:3000/api/v1/movies
```

### Get by genre
```http
GET http://localhost:3000/api/v1/movies?genre=drama
```
### Get by id
```http
GET http://localhost:3000/api/v1/movies/be7d1f95-ca35-4520-9b67-f84f0cb44679
```
### Post movie
```http
POST http://localhost:3000/api/v1/movies
Content-Type: application/json

{
  "title": "The Felix Movie",
  "year": 2022,
  "director": "Felix Reyna",
  "duration": 140,
  "poster": "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg",
  "genre": [
    "Action",
    "Crime",
    "Drama"
  ],
  "rate": 9
}
```
### Update movies
```http
PATCH  http://localhost:3000/api/v1/movies/be7d1f95-ca35-4520-9b67-f84f0cb44679
Content-Type: application/json

{
  "title": "The Felix Movie",
  "genre": [
    "Drama",
    "Crime"
  ]
}
```
### Delete movie
```http
DELETE  http://localhost:3000/api/v1/movies/4ace07c3-d7ea-4601-b460-1738810551a7
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT`: Server port where app will be running

`HOST`: DB Host

`PORT`: DB Port

`USER`: DB user

`PASSWORD`: DB Password

`DATABASE`:  DB name


## Support

If you have any questions or problems using this API, please open an issue on GitHub.

