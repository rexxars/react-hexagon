/* eslint-disable no-console, no-process-env */
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.demo')

const port = process.env.PORT || 3000
const app = express()
const compiler = webpack(config)

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(hotMiddleware(compiler))

app.use('/', express.static(__dirname))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log(`Listening at http://localhost:${port}`)
})
