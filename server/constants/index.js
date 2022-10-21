const ORIGIN = '*'
const PORT = process.env.PORT || 8080

const PRICE1 = -1
const PRICE2 = 0.01
const PRICE3 = 0.02

// for "atlas" edit MONGO_URI in -> .env file || for "community server" edit <MyDatabase>
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MyDatabase'
const MONGO_OPTIONS = {}

const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'

module.exports = {
  ORIGIN,
  PORT,
  MONGO_URI,
  MONGO_OPTIONS,
  JWT_SECRET,
  PRICE1,
  PRICE2,
  PRICE3,
}
