$(document).ready(onReady);

let selectedOperator='';
let firstNumberEntry='';
let secondNumberEntry='';
let currentNumberEntry='';
let calculationComplete=false;
let lastAnswer='';

function onReady(){
    //show history, if there is any
    updateDisplayOnLoad();
    //but not the calculator display, that should be clear
    //click listener on equals/calculate button
    $('#calculateButton').on('click', calculate);
    //click listener on clear button
    $('#clearButton').on('click', clearInputs);
    //click listener on operator buttons
    $('.operatorButton').on('click', operatorEntry);
    //click listener on number/decimal buttons
    $('.numberButton').on('click', numberEntry)
}

function operatorEntry(){
    //if there's something in the display and user selects an operator,
    //assume they want the last answer to be first number
    if (calculationComplete == true) {
        $('#calcDisplay').empty();
        $('#calcDisplay').append(lastAnswer);
        firstNumberEntry = lastAnswer;
        calculationComplete = false;
        }
    //if neither first number or operater has been assigned, firstNumber
    //is whatever has been entered so far
    else if (firstNumberEntry==='' && selectedOperator===''){
        firstNumberEntry = currentNumberEntry;
    }
    //if operator has already been clicked, remove previous from display
    //and don't change firstNumber value
    else if (selectedOperator != ''){
        $('#calcDisplay').empty();
        $('#calcDisplay').append(`${firstNumberEntry}`);
         }//end else
    currentNumberEntry= '',
    selectedOperator = $(this).text();
    $('#calcDisplay').append($(this).text());
}

function numberEntry(){
    //if there's something in the display and user starts entry,
    //clear display and set calculationComplete to false
    if (calculationComplete == true){
        $('#calcDisplay').empty();
        calculationComplete = false;
    }
    $('#calcDisplay').append($(this).text());
    currentNumberEntry+=$(this).text();
}

function calculate(){
    //only run if all values are assigned
    if (firstNumberEntry!='' && currentNumberEntry!='' && selectedOperator!=''){
    //make object from input values
    secondNumberEntry = currentNumberEntry;
    let userEntry = {
        firstNumber: firstNumberEntry,
        operator: selectedOperator,
        secondNumber: secondNumberEntry,
    }
    //clear inputs
    clearInputs();
    //post request to server js, send input object
    $.ajax({
        type: 'POST',
        url: '/calculation',
        data: userEntry
    }).then( function (response) {
        console.log('back from POST:', response);
        //update display(answer and history)
        updateDisplay();
    }).catch(function (err) {
        console.log(err);
        alert('error with calculating result');
    })
}//end if
else {
    alert('Missing information, cannot calculate!');
}
}//end calculate (POST)

function clearInputs(){
    $('#calcDisplay').empty();
    selectedOperator = '';
    firstNumberEntry = '';
    secondNumberEntry = '';
    currentNumberEntry = '';
    calculationComplete = false;
}//end clearInputs

//These functions are triggered by calculate, after GET request is fulfilled
function updateDisplay(){
    //make get request for answer + history
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then(function(response) {
        console.log('back from GET:', response);
        //clear DOM
        let historyList = response;
        let latestResult = historyList[historyList.length-1];
        //append most recent results to DOM
        showMostRecent(latestResult);
        //update history on DOM
        showHistory(historyList);
        //set calculationComplete to true
        calculationComplete=true;
    }).catch(function(err) {
        alert('error posting results');
        console.log(err);
    })
}//end updateDisplay (GET)
function showMostRecent(anObject){
    let resultsDisplay = $('#calcDisplay');
    resultsDisplay.empty();
    if (anObject.result==undefined){
        lastAnswer = '',
        resultsDisplay.append(`ERR`);
    }
    else {
        lastAnswer=anObject.result;
        //if it's long only display seven digits
        if (lastAnswer.toString().length>7){resultsDisplay.append(`${lastAnswer.toFixed(7)}`);} 
        //otherwise display whatever it is
        else {resultsDisplay.append(`${lastAnswer}`);}
    }
}//end showMostRecent
function showHistory(array){
    let historyDisplay = $('#historyDisplayList');
    historyDisplay.empty();
    for (let i=array.length-1; i>=0; i--){
        result=array[i];
        historyDisplay.append(`
            <li>${result.firstNumber}${result.operator}${result.secondNumber}=${result.result}</li>
            `);
    }
}//end showHistory
function updateDisplayOnLoad() {
    //make get request for answer + history
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then(function (response) {
        console.log('back from GET:', response);
        //clear DOM
        let historyList = response;
        //clear the entry area
        $('#calcDisplay').empty();
        //update history on DOM
        showHistory(historyList);
        calculationComplete = true;
    }).catch(function (err) {
        alert('error posting results');
        console.log(err);
    })};