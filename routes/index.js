const express = require("express");
const router = express.Router();
const axios = require("axios");
const { newsKey, sumKey } = require("../keys");

router.post("/summary/", function(req, res, next) {
  const { newsSource } = req.body;
  const newsUrl =
    `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${newsKey}`;

  let articles = [];

  return axios
    .get(newsUrl)
    .then(response => {
        articles = response.data.articles.map( async (article) => {
          const sumsObj = await axios.get(
              `http://api.smmry.com/&SM_API_KEY=${sumKey}&&SM_LENGTH=2&SM_URL=${article.url}`
            )
          const updatedArticle = Object.assign({}, article, {
            summary: sumsObj.data.sm_api_message
          })
          return updatedArticle
        });
        // console.log(Promise.resolve(promArr[0]))
        // console.log(articles)
        return Promise.all(articles);
    })
    .then(data => {
      // console.log('data', data)
      res.json(data);
    })
    .catch(console.error);
});

module.exports = router;
