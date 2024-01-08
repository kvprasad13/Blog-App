const express = require('express');
const process = require('dotenv').config();
const articlesRouter = require('./routers/articleRouters.js');
const accountsRouter = require('./routers/accountsRouter.js');
const userFieldsRouter = require('./routers/userFieldsRouter.js');
const errorHandler = require('./middleware/errorHandler.js');

const { connectDb } = require('./config/dbConnection.js');
const cors = require('cors');
connectDb();

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

app.use('/api/articles/', articlesRouter);
app.use('/api/accounts/', accountsRouter);
app.use('/api/userFields/', userFieldsRouter);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`listening on port ${port} `);
});
