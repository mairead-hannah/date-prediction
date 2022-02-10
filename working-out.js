//Code with accompanying notes.
//Please see index.js for the final version


const fs = require("fs");
const initialData = fs.readFileSync("dates.json");
const data = JSON.parse(initialData);

//Put the dates in order from first to last
function sortOrder(date) {
  return function (a, b) {
    if (a[date] > b[date]) {
      return 1;
    } else if (a[date] < b[date]) {
      return -1;
    }
    return 0;
  };
}

//Create a new array of the ordered dates
let orderedDates = [];

data.sort(sortOrder("date"));
for (let item in data) {
  orderedDates.push(data[item].date);
}

//Total number of payments
const totalNumberDates = orderedDates.length; //999

//Which dates were the first and last payments made on?
firstDate = new Date(orderedDates[0]); //2019-03-01
lastDate = new Date(orderedDates[totalNumberDates - 1]); //2020-08-31

//How many days do the payments span in total?
const differenceInTime = lastDate.getTime() - firstDate.getTime();
const differenceInDays = 1 + differenceInTime / (1000 * 60 * 60 * 24); //550

//This shows us the average gap between payment in days
const averageGapInDays = differenceInDays / totalNumberDates; //0.5505505505505506

//Calculating the the end of the last payment date in ms since unix epoch,
//to exclude this date from the prediction going forward
const endOfLastDate = lastDate.getTime() + 1000 * 60 * 60 * 23 - 1;

//function to format the date
const formatDate = (date) => {
  return date.toISOString().substring(0, 10);
};

//Prediction
//The next payment will be 0.56 days after the most recent one
//which is 2020-09-01
const prediction = new Date(
  endOfLastDate + averageGapInDays * 1000 * 60 * 60 * 24
); //2020-09-01T12:12:47.566Z
//
console.log(formatDate(prediction))

//Predicting the next 50 payment dates
let predictedDates = [];
for (let i = 1; i < 51; i++) {
  let calculateNextPrediction = new Date(
    endOfLastDate + averageGapInDays * 1000 * 60 * 60 * 24 * i
  );
  predictedDates.push(formatDate(calculateNextPrediction));
}

//Write to a new JSON file
let predictionData = JSON.stringify(predictedDates);
fs.writeFileSync('predicted-dates.json', predictionData)
