
// Get current EPOCH
Math.round(new Date().getTime() / 1000.0);

// Date to EPOCH
var myDate = new Date("July 1, 1978 02:30:00"); // Your timezone!
var myEpoch = myDate.getTime() / 1000.0;

// EPOCH to Date
var myDate = new Date("your epoch date" * 1000);