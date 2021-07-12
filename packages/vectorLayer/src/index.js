import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {isArray} from '../../utils/index';
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

    addTo(target){
        if(!target.map){
            this.map = target
        }else{
            this.map = target.map
        }
        this.addToMap()
        return this
    }

    addToMap(){
        if(this.#vectorLayer){
            return
        }
        if(!this.#features.length){
            return
        }
        debugger
        const source = new VectorSource({
            features:this.#features
        })
        this.#vectorLayer = new VectorLayer({...this.#options,source})
        console.log(this.#vectorLayer)
        this.map.addLayer(this.#vectorLayer)
    }

    addFeature(feature){
        const isArr = isArray(feature)
        if(!isArr&&~this.#features.indexOf(feature)){
            return
        }
        this.#features = this.#features.concat(feature)
        if(this.#vectorLayer){
            isArr?this.#vectorLayer.getSource().addFeatures(feature):this.#vectorLayer.getSource().addFeature(feature)
            return
        }
        this.addToMap()
    }
    // 设置样式
    setStyle(styles){
        this.#vectorLayer.setStyle(styles)
    }


}