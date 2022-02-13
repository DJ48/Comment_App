
const express = require('express');
const apiRouter = require('./routes/api/v1/index');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use('/api/v1', apiRouter);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

