
// file to be deleted
var aDate = "2024-06-01";

function incrementDateByOne(date) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toDateString();
  }

console.log(incrementDateByOne(aDate));
// console.log(newDate);

