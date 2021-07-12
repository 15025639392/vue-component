import XzCircle from '../demos/circle.vue'

export default {
    title:`XzCircle`,
    component:XzCircle
}

export const Circle = () =>({
    components:{ XzCircle },
    template:`
        <div>
            <xz-circle/>
        </div>
    `
})