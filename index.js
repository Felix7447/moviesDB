const express = require('express')
const corsOptions = require('./middlewares/cors.middleware.js')
const { routerAPI } = require('./routes/index.js')

const init = controller => {
  const app = express()
  app.disable('x-powered-by')
  app.use(corsOptions())
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello there')
  })

  routerAPI({ app, controller })

  const PORT = process.env.SERVER_PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`Listening server on http://localhost:${PORT}`)
  })
}

module.exports = init
