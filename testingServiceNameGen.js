
let broker = null;

function init(serviceBroker) {
  broker = serviceBroker
}

function serviceProxy(serviceName, ctx) {
  const serviceListProxyHandler = {
    get: (target, property) => {
      property = property.toString()
      if ("withCtx" == property) {
        return function (newCtx) {
          return serviceProxy(serviceName, newCtx)
        }
      }
      // by default
      return createActionFunctionProxy(serviceName, property, ctx)
    }
  }

  return new Proxy({}, serviceListProxyHandler)
}

async function callAction(ctxOrBroker, actionName, params, options) {
  console.log('calling', ctxOrBroker, actionName, params, options)
  // return await ctxOrBroker.call(actionName, params, options)
}

function createActionFunctionProxy(serviceName, actionName, ctx) {
  return async function (params, options) {
    return callAction(ctx || broker, serviceName + "." + actionName, params || {}, options)
  }
}

const serviceListProxyHandler = {
  get(target, property) {
    property = property.toString()
    // console.log('serviceListProxyHandler.get', property)
    return serviceProxy(property.toString())
  }
}


const services = new Proxy({}, serviceListProxyHandler)

// services.usersDb.get({id: 1})
// services.usersDb(ctx).get({id: 1})
// services.withCtx(ctx).usersDb.get({id: 1})
// services.usersDb.with(ctx).get({id: 1})

function testStuff() {
  init("broker")

  services.usersDb.get({ id: 1 })
  services.usersDb.withCtx("ctx").get({ id: 1 })
  services.usersDb.withCtx("ctx").list()
  services.usersDb.withCtx("ctx").get({ id: 2 }, {timeout: '500'})

}
testStuff()


module.exports.init = init
module.exports.services = services

