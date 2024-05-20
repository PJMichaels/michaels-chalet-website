const dateRangeToArray = (first_day, last_day) => {

    let date_array = [];

    var current_day = new Date(first_day);
    var end_day = new Date(last_day);

    // Iterate through date and add to array through end date
    while (current_day <= end_day) {
        date_array.push(current_day.toDateString());
        current_day.setDate(current_day.getDate() + 1);
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
        console.log(booking.arrival_date, booking.departure_date);
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



// const provisionedAPI = [
//     {
//         "id": 1,
//         "reason": "test",
//         "start_date": "2024-05-11",
//         "end_date": "2024-05-13"
//     },
//     {
//         "id": 2,
//         "reason": "test",
//         "start_date": "2024-05-20",
//         "end_date": "2024-05-22"
//     }
// ];

// const bookedAPI = [];

// console.log(getDates(provisionedAPI, bookedAPI));


export default getAvailableDates;