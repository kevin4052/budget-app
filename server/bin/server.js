const http = require('http');
const { type } = require('os');
const app = require('../index');

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
