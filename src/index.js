const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.static('public'));
const server = http.createServer((req, res) => {
    
    const createPath = (page)=>path.resolve(__dirname, './views', page);//создаем путь к файлу с нужной страницей
    res.setHeader('Content-Type', 'text/html');

   switch (req.url){
        case '/': 
            res.statusCode = 200;
            res.write(fs.readFileSync(createPath('home.html'), 'utf8'));
            break;
        case '/about-me':
            res.statusCode = 200;
            res.write(fs.readFileSync(createPath('about-me.html'), 'utf8'));
            break;
        case '/data':
           
            
            fs.readFile(createPath('../const/data.json'), 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.write('Error reading file');
                    return res.end();
                };
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            });
           return
        case '/main':
            res.statusCode = 301;
            res.setHeader('Location', '/');
            res.end();
            break;
        default:
            res.statusCode = 404;
            res.write('Page not found');
    }
    res.end();
});

server.listen(PORT, (error) => {
    error ? console.error(error) : console.log(`Server is running on port ${PORT}`);
});