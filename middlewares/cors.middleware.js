import cors from 'cors'

const whitelist = ['http://127.0.0.1:5500']

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('CORS Error...'))
    }
  }
}

const corsOptions = () => cors(options)

export default corsOptions
