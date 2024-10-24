const express = require('express')
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser= require('cookie-parser')
const Userroute= require('./routes/user.js')
const URLroute = require ('./routes/url.js')
const {connectToMongoDB, redisClient} = require('./services/connection.js')
const { restrictToLogInJWT}= require('./middlewares/auth.js')



const app = express();
const PORT = 3000;
const mongoURL='mongodb://localhost:27017/urlShortner'


connectToMongoDB(mongoURL).then(()=>{console.log("mongoDB connected")}) 
redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis(){
    try{
        await redisClient.connect();
        console.log("Redis Connected")
    }catch(err){
        console.log(err)
    }
}
connectRedis();



app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:false}))
app.use(bodyParser.urlencoded({extended:false}))



app.use("/url",restrictToLogInJWT,URLroute)

// app.use("/url",URLroute)

app.use("/",Userroute)


app.listen(PORT,()=>{console.log(`Server Started on PORT ${PORT}`)})


