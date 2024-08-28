import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faAngleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//import { faCircle as farFaCircle } from '@fortawesome/free-regular-svg-icons'

library.add(faBars, faAngleUp, faAngleDown, faAngleLeft, faAngleRight)

export default FontAwesomeIcon
