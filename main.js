

let monthData = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//Establishing current date

const date = new Date()
let currentYear = date.getFullYear()
let currentMonth = date.getMonth() + 1
let currentDay = date.getDate()

const dayInputEl = document.getElementById('dayInput')
const monthInputEl = document.getElementById('monthInput')
const yearInputEl = document.getElementById('yearInput')

const dayErrorEl = document.getElementById('dayError')
const monthErrorEl = document.getElementById('monthError')
const yearErrorEl = document.getElementById('yearError')

const dayLabel = document.querySelector('.day')
const monthLabel = document.querySelector('.month')
const yearLabel = document.querySelector('.year')

const dayResultEl = document.getElementById('day-result')
const monthResultEl = document.getElementById('month-result')
const yearResultEl = document.getElementById('year-result')

const buttonEL = document.getElementById('button')

buttonEL.addEventListener('click', calculateAge)


//This function establishes if the entered year is a leap year.
function checkLeapYear(){
    if (yearInputEl.value % 4 == 0 && yearInputEl.value % 100 != 0) {
       return true
    } else if ( yearInputEl.value % 400 == 0) {
        return true
    } else {
        return false
    }
}

//this applies error styling if any input throws an error
function errorStyleApplier(){
    dayErrorEl.style.display = 'block'
    dayInputEl.style.border = '1px solid hsla(0, 100%, 67%, 1)'
    dayLabel.style.color = 'hsla(0, 100%, 67%, 1)'

    monthErrorEl.style.display = 'block'
    monthInputEl.style.border = '1px solid hsla(0, 100%, 67%, 1)'
    monthLabel.style.color = 'hsla(0, 100%, 67%, 1)'
    
    yearErrorEl.style.display = 'block'
    yearInputEl.style.border = '1px solid hsla(0, 100%, 67%, 1)'
    yearLabel.style.color = 'hsla(0, 100%, 67%, 1)'

} 
//if no input errors occur this applies standard styling 
function defaultStyleApplier(){

    dayInputEl.style.border = 'var(--line) 1px solid'
    dayLabel.style.color = 'var(--grey)'
    dayErrorEl.style.display = 'none'

    monthInputEl.style.border = 'var(--line) 1px solid'
    monthLabel.style.color = 'var(--grey)'
    monthErrorEl.style.display = 'none'

    yearInputEl.style.border = 'var(--line) 1px solid'
    yearLabel.style.color = 'var(--grey)'
    yearErrorEl.style.display = 'none'
}


function calculateAge () {

//This if statement checks if the year entered is a leap year and sets the days for February accordingly (ie 28 or 29)
    if (checkLeapYear()) {
        monthData.splice(1,1)
        monthData.splice(1, 0, 29)
    } else {
        monthData.splice(1,1)
        monthData.splice(1, 0, 28)
    }

//Establishing input date

let enteredDay = dayInputEl.value
let enteredMonth = monthInputEl.value
let enteredYear = yearInputEl.value

//Reset current dates to ensure accurate results and to save having a third set of date variables

currentYear = date.getFullYear()
currentMonth = date.getMonth() + 1
currentDay = date.getDate()


// If the input day is less than current day js adds the current months worth of days (ensuring we compensate for zero index). We then remove a month.

    if (enteredDay > currentDay) {
        currentDay = currentDay + monthData[currentMonth - 1];
        currentMonth = currentMonth - 1;
    }

//If the input month is less than current month js adds 12 months to current month so that we can minus the entered months to calculate the result - we then remove one year (the 12 months we moved over)

    if (enteredMonth > currentMonth) {
        currentMonth = currentMonth + 12;
        currentYear = currentYear - 1;
    }

//With the figures adjusted above we can simply remove the entered date values from the actual date values

let resultD = currentDay - enteredDay
let resultM = currentMonth - enteredMonth
let resultY = currentYear - enteredYear

//Error checking


    checkDateEntered()

//update DOM
if (checkDateEntered()) {
    dayResultEl.textContent = resultD
    monthResultEl.textContent = resultM
    yearResultEl.textContent = resultY
} else {
    dayResultEl.textContent = "- -"
    monthResultEl.textContent = "- -"
    yearResultEl.textContent = resultY = "- -"
}
}



function checkDateEntered(){

    //variables to help identify if theres an error in any of the inputs

let dayCorrect = true
let monthCorrect = true
let yearCorrect = true

    //day error handling

    //if no value is entered it registers an error and shows the error message and contextual message
    if (!dayInputEl.value) {
        dayErrorEl.textContent = 'This field is required'
        dayCorrect = false
    } else {
    //otherwise it applies default styles
        dayErrorEl.textContent = ''
        defaultStyleApplier()
    }
    
    if (dayInputEl.value > monthData[monthInputEl.value -1] || dayInputEl.value > 31) {
        dayErrorEl.textContent = 'Must be a valid day'
        dayCorrect = false
    } 

    //month error handling

    if (!monthInputEl.value) {
        monthErrorEl.textContent = 'This field is required'
        monthCorrect = false
    } else {
        monthErrorEl.textContent = ''
        defaultStyleApplier()
    }

    if (monthInputEl.value > 12) {
        monthErrorEl.textContent = 'Must be a valid month'
        monthCorrect = false
    }

    //year error handling

    if (!yearInputEl.value) {
        yearErrorEl.textContent = 'This field is required'
        yearCorrect = false
    } else {
        yearErrorEl.textContent = ''
        defaultStyleApplier()
    }
    
    if (yearInputEl.value > currentYear) {
        yearErrorEl.textContent = 'Must be in the past'
        yearCorrect = false
    }

    if (!dayCorrect || !monthCorrect || !yearCorrect) {
        errorStyleApplier()
        return false
    } else {
        return true
    }
}




