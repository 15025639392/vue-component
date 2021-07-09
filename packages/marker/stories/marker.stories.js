import XzMarker from '../demos/marker.vue'

export default {
    title:`XzMarker`,
    component:XzMarker
}

export const Marker = () =>({
    components:{ XzMarker },
    template:`
        <div>
            <xz-marker/>
        </div>
    `
})