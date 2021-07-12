import GeoJSON from 'ol/format/GeoJSON';
import { Circle } from 'ol/geom';
import { Feature } from 'ol';
import { Style, Fill, Stroke } from 'ol/style';
import {getRgba} from '../../utils/index';
export default class Xz {
    #styles
    #feature
    constructor(center,distance,opts) {
        const styles = opts&&opts.symbol||{}
        const polygonOpacity = styles.polygonOpacity;
        const polygonFill = styles.polygonFill
        const fill = new Fill({
            color: getRgba(polygonFill||'rgba(255, 255, 255, 0.2)',styles.polygonOpacity),
        });
        const stroke = new Stroke({
            color: styles.lineColor||'#3399CC',
            width: styles.lineWidth||1
        });
        this.#styles = [
            new Style({
                fill: fill,
                stroke: stroke
            }),
        ]

        this.#feature = new Feature({
            geometry: new Circle(center, distance),
        })
    }
    addTo(layer) {
        layer.addFeature(this.#feature)
        // 设置样式
        if (this.#styles) {
            layer.setStyle(this.#styles)
        }
    }
}