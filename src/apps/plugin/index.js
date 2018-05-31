import {ViewBox, XHeader, Tabbar, TabbarItem, Group, Cell, XButton, XInput, ToastPlugin, Checker, CheckerItem, CheckIcon} from 'vux'
import ytHeader from './header'
const vuxComps = {
  ytHeader, ViewBox, XHeader, Tabbar, TabbarItem, Group, Cell, XButton, XInput, Checker, CheckerItem, CheckIcon
}
export default {
  install (Vue) {
    Vue.use(ToastPlugin)
    for (let key in vuxComps) {
      Vue.component(key, vuxComps[key])
    }
  }
}
