const router = require('express').Router();

const { auth } = require('../middlewares/auth');

const routerUsers = require('./router-users.js');
const routerArticles = require('./router-articles.js');
const routerSignInUp = require('./router-signin-signup.js');
const routerErr = require('../middlewares/router-err.js');

router.use('/', routerSignInUp);
router.use(auth);
router.use('/', routerUsers);
router.use('/', routerArticles);
router.use(routerErr);

module.exports = router;
