import XzVectorLayer from '../demos/vectorLayer.vue'

export default {
    title:`XzVectorLayer`,
    component:XzVectorLayer
}

export const VectorLayer = () =>({
    components:{ XzVectorLayer },
    template:`
        <div>
            <xz-vectorLayer/>
        </div>
    `
})