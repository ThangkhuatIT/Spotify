import Config from './config'
import connectDB from './config/database'
import errorHandlingMiddleware from './middlewares/error-handler.middleware'
import express, { Express, json } from 'express'
import route from './routes/'
import cors from "cors";
import { corsOptions } from './utils/cors'

const app: Express = express()

app.use(cors(corsOptions))

// Connect to MongoDB
const mongoURI = Config.MONGO_URI
connectDB(mongoURI)

// Tạo Redis client
// const client = redis.createClient({
//   socket:{
//     host:"redis-13953.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com",
//     port:13953,
//   },
//   username:"default",
//   password:"RQAwhM21ZA9FuXIC9xdndms4dEuLrzbu",
// });

// // Kết nối tới Redis
// client.connect()
//   .then(() => {
//     console.log('Connected to Redis Cloud');
//   })
//   .catch(err => {
//     console.error('Error connecting to Redis', err);
//   });
const port = Config.PORT || 3002
// Express configuration
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(route)
app.use(errorHandlingMiddleware)

app.listen(port, () => {
  console.log(` Spotify is running on port ${port}`)
})
