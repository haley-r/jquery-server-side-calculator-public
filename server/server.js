//requires
const express = require('express');
const bodyParser = require('body-parser');

//uses
const app = express();
let history=[];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

//globals
const port=5000;

//start server
app.listen(port,() => {
    console.log( 'server up on:', port );
})

app.get('/calculation', (req, res) => {
    console.log('in/calculation GET:');
    res.send(history);
})

app.post('/calculation', (req,res) => {
    console.log('in /calculation POST:', req.body);
    res.sendStatus(200);
})