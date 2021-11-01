// Your code here
function createEmployeeRecord(employeeRecord) {
    const record = {
        firstName: employeeRecord[0],  
        familyName: employeeRecord[1],
        title: employeeRecord[2], 
        payPerHour: employeeRecord[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
    return record;
}

function createEmployeeRecords(employeeRecords) {
    return employeeRecords.map(record => createEmployeeRecord(record));
}


function createTimeInEvent(employeeRecord, timeStamp) {
    let timeStampInfo = {
        type: "TimeIn", 
        hour: parseInt(timeStamp.substring(11, 15)), 
        date: timeStamp.substring(0, 10)
    };

    employeeRecord.timeInEvents.push(timeStampInfo);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    let timeStampInfo = {
        type: "TimeOut", 
        hour: parseInt(timeStamp.substring(11, 15)), 
        date: timeStamp.substring(0, 10)
    };

    employeeRecord.timeOutEvents.push(timeStampInfo);
    return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, date) {
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        if(employeeRecord.timeInEvents[i].date === date) {
            //This is the date:
            return ((employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour)/100);
            break;
        }
    }
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return (hoursWorked * employeeRecord.payPerHour);
}

function allWagesFor(employeeRecord) {
    const allWages = [];
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        allWages.push(wagesEarnedOnDate(employeeRecord, employeeRecord.timeInEvents[i].date));
    }

    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    return allWages.reduce(reducer, 0);
}

function calculatePayroll(employeeRecords) {
    const totalPayrollAmount = [];
    
    for(let employee of employeeRecords) {
        totalPayrollAmount.push(allWagesFor(employee));
    }

    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    return totalPayrollAmount.reduce(reducer, 0);
}

const firstRecord = createEmployeeRecord(["Adam", "Lenter", "King", 25]);
const inStamp = "2021-10-12 1234";
const outStamp = "2021-10-12 1534";

const recordWithIn = createTimeInEvent(firstRecord, inStamp);
const recordWithOut = createTimeOutEvent(firstRecord, outStamp);

const inStamp2 = "2021-10-13 1234";
const outStamp2 = "2021-10-14 1834";

const recordWithIn2 = createTimeInEvent(firstRecord, inStamp2);
const recordWithOut2 = createTimeOutEvent(firstRecord, outStamp2);

console.log(allWagesFor(recordWithOut2));