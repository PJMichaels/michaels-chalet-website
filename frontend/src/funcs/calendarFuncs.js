const dateRangeToArray = (first_day, last_day) => {

    let date_array = [];

    var current_day = new Date(first_day);
    var end_day = new Date(last_day);

    // // test adding one date to offset calendar zero index
    // current_day = current_day.getDate() + 1;
    // end_day = end_day.getDate() + 1;

    // Iterate through date and add to array through end date
    while (current_day <= end_day) {
        // push after date change to account zero index of day in calendar
        current_day.setDate(current_day.getDate() + 1);
        date_array.push(current_day.toDateString());
    }
    return date_array;
};

const removePastDates = (dateArray, days_into_future = 0) => {

    // const today = new Date();
    // today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for comparison
    const earliestBookingDate = new Date();
    earliestBookingDate.setDate(earliestBookingDate.getDate() + days_into_future); // Set to 2 days from now
    earliestBookingDate.setHours(0, 0, 0, 0); // Normalize to midnight for comparison


    return dateArray.filter(date => {
        const compareDate = new Date(date);
        return compareDate > earliestBookingDate;
    });
};


const getAvailableDates = (provisionedRanges, bookedRanges, minDaysOut) => {
    
    // Set variables
    var bookedDates = [];
    var provisionedDates = [];
    var availableDates = [];
    
    // check that bookedRanges is not empty

    // populate areadyBookedDates array with all date strings converted from ranges
    bookedRanges.forEach(booking => {
        // console.log(booking.arrival_date, booking.departure_date);
        bookedDates = bookedDates.concat(dateRangeToArray(booking.arrival_date, booking.departure_date));
    })
    

    // check that provisionedRanges is not empty

    provisionedRanges.forEach(provisioned => {
        provisionedDates = provisionedDates.concat(dateRangeToArray(provisioned.start_date, provisioned.end_date));
    })

    provisionedDates.forEach((date) => {
        if (!bookedDates.includes(date)) {
            availableDates.push(date);
        }
    })

    availableDates = removePastDates(availableDates, minDaysOut);

    return availableDates;
        
}


const getProvisionedDates = (provisionedRanges, bookedRanges) => {
    
    // Set variables
    var bookedDates = [];
    var provisionedDates = [];
    
    // check that bookedRanges is not empty

    // populate areadyBookedDates array with all date strings converted from ranges
    bookedRanges.forEach(booking => {
        // console.log(booking.arrival_date, booking.departure_date);
        bookedDates = bookedDates.concat(dateRangeToArray(booking.arrival_date, booking.departure_date));
    })
    

    // check that provisionedRanges is not empty

    provisionedRanges.forEach(provisioned => {
        provisionedDates = provisionedDates.concat(dateRangeToArray(provisioned.start_date, provisioned.end_date));
    })

    return bookedDates, provisionedDates;
        
}

export {getAvailableDates, dateRangeToArray};