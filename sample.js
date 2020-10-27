
module.exports = {
  name: "math",
  actions: {
    add(ctx) {
      return ctx.params.a + ctx.params.b
    }
  }
}
/**
 * Problems:
 * 1) input
 * 2) type check inside of function
 * 3) inconvinient call
 * 4) we can expose the same API to make calls from frontend
 */

module.exports = {
  name: "client",
  actions: {
    someAction(ctx) {
      ctx.call("math.add", { a: 2, b: 2 })
    }
  }
}

// ... server
const someAction = () => {
  return math.add({ a: 2, b: 2 })
}
// transforms into 
// ctx.call("math.add", { a: 2, b: 2 })

// ... front-end code call
const someAction = () => {
  return math.add({ a: 2, b: 2 })
}

// transforms into 
fetch('/service/math.add', {
  method: 'POST',
  data: {
    a: 2,
    b: 2
  }
})
