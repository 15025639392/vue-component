import XzTest from '../src/test.vue'

export default {
    title:`XzTest`,
    component:XzTest
}

export const Test = _ =>({
    components:{ XzTest },
    template:`
        <div>
            <xz-test/>
        </div>
    `
})