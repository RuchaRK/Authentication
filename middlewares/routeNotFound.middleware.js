const routeNotFound = (_, res) => {
  res.status(404).json({
    success: false,
    message: "Invalid Eoutes"
  })
}

module.exports = routeNotFound