const Express = require('express');
const GraphHTTP = require('express-graphql');
const schema = require('./schema');
const path = require("path");

// Config
const APP_PORT = 3000;

// Start
const app = Express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

// GraphQL
app.use('/graphql', GraphHTTP({
  schema,
  pretty: true,
  graphiql: true
}));

app.listen(APP_PORT, ()=> {
  console.log(`App listening on port ${APP_PORT}`);
});
