import XzTest from '../demos/test.vue'

export default {
    title:`XzTest`,
    component:XzTest
}

export const Test = () =>({
    components:{ XzTest },
    template:`
        <div>
            <xz-test/>
        </div>
    `
})