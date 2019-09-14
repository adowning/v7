//In cloud/main.js
var cloudFunctions = require('./functions')

Parse.Cloud.define('registerUser', cloudFunctions.registerUser(Parse))
Parse.Cloud.beforeSave('employeeProfile', cloudFunctions.employeeProfile(Parse))
Parse.Cloud.define(
  'SMScheckEmployeeClockStatus',
  cloudFunctions.SMScheckEmployeeClockStatus(Parse)
)
Parse.Cloud.define('SMSclockInUser', cloudFunctions.SMSclockInUser(Parse))
Parse.Cloud.define('SMSclockOutUser', cloudFunctions.SMSclockOutUser(Parse))

