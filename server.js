const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port,() => { 
    console.log(`Application started in ${process.env.NODE_ENV} mode, PORT ${port}`);
}); 

    

