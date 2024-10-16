export const dateRangeToArray = (first_day, last_day) => {

    let date_array = [];

    var current_day = new Date(first_day);
    var end_day = new Date(last_day);

    // Iterate through date and add to array through end date
    while (current_day <= end_day) {
        // push after date change to account zero index of day in calendar
        current_day.setDate(current_day.getDate() + 1);
        date_array.push(current_day.toDateString());
    }
    return date_array;
};


export const getUnavailableDates = (blockedData, bookedData) => {
    
    // Set variables
    // var blockedDates = [];
    var unavailableDates = [];
    // var fullBookingRange = [];
    
    // check that bookedRanges is not empty
    blockedData.forEach((blockedItem) => {
        let date = new Date(blockedItem.date);
        unavailableDates = unavailableDates.concat(date.toDateString());
    })

    // populate unavailable dates from bookings
    bookedData.forEach(booking => {
        // console.log(booking.arrival_date, booking.departure_date);
        unavailableDates = unavailableDates.concat(dateRangeToArray(booking.arrival_date, booking.departure_date));
    })

    return unavailableDates;
}