const { Command } = require('commander');
const http = require('http');
const fs = require('fs');
const path = require('path');

const program = new Command();


program
  .requiredOption('-h, --host <type>', 'server address required') 
  .requiredOption('-p, --port <type>', 'server port required')   
  .requiredOption('-c, --cache <type>', 'cache directory path required') 
program.parse();
const options = program.opts();

// Створення директорії кешу
try {
  if (!fs.existsSync(options.cache)) {
    fs.mkdirSync(options.cache, { recursive: true });
    console.log(`Cache directory created: ${options.cache}`);
  }
} catch (error) {
  console.error(`Error creating cache directory: ${error.message}`);
  process.exit(1);
}

// HTTP сервер з використанням --host та --port
const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Web server is working. Host: ' + options.host + ', Port: ' + options.port + ', Cache: ' + options.cache);
});

// server.listen() з параметрами --host, --port
server.listen(options.port, options.host, function()  {
  console.log(`Server running at http://${options.host}:${options.port}`);
  console.log(`Cache directory: ${options.cache}`);
});

// Обробка помилок сервера
server.on('error', (error) => {
  console.error('Server error:', error.message);
  process.exit(1);
});