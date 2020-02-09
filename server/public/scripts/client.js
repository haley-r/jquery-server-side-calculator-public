$(document).ready(onReady);

let selectedOperator;

function onReady(){
    //click listener on equals/calculate button
    $('#calculateButton').on('click', calculate);
    //click listener on clear button
    $('#clearButton').on('click', clearInputs);
    //click listener on operator buttons
    $('.operatorButton').on('click', assignOperator);
}

function assignOperator(){
    selectedOperator = $(this).text();
}

function calculate(){
    //make object from input values
    let userEntry = {
        firstNumber: $('#firstNumberIn').val(),
        operator: selectedOperator,
        secondNumber: $('#secondNumberIn').val(),
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
}//end calculate


function clearInputs(){
    $('#firstNumberIn').val('');
    $('#operatorIn').val('--operator--');
    $('#secondNumberIn').val('');
}

function updateDisplay(){
    console.log('in updateDisplay');
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
    }).catch(function(err) {
        alert('error posting results');
        console.log(err);
    })
}

function showMostRecent(anObject){
    let resultsDisplay = $('#resultsDisplay');
    resultsDisplay.empty();
    resultsDisplay.append(`<h2>${anObject.result}</h2>`);
}

function showHistory(array){
    let historyDisplay = $('#historyDisplayList');
    historyDisplay.empty();
    console.log('in showHistory', array);
    for (let i=array.length-1; i>=0; i--){
        result=array[i];
        historyDisplay.append(`
            <li>${result.firstNumber}${result.operator}${result.secondNumber}=${result.result}</li>
            `);
    }
}