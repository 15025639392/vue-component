import XzTest from './src/test.vue'

XzTest.install = Vue =>{
    Vue.component(XzTest.name,XzTest)
}

export default XzTest