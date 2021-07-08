import XzMap from '../src/map.vue'

export default {
    title:`XzMap`,
    component:XzMap
}

export const Map = () =>({
    components:{ XzMap },
    template:`
        <div>
            <xz-map/>
        </div>
    `
})