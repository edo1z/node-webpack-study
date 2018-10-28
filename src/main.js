const app = require('express')()
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
  const path = require('path');
  app.get('/', function(req, res){
    const filePath = path.join(__dirname, '/client/client.html')
    res.sendFile(filePath)
  });
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
