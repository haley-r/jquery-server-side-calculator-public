//requires
const express = require('express');
const bodyParser = require('body-parser');

const add=require('./modules/add');
const subtract=require('./modules/subtract');

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
    console.log('in/calculation GET');
    res.send(history);
})

app.post('/calculation', (req,res) => {
    console.log('in /calculation POST:', req.body);
    let input=req.body;
    let result= undefined;
    if (input.operator==='+'){result=add(input.firstNumber, input.secondNumber);}
    else if (input.operator === '-') {result =subtract(input.firstNumber, input.secondNumber); }
    else if (input.operator === 'x') {result =multiply(input.firstNumber, input.secondNumber); }
    else if (input.operator === '/') {result =divide(input.firstNumber, input.secondNumber); }
    let resultObject = {
        firstNumber: input.firstNumber,
        operator: input.operator,
        secondNumber: input.secondNumber,
        result: result
    };
    history.push(resultObject);
    console.log(history);
    
    res.sendStatus(200);
})

