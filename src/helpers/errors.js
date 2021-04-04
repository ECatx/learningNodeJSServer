import logger from './logger'

export const notFound = (req, res, next) => {
  const error = new Error(`Not Fount - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// eslint-disable-next-line no-unused-vars
export const errorController = (error, req, res, next) => {
  const statusCode = res.status === 200 ? 500 : res.statusCode
  logger.error(new Error(error.message))
  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🐈' : error.stack,
  })
}
