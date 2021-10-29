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
    let allEmployeeRecords = [];

    for(record of employeeRecords) {
        allEmployeeRecords.push(createEmployeeRecord(record));
    }

return allEmployeeRecords;
}


const firstRecord = ["Adam", "Lenter", "King", 25];
const secondRecord = ["Jamie", "Lenter", "Queen", 100];
const ourRecords = [firstRecord, secondRecord];
console.log(createEmployeeRecords(ourRecords));