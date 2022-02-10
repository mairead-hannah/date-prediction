## Questions and Answers

# Describe the method you used to predict the next date and why you chose it?
I put all the dates into order to work out how many payments there were in total over what period of time as well as the final payment date. I then did a simple calculation to work out the average gap between payments over the entire period.  I added this time gap onto the the final payment date in order to predict the next payment date. I assumed a good starting point would be the very end of the last day.
I chose this method for it's simplicity and ease of calculation.


# What strategy would you use to implement a more accurate date prediction mechanism and what estimate would you give in terms of implementation effort required?
I noticed that the payment date gaps change over time.  They are further apart initially, and by the last date they become much more frequent.  The method I used assumes the behaviour remains similar, which isn't the case here.
The day of the week and the date of the month could make a difference to how likely a payment is on that particular day.
Perhaps a weighted moving average calculation would be suitable.


# How would you test the accuracy of date prediction?
I would find several examples of payment date data covering the same length of time of 550 days. Taking the first 500 days, I would use the model to predict the next 50 days, which I would then compare to the original actual data set, to see how closely they match the final 50 days.





# Date Prediction Coding Exercise

## Overview

Please find provided a CSV file containing observed dates for monthly direct debits and standing orders.

Each series of dates has its own series identifier and the date each transaction in the series was observed.

Your task is to predict the next date of the series taking into account the following:

- The simplest solution is preferred, even if it is not the most accurate. Although these two criteria, simplicity and accuracy, need to be balanced.
- No assessment of accuracy needs to be provided, a reasoned argument can be presented when answering the questions below.
- We program in a functional style and the use of RamdaJS is encouraged as we use the library extensively <https://ramdajs.com/docs/>. Some RamdaJS methods we commonly use are compose, groupBy, map, reduce, aperture and mapAccum amongst others. Sometimes we use a mix of functional and imperative style so do not feel the need to make everything functional, especially if it is at the expense of readability. However, consider immutability a key principle that should be upheld where possible, i.e. avoid reassigning identifiers or mutating objects.
- Results should be produced in CSV or JSON format.
- The exercise should take no more than an hour and reflects the day to day work conducted by the Data Team so hopefully should be fun.
