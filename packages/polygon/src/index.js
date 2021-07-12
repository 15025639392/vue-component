import MultiPoint from 'ol/geom/MultiPoint';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Style, Fill, Stroke } from 'ol/style';
export default class XzPolygon {
    #styles
    #features = []
    constructor(coordinatesList, opts) {
        const { symbol } = opts
        const styles = symbol || {}
        const polygonFill = styles.polygonFill
        this.#styles = [
            new Style({
                stroke: new Stroke({
                    color: styles.lineColor || 'blue',
                    width: styles.lineWidth || 3,
                }),
                fill: new Fill({
                    color: getRgba(polygonFill||'rgba(255, 255, 255, 0.2)',styles.polygonOpacity),
                }),
            }),
            // new Style({
            //     image: new CircleStyle({
            //         radius: 5,
            //         fill: new Fill({
            //             color: 'orange',
            //         }),
            //     }),
            //     geometry: function (feature) {
            //         // return the coordinates of the first ring of the polygon
            //         const coordinates = feature.getGeometry().getCoordinates()[0];
            //         return new MultiPoint(coordinates);
            //     },
            // })
        ]

        const geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name'
            },
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': coordinatesList,
                    },
                }]
        }
        this.#features = new GeoJSON().readFeatures(geojsonObject)
    }
    addTo(layer) {
        layer.addFeature(this.#features)
        // 设置样式
        if (this.#styles) {
            layer.setStyle(this.#styles)
        }
    }
}