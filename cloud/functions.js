module.exports.registerUser = function(Parse) {
  return async request => {
    let params = request.params //Parameters received
    let employeeProfile = Parse.Object.extend('EmployeeProfile') //Store Information

    let userCreated = new Parse.User({
      email: params.email,
      username: params.username,
      password: params.password,
      cellPhone: params.cellPhone
    })

    //Save relation
    try {
      let result = await userCreated.save()

      let information = new employeeProfile({
        position: params.position,
        department: params.department,
        workShift: params.shift,
        user: result
      })

      return information.save()
    } catch (e) {
      return e.message
    }
  }
}

module.exports.employeeProfile = function(Parse) {
  return async request => {
    let req = request.object

    if (
      !req.get('position') ||
      !req.get('department') ||
      !req.get('workShift')
    ) {
      throw new Error(
        'Missing params! The required parameters are: position, department. workShift'
      )
    } else {
      return
    }
  }
}

module.exports.timecard = function(Parse) {
  return async request => {
    let req = request.object

    if (!req.get('employeeId') || !req.get('clockIn')) {
      throw new Error(
        'Missing params! The required parameters are: employeeId, clockIn'
      )
    } else {
      return
    }
  }
}

async function getLastTimecard(employee) {
  const Timecards = Parse.Object.extend('Timecard')
  const query = new Parse.Query(Timecards)
  query.equalTo('employeeId', employee.id)
  query.descending('clockIn')
  return await query.first()
}

async function getUserByPhone(phone) {
  const Users = Parse.Object.extend('User')
  const query = new Parse.Query(Users)
  query.equalTo('cellPhone', phone)
  return await query.first()
}

async function checkEmployeeClockStatusByPhone(phone) {
  const employee = await getUserByPhone(phone)
  if (!employee) {
    throw new Error('Cannot find employee with phone ' + phone)
  }
  const lastTimecard = await getLastTimecard(employee)
  var result = {
    status: 'null',
    timecard: {},
    employee: employee
  }
  if (!lastTimecard || lastTimecard == 'undefined') {
    result.status = 'out'
    result.timecard = null
    return result
  }
  if (
    !lastTimecard.attributes.clockOut ||
    lastTimecard.attributes.clockOut == 'undefined'
  ) {
    result.status = 'in'
    result.timecard = lastTimecard
    return result
  } else {
    result.status = 'out'
    result.timecard = lastTimecard
    return result
  }
}

module.exports.SMScheckEmployeeClockStatus = function(Parse) {
  return async request => {
    const result = await checkEmployeeClockStatusByPhone(
      request.params.cellPhone
    )
    return result
  }
}

module.exports.SMSclockInUser = function(Parse) {
  return async request => {
    const currentStatus = await checkEmployeeClockStatusByPhone(
      request.params.cellPhone
    )
    console.log(currentStatus)

    if (currentStatus.status != 'out') {
      throw new Error(
        'Employee not clocked out ' + JSON.stringify(currentStatus.timecard)
      )
    } else {
      // return 'ok'
      const now = new Date()
      let Timecard = Parse.Object.extend('Timecard')
      try {
        let card = new Timecard({
          cellPhone: request.params.cellPhone,
          clockIn: now,
          employeeId: currentStatus.employee.id,
          employeeName: currentStatus.employee.attributes.username
        })
        console.log(card)
        return card.save()
      } catch (e) {
        return e.message
      }
    }
  }
}
module.exports.SMSclockOutUser = function(Parse) {
  return async request => {
    const currentStatus = await checkEmployeeClockStatusByPhone(
      request.params.cellPhone
    )
    console.log(currentStatus)

    if (currentStatus.status != 'in') {
      throw new Error(
        'Employee not clocked in ' + JSON.stringify(currentStatus.timecard)
      )
    } else {
      // return 'ok'
      const now = new Date()
      const Timecard = Parse.Object.extend('Timecard')

      const query = new Parse.Query(Timecard)
      // here you put the objectId that you want to update
      let newCard = await query.get(currentStatus.timecard.id)
      newCard.set('clockOut', now)
      // let Timecard = Parse.Object.extend('Timecard')
      try {
        let newCard = await query.get(currentStatus.timecard.id)
        newCard.set('clockOut', now)
        return newCard.save()
      } catch (e) {
        return e.message
      }
    }
  }
}
