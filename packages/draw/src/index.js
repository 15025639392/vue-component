// import Draw from 'ol/interaction/Draw';
// import { OSM, Vector as VectorSource } from 'ol/source';
// export default class XzDraw {
//     #source = new VectorSource()
//     #type = 'Polygon' // 'Polygon' : 'LineString'
//     #drawUtil = null
//     constructor() {
//         this.#drawUtil = this.draw()
//         this.#drawUtil.on('drawstart', this.#drawstart)
//         draw.on('drawend', this.#drawend)
//     }
//     #drawstart = (evt) => {
//         // set sketch
//         const sketch = evt.feature;

//         /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
//         const tooltipCoord = evt.coordinate;

//         const listener = sketch.getGeometry().on('change', function (evt) {
//             let geom = evt.target;
//             let output;
//             if (geom instanceof Polygon) {
//                 output = formatArea(geom);
//                 tooltipCoord = geom.getInteriorPoint().getCoordinates();
//             } else if (geom instanceof LineString) {
//                 output = formatLength(geom);
//                 tooltipCoord = geom.getLastCoordinate();
//             }
//             measureTooltipElement.innerHTML = output;
//         });
//     }
//     #drawend=()=> {
//         measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
//         measureTooltip.setOffset([0, -7]);
//         // unset sketch
//         sketch = null;
//         // unset tooltip so that a new one can be created
//         measureTooltipElement = null;
//         createMeasureTooltip();
//         unByKey(listener);
//     }

//     draw = () => {
//         return new Draw({
//             source: this.#source,
//             type: this.#type,
//             style: new Style({
//                 fill: new Fill({
//                     color: 'rgba(255, 255, 255, 0.2)',
//                 }),
//                 stroke: new Stroke({
//                     color: 'rgba(0, 0, 0, 0.5)',
//                     lineDash: [10, 10],
//                     width: 2,
//                 }),
//                 image: new CircleStyle({
//                     radius: 5,
//                     stroke: new Stroke({
//                         color: 'rgba(0, 0, 0, 0.7)',
//                     }),
//                     fill: new Fill({
//                         color: 'rgba(255, 255, 255, 0.2)',
//                     }),
//                 }),
//             })
//         }
//     }
// }