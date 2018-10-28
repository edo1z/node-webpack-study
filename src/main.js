const express = require('express')
const app = express()
const main = require('http').Server(app)
const calc = require('./calc')

let serverStatus = false
const start = () => {
  if (!serverStatus) {
    route(app)
    serverStatus = true
    main.listen(3000, () => console.log('listening on *:3000'))
    calc.start()
  }
}
const route = (app) => {
  app.use('/', express.static(__dirname + '/client'))
}
const stop = () => {
  if (serverStatus) {
    calc.stop()
    main.close()
    serverStatus = false
    console.log('server stopped')
  }
}

start()
