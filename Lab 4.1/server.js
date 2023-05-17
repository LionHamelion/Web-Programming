let http = require("http");
let https = require("https");
let fs = require("fs");
let path = require('path');
let url = require('url');
let attempts = 3
const args = process.argv.slice(2); //parse arguments from command line
const clients = [];
let port = args[0]; //port initialisation


http.createServer(function(request, response) {
	newUserCheck(request.connection.remoteAddress.split(':').pop());

  let parsedUrl = url.parse(request.url, true);

  if (parsedUrl.pathname === '/api') {
    // Отримуємо всі параметри з початку URL-запиту
    const params = parsedUrl.query;

    // Створюємо новий URL з виправленим хостом та шляхом до API
    const apiUrl = `https://api.sunrise-sunset.org/json?${new URLSearchParams(params)}`;

    // Функція для здійснення повторних запитів
    const makeRequest = (attempts) => {
      https.get(apiUrl, (apiResponse) => {
        let data = '';

        apiResponse.on('data', (chunk) => {
          data += chunk;
        });

        apiResponse.on('end', () => {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(data, 'utf-8');
        });
      }).on('error', (error) => {
        if (attempts < 3) {
          // Затримка 2 секунди перед повторним запитом
          setTimeout(() => {
            makeRequest(attempts + 1);
          }, 4000);
        } else {
          response.writeHead(500, { 'Content-Type': 'text/html' });
          response.end('<h1>500 Internal Server Error</h1>');
        }
      });
    };

    // Запускаємо перший запит
    makeRequest(1);

    return;
  }

	let filePath = '.' + request.url;
	if (filePath == './') {
		filePath = './index.html';
	} 
	else {
		filePath = './' + filePath;
	}
	const extname = path.extname(filePath);
	let contentType = 'text/html';
	switch (extname) {
	case '.js':
	  contentType = 'text/javascript';
	  break;
	case '.css':
	  contentType = 'text/css';
	  break;
	case '.png':
	  contentType = 'image/png';
	  break;
	}
	fs.readFile(filePath, function(error, content) {
	if (error) {
	  if (error.code == 'ENOENT') {
	    response.writeHead(404, { 'Content-Type': 'text/html' });
	    response.end('<h1>404 Not Found</h1>');
	  } else {
	    response.writeHead(500, { 'Content-Type': 'text/html' });
	    response.end('<h1>500 Internal Server Error</h1>');
	  }
	} else {
	  response.writeHead(200, { 'Content-Type': contentType });
	  response.end(content, 'utf-8');
	}
	});
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


function newUserCheck(ip){
	if (!clients.includes(ip)) { // check if the IP address is already in the array
    clients.push(ip); // add the new IP address to the array
    console.log(`New client connected from ${ip}`) // log the new IP address
	}
};

