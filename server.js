/**
 * Created by thavisha.lokuge on 2018-04-22.
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// BodyParser is a middleware that allows us to receive request parameters
// It populates the request's query parameters from the URL
app.use(bodyParser.urlencoded({extended: true}));
// And the request's body parameters with POST params
app.use(bodyParser.json());

app.use('/api/auth', require('./src/routes/auth'));

const server = app.listen(5000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(server.address());
  console.log('Listening at http://%s:%s', host, port);
});

module.exports = app;
