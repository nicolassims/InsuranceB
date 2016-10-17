/**
 * @author Sims, Nicolas (sableye.nico@gmail.com)
 * @version 0.0.1
 * @summary River Falls Homes Construction Company. || created: 09.22.2016
 * @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let policyNum, birthYear, birthMonth, birthDay, premiumDueDate, numAccidents, customerAge, agePrice,
    monthlyInsurancePremium, continueInt;
let lastName, firstName;

function main() {
    if (continueInt == 1 || continueInt == null) {
        setPolicyNum();
        setLastName();
        setFirstName();
        setBirthYear();
        setBirthMonth();
        setBirthDay();
        setPremiumDueDate();
        setNumAccidents();
        setCustomerAge();
        setAgePrice();
        setMonthlyInsurancePremium();
        printClosingRemark();
        setContinueInt();
        return main();
    }
    printGoodbye();
}

main();

function setPolicyNum() {
    policyNum = Math.floor((Math.random() * 1000) + 1);
}

function setLastName() {
    lastName = PROMPT.question('Please enter your last name.\n>');
}

function setFirstName() {
    firstName = PROMPT.question('Please enter your first name.\n>');
}

function setBirthYear() {
    birthYear = PROMPT.question('Please enter your birth year.\n>');
    while (birthYear <= 1906 || birthYear >= 2000 || isNaN(birthYear) == true) {
        if (birthYear <= 1906 || birthYear >= 2000) {
            birthYear = PROMPT.question('You are either too young or too old to drive.\n' +
                'Please enter a different birth year.\n>');
        } else {
            birthYear = PROMPT.question('That is not a number.\n' +
            'Please enter your birth year.\n>');
        }

    }
}

function setBirthMonth() {
    birthMonth = PROMPT.question('Please enter your birth month.\n>');
    while (birthMonth <= 1 || birthMonth >= 12 || isNaN(birthMonth) == true) {
        if (birthMonth <= 1 || birthMonth >= 12) {
            birthMonth = PROMPT.question('Uh, want to re-do that?\n' +
                'Please enter your birth month.\n>');
        } else {
            birthMonth = PROMPT.question('That is not a number.\n' +
                'Please enter your birth month.\n>');
        }

    }
}

function setBirthDay() {
    birthDay = PROMPT.question('Please enter your birth date.\n>');
    if (birthMonth == 2) {
        while (birthDay <= 1 || birthDay >= 28 || isNaN(birthDay) == true) {
            if (birthDay <= 1 || birthDay >= 28) {
                birthDay = PROMPT.question('Uh, want to re-do that?\n' +
                    'Please enter your birth date.\n>');
            } else if (birthDay == 29) {
                birthDay = PROMPT.question('You don\'t exist, subhuman.\n' +
                    'Please enter the 28th as your birth date.\n>');
            } else {
                birthDay = PROMPT.question('That is not a number.\n' +
                'Please enter your birth date.\n>');
            }
        }
    } else if (birthMonth == 1 || birthMonth == 3 || birthMonth == 5 || birthMonth == 7 || birthMonth == 8 || birthMonth == 10 || birthMonth == 12) {
        while (birthDay <= 1 || birthDay >= 31 || isNaN(birthDay) == true) {
            if (birthDay <= 1 || birthDay >= 31) {
                birthDay = PROMPT.question('Uh, want to re-do that?\n' +
                    'Please enter your birth date.\n>');
            } else {
                birthDay = PROMPT.question('That is not a number.\n' +
                    'Please enter your birth date.\n>');
            }
        }
    } else {
        while (birthDay <= 1 || birthDay >= 30 || isNaN(birthDay) == true) {
            if (birthDay <= 1 || birthDay >= 30) {
                birthDay = PROMPT.question('Uh, want to re-do that?\n' +
                    'Please enter your birth date.\n>');
            } else {
                birthDay = PROMPT.question('That is not a number.\n' +
                    'Please enter your birth date.\n>');
            }
        }
    }
}

function setPremiumDueDate() {
    premiumDueDate = PROMPT.question('Please enter the date your premium will be due in the YYYY-MM-DD format.\n>');
    let premiumDate = Date.parse(premiumDueDate);
    while (isNaN(premiumDate) == true || premiumDate <= Date.now()) {
        if (isNaN(premiumDate) == true) {
            premiumDueDate = PROMPT.question('Incorrect formatting.\n' +
                'Please enter the date your premium will be due in the YYYY-MM-DD format.\n>');
        } else if (premiumDate <= Date.now()) {
            premiumDueDate = PROMPT.question('Your premium was not due in the past--it doesn\'t exist yet.\n' +
                'Please enter the date your premium will be due in the YYYY-MM-DD format.\n>');
        }
        premiumDate = Date.parse(premiumDueDate);
    }
}

function setNumAccidents() {
    numAccidents = PROMPT.question('How many accidents have you been at fault for in the past three years?\n>');
}

function setCustomerAge() {
    let birthDate = birthYear + '-' + birthMonth + '-' + birthDay;
    customerAge = Date.now() - Date.parse(birthDate);
}

function setAgePrice() {
    const SIXTYFIVEYEARS = 2051201880000, FORTYFIVEYEARS = 1420062840000, THIRTYYEARS = 946708560000,
        FIFTEENYEARS = 473354280000, AGE15TO30PRICE = 20, AGE30TO45PRICE = 10, AGE60PLUSPRICE = 30;
    if (customerAge > FIFTEENYEARS && customerAge < THIRTYYEARS) {
        agePrice = AGE15TO30PRICE;
    } else if (customerAge >= THIRTYYEARS && customerAge < FORTYFIVEYEARS) {
        agePrice = AGE30TO45PRICE;
    } else if (customerAge >= SIXTYFIVEYEARS) {
        agePrice = AGE60PLUSPRICE;
    } else {
        agePrice = 0;
    }
}

function setMonthlyInsurancePremium() {
    const BASEPRICE = 100,  ACCIDENTPRICE = 50;
    monthlyInsurancePremium = Number(BASEPRICE + agePrice + numAccidents * ACCIDENTPRICE);
}

function printClosingRemark() {
    console.log('Thank you for using this terminal, ' + firstName + ' ' + lastName +'.\nYour total price is $'
        + monthlyInsurancePremium + ', and your policy number is #' + policyNum + '.\nYour premium will be due on ' +
        premiumDueDate + '.');
}

function setContinueInt() {
    continueInt = PROMPT.question('Please enter a \'1\' if you want to continue using this program.\n' +
        'If not, enter anything else.\n>');
}

function printGoodbye() {
    console.log('Goodbye, and have a nice day.');
}