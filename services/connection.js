const mongoose = require('mongoose');
const {createClient}= require('@redis/client')


const redisURL='redis://172.22.138.48:6379'


exports.connectToMongoDB=async (mongoURL)=>{
          return mongoose.connect(mongoURL);
}

exports.redisClient= createClient({
         'url':redisURL
})




