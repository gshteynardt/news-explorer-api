const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles.js');

const {
  validationDataArticle,
  idArticleValidation,
} = require('../middlewares/validation');

router.get('/articles', getArticles);
router.post('/articles', validationDataArticle, createArticle);
router.delete('/articles/:articleId', idArticleValidation ,deleteArticle);

module.exports = router;
