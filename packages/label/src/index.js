import MultiPoint from 'ol/geom/MultiPoint';
import {Feature} from 'ol';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style, Text } from 'ol/style';
import {updatePoint} from '../../utils/index';
import {fromLonLat} from 'ol/proj';
export default class XzPolygon {
    #styles
    #feature
    constructor(text,coordinates, opts) {
        const { textSymbol: symbol, boxStyle } = opts
        const styles = symbol || {}
        this.#styles = [
            new Style({
                text: new Text({
                    text,
                    font: transformFonts(symbol),
                    overflow: true,
                    fill: new Fill({
                        color: symbol.textFill||'#000',
                    }),
                    ...transformHalo(symbol),
                })
            })
        ]

        const feature = this.#feature = new Feature(new Point(fromLonLat(coordinates||[0, 0])));
        feature.setStyle(this.#styles)
    }
    addTo(layer) {
        layer.addFeature(this.#feature)
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

// symbol.textFill?obj.color = symbol.textFill:obj.color = '#000'
// symbol.textHaloRadius