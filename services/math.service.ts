import {createService} from "../createService"


const math = createService({
  name: "math"
  },
  {
    add({ a, b }: { a:number, b:number }) {
      return Number(a) + Number(b);
    }
  }
)

export default math