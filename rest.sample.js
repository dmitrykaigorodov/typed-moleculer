//REST

// molecular service declaration
// file: coursesDb.service.js
module.exports = createRest(model.courses)

// then in api gateway service
const coursesDb = require('coursesDb.service')
{
  aliases: {
    //...
    "GET /someOldApi": "v1.someOldApi.action3",
    ...coursesDb.restEnpoints(),
  }
}

// then in some client service
const fn1 = () => {
  coursesDb.list()
}





