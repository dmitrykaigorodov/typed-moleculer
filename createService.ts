
import { ServiceActionsSchema, Context, Service, ServiceSchema, ServiceBroker } from "moleculer";

/**
 * instanciation order: 
 * 1) schema + action
 * 2) broker
 * 3) ctx
 */


// function declareMoleculerService({ name, actions }) {
//   let proxyActions = {}

//   for (let [actionName, actionFn] of Object.entries(actions)) {
//     proxyActions[actionName] = async function (params, ctx) {
//       return await (ctx ? ctx : broker).call(name + "." + actionName, params)
//     }
//   }

//   return proxyActions;
// }
 
export function createService<TypedActions extends object>(schema: ServiceSchema, typedActions: TypedActions) {

  function convertToServiceActionsSchema<TypedActions>(): ServiceActionsSchema {
    let ctxBasedActions: ServiceActionsSchema = {}
    for (let [actionName, actionFn] of Object.entries(typedActions)) {
      ctxBasedActions[actionName] = async function (ctx) {
        return await actionFn(ctx.params, ctx)
      }
    }
    return ctxBasedActions;
  }

  let createActionCallers;
  /**
   * @param broker This function is to be returned by a service module
   */
  function createMoleculerServiceModule(broker: ServiceBroker) {
    schema = {
      ...schema,
      actions: convertToServiceActionsSchema()
    }

    return new Service(
      broker, schema
    )
  }

  return createMoleculerServiceModule;
}


