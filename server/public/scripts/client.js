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
    console.log("in clear");
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
        //append to DOM
    }).catch(function(err) {
        alert('error posting results');
        console.log(err);
    })
}