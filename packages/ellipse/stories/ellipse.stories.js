import XzEllipse from '../demos/ellipse.vue'

export default {
    title:`XzEllipse`,
    component:XzEllipse
}

export const Ellipse = () =>({
    components:{ XzEllipse },
    template:`
        <div>
            <xz-ellipse/>
        </div>
    `
})