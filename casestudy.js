// A list of our parameters as variables
let price = 25;
let driverPay = 21;
let newDrivers = 10;
let driverCAC = 500;
let matchRate = .8;
let churnRate = .18;
let newCustomers = 30;
let customerCAC = 15;

// Monthly gross revenue will change each month | Creates an array
let monthlyGross = [];

// Monthly net revenue will change each month | Creates an array
let monthlyNet = [];

// Active users will change each month | Creates an array and sets a value for the first month
let activeRiders = [];
let month1 = 3000;
activeRiders.push(month1);

// Operating expenses will change each month | Creates an array
let opEx = [];

// For loop iterates each month of customer loss and gross revenue over 12 months
for (let i = 1; i < 13; i++) {
    // totalRiders represents the number of riders requesting rides each month
    let totalRiders = activeRiders[i-1];

    // noRide represents the customers experiencing an "Failed to find driver" event
    // No ride customers = (Active customers - (Active customers * Match rate))
    let noRide = (totalRiders - (totalRiders * matchRate));

    // customerLoss represents customers who leave the app each month
    // Customer loss = No ride customers * (Churn rate) - New customers
    let customerLoss = ((noRide.toFixed(0) * churnRate) - newCustomers);

    // Represents the updated customer base, takes into account customer loss
    let updatedTotalRiders = totalRiders.toFixed(0) - customerLoss.toFixed(0);

    // Completed rides per month = (Ride requests per month * Match rate)
    let completedRides = totalRiders.toFixed(0) * matchRate;

    // Gross revenue generated = (Completed rides per month) * (price per ride)
    let grossRevenue = (completedRides) * price;

    // Driver expenses = (Driver payout * Completed rides per month)
    let driverExpenses = driverPay * completedRides;

    // Driver acquisition costs = (Driver CAC * New drivers per month)
    let driverAcq = driverCAC * newDrivers;

    // Customer acquisition costs = (Customer CAC * Newly acquired customers per month)
    let customerAcq = customerCAC * newCustomers;

    // Operating expenses = (Driver expenses + Driver acquisition costs + Customer acquisition costs)
    let monthEx = (driverExpenses + driverAcq + customerAcq);

    let netRevenue = grossRevenue - monthEx;
    
    opEx.push(monthEx);
    activeRiders.push(updatedTotalRiders);
    monthlyGross.push(grossRevenue);
    monthlyNet.push(netRevenue);
}
// Round our answers to whole numbers
activeRiders = activeRiders.map(function(each_element) {
    return Number(each_element.toFixed(0));
});
monthlyGross = monthlyGross.map(function(each_element) {
    return Number(each_element.toFixed(0));
});
opEx = opEx.map(function(each_element) {
    return Number(each_element.toFixed(0));
});
monthlyNet = monthlyNet.map(function(each_element) {
    return Number(each_element.toFixed(0));
});

// Remove the 13th month from our activeRiders array
activeRiders.splice(-1);

// Display our results
console.table(activeRiders);
console.table(monthlyGross);
console.table(opEx);
console.table(monthlyNet);