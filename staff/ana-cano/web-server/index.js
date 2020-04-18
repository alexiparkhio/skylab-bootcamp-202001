// const http = require ('http')
// const fs = require ('fs')
// const log = require ('./logger')

// const {argv: [, , port = 8080]} = process

// const requestListener = (req, res) => {

//   const path = req.url

//   const rs = fs.createReadStream(`.${path === '/' ? '/index.html' : path}`)
  
//     if(path !== 'favicon.ico'){
//       rs.on('data', body => {
//       res.end(body);

//       log.info(`request from ${req.connection.remoteAddress}`)
//       console.log(req)
//     })
//       rs.on('error', error => {
//       log.error(error)
//       res.writeHead(404)
//       res.end('NOT FOUND')

//     })
//   }else{
//       log.error(error)
//       res.writeHead(404)
//       res.end('NOT FOUND')
//   }

//   req.on('error', error =>{
//       log.error(error)
//       res.writeHead(404)
//       res.end('NOT FOUND')
//   })
// }

// log.info('starting server')

// const server = http.createServer(requestListener);
// server.listen(port);


const express = require ('express')
const path = require('path')

const app = express()

app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname 'public')))

const {argv: [, , port = 8080]} = process

app.get('/', (req, res) => {
  res.pipe(response))
})

app.listen(port);
