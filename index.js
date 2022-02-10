const fs = require("fs");
const initialData = fs.readFileSync("dates.json");
const data = JSON.parse(initialData);

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

let orderedDates = [];

data.sort(sortOrder("date"));
for (let item in data) {
  orderedDates.push(data[item].date);
}

firstDate = new Date(orderedDates[0]); //2019-03-01
lastDate = new Date(orderedDates[orderedDates.length - 1]); //2020-08-31

const differenceInDays =
  1 + (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24); //550

const averageGapInDays = differenceInDays / orderedDates.length; //0.5505505505505506

const endOfLastDate = lastDate.getTime() + 1000 * 60 * 60 * 23 - 1;

const formatDate = (date) => {
  return date.toISOString().substring(0, 10);
};

const prediction = new Date(
  endOfLastDate + averageGapInDays * 1000 * 60 * 60 * 24
); //2020-09-01T12:12:47.566Z
console.log(formatDate(prediction));

let predictedDates = [];
for (let i = 1; i < 51; i++) {
  let calculateNextPrediction = new Date(
    endOfLastDate + averageGapInDays * 1000 * 60 * 60 * 24 * i
  );
  predictedDates.push(formatDate(calculateNextPrediction));
}

let predictionData = JSON.stringify(predictedDates);
fs.writeFileSync("predicted-dates.json", predictionData);
