import XzPolygon from '../demos/polygon.vue'

export default {
    title:`XzPolygon`,
    component:XzPolygon
}

export const Polygon = () =>({
    components:{ XzPolygon },
    template:`
        <div>
            <xz-polygon/>
        </div>
    `
})