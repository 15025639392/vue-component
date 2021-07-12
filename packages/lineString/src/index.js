import MultiPoint from 'ol/geom/MultiPoint';
import {Feature} from 'ol';
import Draw from 'ol/interaction/Draw';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style, Text } from 'ol/style';
import {Vector as VectorSource} from 'ol/source';

import {updatePoint,transformLonlatArray,getRgba} from '../../utils/index';
import {fromLonLat} from 'ol/proj';

import LineString from 'ol/geom/LineString';
export default class XzPolygon {
    #styles
    #feature
    constructor(coordinates, opts) {
        const { textSymbol: symbol, boxStyle } = opts
        const styles = symbol || {}
        this.#styles = [
            new Style({
                stroke: new Stroke({
                    width: 6, color: [237, 212, 0, 0.8]
                }),
            })
        ]

        const geojsonObject = {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': coordinates,
            },
        }
        const feature = this.#feature = new Feature({
            geometry: new GeoJSON().readFeature(geojsonObject,{
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }).getGeometry()
        })
    }
    addTo(layer) {
        layer.addFeature(this.#feature)
        // 设置样式
        if (this.#styles) {
            layer.setStyle(this.#styles)
        }
        return this
    }

    updatePoint(coordinates){
        updatePoint.call(this.#feature,coordinates)
    }
}

function transformFonts(symbol){
    const defaultFont = '12px Calibri,sans-serif'
    if(!symbol){
        return defaultFont
    }
    if(!symbol.textSize&&!symbol.textFaceName){
        return defaultFont
    }
    const fontStyles = []
    symbol.textSize?fontStyles.push(symbol.textSize+'px'):fontStyles.push('12px')
    symbol.textFaceName?fontStyles.push(symbol.textFaceName):fontStyles.push('Calibri,sans-serif')
    return fontStyles.join(' ')
}

function transformHalo(symbol){
    if(!symbol){
        return {}
    }
    if(!symbol.textHaloFill&&!symbol.textHaloRadius){
        return {}
    }
    return {
        stroke: new Stroke({
            color: symbol.textHaloFill||'#fff',
            width: symbol.textHaloRadius,
        })
    }
}
