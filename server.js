const handler = require('serve-handler')
const http = require('http')

const server = http.createServer((request, response) => {
  console.log(request.method, request.url)
  if (request.method === 'GET' && request.url === '/protected/secret') {
    console.log(request.headers)
    if (request.headers.authorization === 'Bearer XYZ123') {
      console.log('authorized, returning secret')
      response.writeHead(200, { 'content-type': 'application/json' })
      response.end(JSON.stringify({ secret: 'abc909' }))
    } else {
      console.log('returning 404')
      response.statusCode = 404
      response.end()
    }
    return
  }

  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response, {
    public: './public',
  })
})

server.listen(5000, () => {
  console.log('Running at http://localhost:5000')
})
