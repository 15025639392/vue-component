import GeoJSON from 'ol/format/GeoJSON';
import { Circle } from 'ol/geom';
import { fromCircle } from 'ol/geom/Polygon'
import { Feature } from 'ol';
import { Style, Fill, Stroke } from 'ol/style';
import {getRgba} from '../../utils/index';
export default class XzEllipse {
    #styles
    #feature
    constructor(center,radiusMajor,radiusMinor,opts) {
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
            geometry: genEllipseGeom(center,radiusMajor,radiusMinor),
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

function genEllipseGeom(center, radiusMajor, radiusMinor, rotation) {
    const circle = new Circle(center, radiusMinor);
    const polygon = fromCircle(circle, 64);
    polygon.scale(radiusMajor / radiusMinor, 1);
    if(rotation){
        polygon.rotate(rotation, center);
    }
    return polygon;
}