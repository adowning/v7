//In cloud/main.js

var cloudFunctions = require('./functions')

/* It's necessary to insert the Parse Instance in our code,
because at local context not is referenced.*/

Parse.Cloud.define('registerUser', cloudFunctions.registerUser(Parse))

Parse.Cloud.beforeSave('employeeProfile', cloudFunctions.employeeProfile(Parse))

Parse.Cloud.define(
  'SMScheckEmployeeClockStatus',
  cloudFunctions.SMScheckEmployeeClockStatus(Parse)
)

Parse.Cloud.define('SMSclockInUser', cloudFunctions.SMSclockInUser(Parse))

Parse.Cloud.define('SMSclockOutUser', cloudFunctions.SMSclockOutUser(Parse))

// Parse.Cloud.define("createTodoForUser", (request, response) => {
//     if (!request.user) {
//         response.error("Unathorized");
//         return;
//     }
//     const Todo = Parse.Object.extend("Todo");
//     const todo = new Todo();
//     todo.set("author", request.user);
//     todo.set("title", request.params.title);
//     todo.set("finished", false);
//     todo.save(null, {
//         useMasterKey: true,
//         success(result) {
//             response.success(result);
//         },
//         error(error) {
//             response.error(
//                 "Error while creating todo " +
//                     error.code +
//                     " - " +
//                     error.description
//             );
//         }
//     });
// });

// async function getLastTimecard(user){
//   const Timecards = Parse.Object.extend("Timecard");
//   const query = new Parse.Query(Timecards);
//   query.equalTo("objectId", user.objectId);
//   query.ascending("clockIn")
//   return await query.first()
// }

// async function getUserByPhone(phone){
//     const Users = Parse.Object.extend("User");
//     const query = new Parse.Query(Users);
//     query.equalTo("cellPhone", phone);
//     return await query.first()
//   }

// Parse.Cloud.define("hookTest", (request, response) => {
//     console.log(request)
//     response.success('done');
// })

// Parse.Cloud.define("SMScheckEmployeeClockStatus", (request, response) => {
//     console.log(request)
//     const employee = await getUserByPhone(request.body.phone)
//     const lastTimecard = await getLastTimecard(request.user.id)
//     response.success('done');
// })

// Parse.Cloud.define("createTimecardForUser", (request, response) => {
//     if (!request.user) {
//         response.error("Unathorized");
//         return;
//     }
//     const employee = await getUserByPhone(request.body.phone)
//      const lastTimecard = await getLastTimecard(request.user.id)
//  console.log(lastTimecard)

// response.success('done');

// //  if(!lastTimecard && request.params.direction == 'out'){
// //   throw "wrong direction";
// //  }
// //  if(lastTimecard){
// //   if((lastTimecard.outTime == null && request.param.direction == 'in') ||
// //     (lastTimecard.outTime != null && request.param.direction == 'out') ){
// //       throw "wrong direction";
// //   }}

//     // const Todo = Parse.Object.extend("Todo");
//     // const todo = new Todo();
//     // todo.set("author", request.user);
//     // todo.set("title", request.params.title);
//     // todo.set("finished", false);
//     // todo.save(null, {
//     //     useMasterKey: true,
//     //     success(result) {
//     //         response.success(result);
//     //     },
//     //     error(error) {
//     //         response.error(
//     //             "Error while creating todo " +
//     //                 error.code +
//     //                 " - " +
//     //                 error.description
//     //         );
//     //     }
//     // });
// });
// Parse.Cloud.define("SMSclockInUser", (request, response) => {
//     if (!request.user) {
//         response.error("Unathorized");
//         return;
//     }

//      const lastTimecard = await getLastTimecard(request.user.id)
//  console.log(lastTimecard)

// response.success('done');

//  if(lastTimecard){
//   if((lastTimecard.outTime == null) ){
//     response.error("210");
//     return;
//   }}

//   const Timecard = Parse.Object.extend("Timecard");
//   const timecard = new Timecard();
//   timecard.set("employeeName", employee.attributes.username);
//   timecard.set("employee", employee.objectId);
//   timecard.set("clockIn", request.params.clockIn);
//   timecard.set("clockOut", null);
//   timecard.set("approved", false);
//   timecard.save(null, {
//         useMasterKey: true,
//         success(result) {
//             response.success(result);
//         },
//         error(error) {
//             response.error(
//                 "Error while creating timecard " +
//                     error.code +
//                     " - " +
//                     error.description
//             );
//         }
//     });
// });
