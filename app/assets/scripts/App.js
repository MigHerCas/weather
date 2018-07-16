import ApiCall from './modules/ApiCall';
import Test from './modules/Test';

var apiCall = new ApiCall();
console.log(apiCall);

var test = new Test();

apiCall.call();
test.greet();