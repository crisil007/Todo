const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")


const mongoConnect = require("./db/connect")
mongoConnect()

const todoRouter = require('./router/todoRouter')

app.use(cors()); 
app.use(express.urlencoded({extended : true}));
app.use(express.json({limit : "7mb"}));
app.use(todoRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });