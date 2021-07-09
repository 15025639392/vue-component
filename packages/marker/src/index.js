import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {extend} from '../../utils/index';
import {Vector as VectorLayer} from 'ol/layer';
const options = {
    'symbol': {
        'markerType': 'path',
        'markerPath': [{
            'path': 'M8 23l0 0 0 0 0 0 0 0 0 0c-4,-5 -8,-10 -8,-14 0,-5 4,-9 8,-9l0 0 0 0c4,0 8,4 8,9 0,4 -4,9 -8,14z M3,9 a5,5 0,1,0,0,-0.9Z',
            'fill': '#DE3333'
        }],
        'markerPathWidth': 16,
        'markerPathHeight': 23,
        'markerWidth': 24,
        'markerHeight': 34,
        anchor:[0.5,1]
    },
    'hitTestForEvent' : false
};

// TODO 监听属性变化，派发更新
class XzMarker{
    #feature
    constructor(coordinates,opts){
        if(!coordinates){
            console.warn('请传入coordinates')
        }
        // TODO 属性验证
        const relOptions = extend({},options,opts);
        const feature = this.#feature = new Feature(new Point(coordinates||[0, 0]));
        const fixedOpts = tranformOptions(opts)
        feature.setStyle(fixedOpts)
    }

    static registerJSONType(sym){

    }

    getGeometry(){
        return this.#feature
    }

    addTo(map){
        const vectorSource = new VectorSource({
            features: [this.#feature],
        })
        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });
        map.addLayer(vectorLayer)
    }
    _setPrjCoordinates(coordinates){
        // 1.设置坐标
        // 2.更新坐标
    }
    // TODO
    _getSprite(){

    }
    // TODO 计算对象范围
    _computePrjExtent(){

    }
}

function tranformOptions(opts){
    // TODO 文字Marker 暂时不处理
    // 目前只处理 imageMarker
    // markerType 图标类型 - >TODO
    const {markerWidth,markerHeight,markerDx,markerDy,markerOpacity,markerFile,src,markerType} = symbol;
    // see: https://github.com/maptalks/maptalks.js/wiki/Symbol-Reference#all
    // ellipse cross x diamond bar square triangle pin pie
    switch (markerType) {
        case 'square':
            return getSquareOptions(opts)
        case 'ellipse':
            return getEllipseOptions(opts)
        case 'cross':
            return getEllipseOptions(opts)
        case 'diamond':
            return getEllipseOptions(opts)
        case 'bar':
            return getEllipseOptions(opts)
        case 'square':
            return getEllipseOptions(opts)
        default:
            return getIconOptions(opts)
    }
    
}

function getIconOptions({symbol,...args}){
    return  new Style({
        // see: https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html
        // TODO scale 比例尺
        image: new Icon({
            src: src||markerFile,
            opacity:markerOpacity||1,
            size:markerWidth&&markerHeight&&[markerWidth, markerHeight],
            // scale
        }),
    })
}

function getEllipseOptions({symbol,...args}){
    // TODO
    return  {}
}

function getSquareOptions({symbol,...args}){
    // TODO
    return  {}
}

export default XzMarker