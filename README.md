# Дипломный проект. API.

Бэкенд для дипломной работы.
Функциональность: signin, signup, сохраняет статью, удаляет статью, выводит все статьи.
Технологии: Express, MongoBD, валидация полей: Joi-Celebrate, логирование запросов выполнено через Winston.

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

### Configured two build modes:

**Production:**
`npm run start`

**Development:**
`npm run dev`
