import XzLabel from '../demos/label.vue'

export default {
    title:`XzLabel`,
    component:XzLabel
}

export const Label = () =>({
    components:{ XzLabel },
    template:`
        <div>
            <xz-label/>
        </div>
    `
})