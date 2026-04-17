const express = require('express');
const app = express();
const port = 3020;
const postsRouter = require('./routers/posts.js');
const errorsHandler = require('./middlewares/errorsHandler.js');
const notFound = require("./middlewares/notFound.js");

app.get('/', (req, res) => {
    res.send('Server del mio blog');
})

app.use(express.static('public'));

app.use(express.json());

app.use('/posts', postsRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})