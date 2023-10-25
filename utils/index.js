import express from 'express'
import corsOptions from './middlewares/cors.middleware.js'
import { routerAPI } from './routes/index.js'

const app = express()

app.disable('x-powered-by')
app.use(corsOptions())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello there')
})

routerAPI(app)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Listening server on http://localhost:${PORT}`)
})
