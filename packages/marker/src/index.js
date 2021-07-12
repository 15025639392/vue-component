import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import {extend,updatePoint} from '../../utils/index';
import {fromLonLat} from 'ol/proj';
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
        const feature = this.#feature = new Feature(new Point(fromLonLat(coordinates||[0, 0])));
        tranformOptions(relOptions).then(options=>{
            feature.setStyle(options)
        })
    }

    getGeometry(){
        return this.#feature.getGeometry()
    }

    addTo(layer){
        layer.addFeature(this.#feature)
        return this
    }
    /**
     * @description 更新坐标点
     * @author ldy
     * @date 2021-07-11
     * @param {*} coordinates
     * @memberof XzMarker
     */
    updatePoint(coordinates){
        updatePoint.call(this.#feature,coordinates)
    }
    _setPrjCoordinates(coordinates){
        this.updatePoint(coordinates)
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
    const {markerType} = opts.symbol;
    // markerType 图标类型 - >TODO
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
        default:
            return getIconOptions(opts)
    }
    
}

function loadImage({src,needLoad}){
    return new Promise((resolve,reject)=>{
        if(!needLoad){
            resolve({src})
            return
        }
        const img = new Image()
        img.src = src
        img.onload=target=>{
            resolve(img)
        }
        img.onerror=()=>{
            resolve({src})
        }
    })
}
function getIconOptions({symbol,...args}){
    const {
        markerWidth,markerHeight,
        markerOpacity,markerFile,src
    } = symbol;
    const needLoadImg=(markerWidth||markerHeight)
    return loadImage({
        src:src||markerFile,
        needLoad:needLoadImg
    }).then(img=>{
        // 获取比例，对于openLayer 不生效问题
        const calcObj={
            src: img.src
        }
        if(!needLoadImg){
            return calcObj
        }   
        const {naturalWidth,naturalHeight} = img;
        if(markerWidth){
            const scaleX = markerWidth/naturalWidth
            calcObj.scale = [scaleX,scaleX]
        }
        if(markerHeight){
            const scaleY = markerHeight/naturalHeight
            calcObj.scale = calcObj.scale||[]
            calcObj.scale.length?calcObj.scale[1]=scaleY:[scaleY,scaleY]
        }
        return calcObj
    }).then(opts=>{
        return  new Style({
            // see: https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html
            image: new Icon({
                ...args,
                // src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                opacity:markerOpacity||1,
                // size:markerWidth&&markerHeight&&[markerWidth, markerHeight],
                ...opts
            }),
        })
    })
    
}

function getEllipseOptions(opts){
    console.log(opts)
    // TODO
    return  {}
}

function getSquareOptions(opts){
    console.log(opts)
    // TODO
    return  {}
}

export default XzMarker