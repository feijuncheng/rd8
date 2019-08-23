import tagSelector from './packages/tagSelector'

const components = [
  tagSelector
]

const install = (Vue) => {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* 支持cdn方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  tagSelector
}
