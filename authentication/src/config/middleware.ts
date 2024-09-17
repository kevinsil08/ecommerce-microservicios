import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:4321',
  'localhost:4321',
  '192.168.18.4'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    console.log('origin:', origin)
    if (acceptedOrigins.includes(origin??'')) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})