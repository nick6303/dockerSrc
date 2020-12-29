import 'perfect-scrollbar/css/perfect-scrollbar.css'
import PerfectScrollbar from 'perfect-scrollbar'

import { Directive } from 'vue'

function perfectScroll(el: any) {
  let ps: PerfectScrollbar | null = new PerfectScrollbar(el)

  ps.update()
  ps = null
}

export default (): Directive => {
  return {
    mounted(el, binding) {
      if (binding.arg) {
        setTimeout(() => {
          perfectScroll(el)
        }, parseInt(binding.arg))
      } else {
        perfectScroll(el)
      }
    }
  }
}
