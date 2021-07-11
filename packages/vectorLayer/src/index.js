import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
export default class XzVectorLayer{
    #features=[]
    map = null
    #id = null
    #vectorLayer = null
    #options = null
    constructor(id,opts){
        const {source,...args} = opts||{}
        if(source){
            this.#features.push(opts.source)
        }
        this.#options = args
        this.#id = id
    }

    addTo(map){
        this.map = map
        this.addToMap()
        return this
    }

    addToMap(){
        if(this.#vectorLayer){
            return
        }
        if(this.#features.length){
            const source = new VectorSource({
                features:this.#features
            })
            this.#vectorLayer = new VectorLayer({...this.#options,source})
            this.map.addLayer(this.#vectorLayer)
        }
    }

    addFeature(feature){
        if(~this.#features.indexOf(feature)){
            return
        }
        this.#features.push(feature)
        if(this.#vectorLayer){
            console.log(this.#vectorLayer)
            this.#vectorLayer.getSource().addFeature(feature)
            return
        }
        this.addToMap()
    }


}