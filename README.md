# Дипломный проект. API.

REST API приложение для работы фронтенда. Бэкенд для дипломной работы.

Функциональность:

- signin,
- signup,
- сохранение статьи,
- удаление статьи,
- получение всех статей пользователя.

Технологии:

- JavaScript,
- Express,
- MongoBD,
- Joi-Celebrate - валидация полей,
- Winston - логирование запросов.

Ссылка на API [https://api.diploma-2020.ru/](https://api.diploma-2020.ru/)
Публичный IP-адрес сервера: 135.181.83.128

# В API реализовано 6 рутов:

возвращает информацию о пользователе (email и имя)

> GET /users/me

возвращает все сохранённые пользователем статьи

> GET /articles

создаёт статью с переданными в теле

> keyword, title, text, date, source, link и image
> POST /articles

удаляет сохранённую статью по \_id

> DELETE /articles/articleId

создаёт пользователя с переданными в теле

> email, password и name
> POST /signup

проверяет переданные в теле почту и пароль
и возвращает JWT

> POST /signin

### Dependencies:

`npm install`

### Установка зависимостей:

`npm install`

### 2 режима запуска:

```
npm run start
npm run dev
```
