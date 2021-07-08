import XzMap from './src/map.vue'

XzMap.install = Vue =>{
    Vue.component(XzMap.name,XzMap)
}

export default XzMap