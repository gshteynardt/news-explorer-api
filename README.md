# News

### Teхнологии

* node.js
* Express
* Mongoose
* RestApi
* JWT
* celebrate

### Installation

# Backend
требуется [Node.js](https://nodejs.org/) v12+ to run.

Запуск проекта и запуск проекта с hot-reload.

```sh
$ npm install
$ npm run start
$ npm run dev
```

# Routes and methods:
Api доступно по https://api.shteyn.students.nomoredomains.monster

* post: '/signup' - регистрация

  body: {
  
    email: required,
  
    password: required, min5,
  
    name: min(2), max(30), string,
  
  }


* post: '/signin' - авторизация

  body: {
  
  email: required, 
  
  password: required, min5, string,
  
  }


* post: '/articles' - создать статью

  body: {

  keyword: required, string,

  title: required, string,

  text: required, string,

  date: required, string,

  source: required, string,

  image: required, url,

  link: required, url

  }


* get: '/users/me' - получить одного пользователя

  headers:
  
  Content-Type: application/json,
  
  Authorization: Bearer access_token


* get:'/articles/{:articleId}' - получить одну статью

  headers:
  
  Content-Type: application/json,
  
  Authorization: Bearer access_token


* delete:'/articles/{:articleId}' - удалить одну статью

  headers:
  
  Content-Type: application/json,
  
  Authorization: Bearer access_token
  
