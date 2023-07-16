import dotenv from 'dotenv'

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
