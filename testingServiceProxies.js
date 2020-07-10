const { ServiceBroker } = require("moleculer");

// Create a ServiceBroker
const broker = new ServiceBroker();

function declareMoleculerService({ name, actions }) {

  function registerService() {
    let ctxActions = {};
    for (let [actionName, actionFn] of Object.entries(actions)) {
      ctxActions[actionName] = async function (ctx) {
        return await actionFn(ctx.params, ctx)
      }     
    }
    broker.createService({
      name: name,
      actions: ctxActions
    });
  }
    
  function createClient(ctx) {
    return new Proxy(actions, {
      get(target, prop) {
        prop = prop.toString()
        if ("withCtx" == prop) {
          return (ctx) => (createClient(ctx))
        }
        const val = Reflect.get(target, prop);
        if (val) {
          return async function (params) {
            console.log("call prop ctx", prop, !!ctx)
            return await (ctx || broker).call(name + "." + prop, params)
          }
        }
      }
    });
  }

  registerService()

  return createClient();
}

let mathActions = declareMoleculerService({
  name: "math",
  actions: {
    async add({ a, b }, ctx) {
      let retVal = await mathActions.withCtx(ctx).castToNumber({ num: a }) + await mathActions.castToNumber({ num: b })
      console.log("retVal", retVal)
      return retVal
    },
    async castToNumber({ num }) {
      console.log("castToNumber", num)
      return Number(num)
    }
  }
})

// Start the broker
broker.start()
  // .then(() => broker.call("math.add", { a: 5, b: 3 }))
  // .then(res => console.log("5 + 3 =", res))

  .then(() => mathActions.add({ a: 5, b: 3 }))
  .then(res => console.log("5 + 3 =", res))

  .catch(err => console.error(`Error occured!`, err));