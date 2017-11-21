const express = require('express');
const app = express(); // creates an instance of an express application
const router = require('./routes');
const volleyball = require('volleyball');

const bodyParser = require('body-parser');

const { newsKey, sumKey } = require('./keys');

console.log(newsKey, sumKey);

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Middleware
app.use(volleyball);

// Load CSS
app.use(express.static('public'));

// Routes
app.use(jsonParser);
app.use(urlencodedParser);
app.use(router);


app.listen(3000, () => {
  console.log('summaries.io server chillin on local host 3000');
});
