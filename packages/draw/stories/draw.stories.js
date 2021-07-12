import XzDraw from '../demos/draw.vue'

export default {
    title:`XzDraw`,
    component:XzDraw
}

export const Draw = () =>({
    components:{ XzDraw },
    template:`
        <div>
            <xz-draw/>
        </div>
    `
})