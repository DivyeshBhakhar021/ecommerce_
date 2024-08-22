require('dotenv').config()

const express = require("express");
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongodb");
const cookieParser = require('cookie-parser')
const passport = require("passport");
const { facebookProvider, googleProvuder } = require("./utilse/Provider");
// const pdfmake = require("./utilse/pdfcrate");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
// const connectChat = require("./utilse/Socket");
const path = require('path');

const app = express();
// const swaggerDocument = YAML.load('./src/api.yaml')

googleProvuder();
facebookProvider();

const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));


app.use(
  '/api/docs',
  express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      url: '/public/api.yaml' // Path to your YAML file
    }
  })
);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
connectDB();
// // connectChat()

app.use(cors({   
    origin: 'http://localhost:3000',
    // origin: 'https://fruitables-umber.vercel.app',
    credentials: true
}))
app.use(require('express-session')({ secret: 'aaa$12', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1", routes);

app.use('/',(req,res)=>{
    res.send("hello world")
})




// pdfmake();


app.listen(5000, () => {
    console.log("server is running on port 5000");
})
