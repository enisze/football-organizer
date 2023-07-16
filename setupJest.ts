// import '@testing-library/jest-dom/extend-expect'
import dotenv from 'dotenv'

// const dotenv = require('dotenv')

// order does matter. The first one has precedence.
try {
  dotenv.config({
    path: require.resolve('./.env.local'),
  })
} catch (error) {
  // file does not exist in staging environment
}
dotenv.config({
  path: require.resolve('./.env'),
})
