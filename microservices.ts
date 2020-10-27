import { ServiceBroker } from 'moleculer'
import math from './services/math.service'

const broker = new ServiceBroker()

broker.loadServices("./services", "**/*.service.js");
broker.loadServices("./services", "**/*.service.ts");

broker.start()
  // Call the service
  .then(() => math.add({ a: 5, b: 3 }))
  // .then(() => broker.call("math.add", { a: 5, b: 3 }))
  // Print the response
  .then(res => console.log("5 + 3 =", res))
  .catch(err => console.error(`Error occured! ${err.message}`));
