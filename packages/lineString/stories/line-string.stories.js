import XzLineString from '../demos/line-string.vue'

export default {
    title:`XzLineString`,
    component:XzLineString
}

export const LineString = () =>({
    components:{ XzLineString },
    template:`
        <div>
            <xz-line-string/>
        </div>
    `
})