require('dotenv').config()

const express = require('express');
const sequelize = require('./public/db')
const models = require('./public/javascripts/models')
const taskRouter = require('./routes/task.routes')
const userRouter = require('./routes/user.routes')

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/api', taskRouter)
app.use('/api', userRouter)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}

start()