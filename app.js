#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

function turnOff() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2500); //will turn off after 2.5 sec
    });
}
async function display() {
    let title = chalkAnimation.rainbow('Maaz Calculator'); //rainbow animation
    await turnOff(); //will run for the specified time
    let secondTitle = chalkAnimation.neon('Lets Start Calculation'); //another title 
    await turnOff();
    secondTitle.stop(); //stop the animation
}
function Addition(numb1, numb2) {
    console.log(chalk.bgBlue(`${numb1} + ${numb2} = ${numb1 + numb2}`)); /*the result will be highlighted with blue
    color*/
}
function Subtraction(numb1, numb2) {
    console.log(chalk.bgBlue(`${numb1} - ${numb2} = ${numb1 - numb2}`));
}
function Multiplication(numb1, numb2) {
    console.log(chalk.bgBlue(`${numb1} * ${numb2} = ${numb1 * numb2}`));
}
function Division(numb1, numb2) {
    console.log(chalk.bgBlue(`${numb1} / ${numb2} = ${numb1 / numb2}`));
}
async function Operation() {
    const operation = await inquirer.
        prompt([{
            name: 'operator',
            type: "list",
            message: 'What operation do you want to perform? \n',
            choices: ['Addition', 'Subtraction', 'Multiplication', 'Division'] //options to choose from
        },
        {
            name: 'numb1',
            type: 'number',
            message: 'Enter first number: '
        },
        {
            name: 'numb2',
            type: 'number',
            message: 'Enter second number: '
        }]);
    if (isNaN(operation.numb1) || isNaN(operation.numb2)) { /*function to check if an input is NaN. If not Nan, we
    will move to calculation*/
        if (isNaN(operation.numb1) && isNaN(operation.numb2)) { //if both numbers are NaN
            console.log(chalk.bgRed(`Both numbers are invalid. Please enter number.`));
        }
        else if (isNaN(operation.numb1)) { //if only first number is NaN
            console.log(chalk.bgRed(`First number is invalid. Please enter number.`));
        }
        else if (isNaN(operation.numb2)) { //if only second number is NaN
            console.log(chalk.bgRed(`Second numbers is invalid. Please enter a number.`));
        }
    }
    else {
        switch (operation.operator) { //switching on the basis of what is choosen by the user
            case 'Addition': //if addition is selected
                Addition(operation.numb1, operation.numb2); //perform addition operation
                break; //go out of the loop
            case 'Subtraction':
                Subtraction(operation.numb1, operation.numb2); //perform subtraction operation
                break;
            case 'Multiplication': //perform multipication operation
                Multiplication(operation.numb1, operation.numb2);
                break;
            case 'Division': //perform division operation
                Division(operation.numb1, operation.numb2);
                break;
        }
    }
}
;
async function doingAgain() {
    do { //To do the following code at least once
        await Operation(); //calling the operation function (operation is performed first)
        var repeat = await inquirer.prompt({
            name: 'choice',
            type: 'rawlist',
            message: 'Do you want to do another calculation? Select your choice: ',
            choices: ['Yes', 'No']
        });
    } while (repeat.choice == 'Yes'); //continue taking input from user as long as the user select Yes
}
await display(); //calling the display function. Dont move ahead if the display function is not complete
doingAgain(); //calling the doingAgain function
