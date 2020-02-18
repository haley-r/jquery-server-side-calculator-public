jQuery Server Side Calculator
===

This is a calculator app which uses jQuery to pull inputs from the DOM and display answers, server-side logic to do basic calculations from user inputs, ajax to communicate between client and server.

## Technologies Used

- jQuery
- SQL
- Node
- Express
- HTML/CSS

## Setup

Run npm init/npm install to get body-parser and express (body-parser is included in express)

## What it does:

Similar to a handheld simple calculator, users can enter combinations of numbers and operators. If not all required inputs are given, user is alerted before calculation goes through. If the inputs are not numbers (such as an entry with two decimal places), calculator will display ('ERR'). If no first number is given, calculator will assume the last answer is the first number. A history of calculations is displayed on the DOM that persists through browser refreshes but clears when the server is restarted.


