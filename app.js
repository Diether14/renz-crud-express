const app = require('express')();
const port = 3000;
const user_router = require('./routers/user-router.js');
var bodyParser = require("body-parser");

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/api', user_router);