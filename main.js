import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Test from './src/test'
Vue.use(ElementUI)
new Vue({
    el:'#app',
    render(h){
        return h(Test)
    }
})