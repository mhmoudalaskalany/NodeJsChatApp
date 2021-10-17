import express from 'express';

const server = express();
const port = 3000;
server.get('/', (req, res) => {
    res.send('Hello From Chat Server');
})



server.listen(port, "localhost" , () => {
    console.log('server is listening on port 3000');
    
});
