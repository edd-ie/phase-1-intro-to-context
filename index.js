// Your code here
function createEmployeeRecord (array){
    let employee = {
        firstName:array[0],
        familyName:array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employee;
}

function createEmployeeRecords(array){
    let records = []
    for (let i of array){
        records.push(createEmployeeRecord(i));
    }

    return records;
}

function createTimeInEvent(records, date){
    let hr = (date.split(' ')[1])
    let day = (date.split(' ')[0])
    
    records.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hr),
        date: day
    })

    return records;
}

function createTimeOutEvent(records, date){
    let hr = (date.split(' ')[1])
    let day = (date.split(' ')[0])

    records.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hr),
        date: day
    })

    return records;
}

function hoursWorkedOnDate(records, date){
    let day = (date.split(' ')[0])

    let startHour, endHour;
    
    let start = records.timeInEvents.find((time)=>{
        if(time.date == day){
            startHour = time.hour/100
            return startHour
        }
    })

    let end = records.timeOutEvents.find((time)=>{
        if(time.date == day){
            endHour = time.hour/100
            return endHour
        }
    })
    
    let elapsed = parseInt(endHour) - parseInt(startHour);

    return elapsed;
}


function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date)
    let rate = parseInt(record.payPerHour)

    return hours*rate;
}



function allWagesFor(record){
    let wage = 0
    let time = record.timeInEvents; //array of date

    for (let day of time){
        wage += wagesEarnedOnDate(record, day.date)
    }
    
    return wage;
}


function calculatePayroll (array){
    let payroll = 0
    for(let employee of array){
        let wage = 0
        let time = employee.timeInEvents; //array of date

        for (let day of time){
            wage += wagesEarnedOnDate(employee, day.date)
        }
        payroll += wage
    }

    return payroll;
}
