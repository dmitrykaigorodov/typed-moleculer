import {createService} from "../createService"


export const math = createService({
  name: "math"
  },
  {
    add({ a, b }: { a:number, b:number }) {
      return Number(a) + Number(b);
    }
  }
)

export default math