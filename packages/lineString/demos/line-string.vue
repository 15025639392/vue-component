<template>
  <div id="map" class="map"></div>
</template>

<script>
import Map from 'ol/Map';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import {LineString} from '../index'
import VectorLayer from '../../vectorLayer';
import {lonLatToMercator} from '../../utils'
export default {
    name:'XzMap',
    mounted(){
      const tian_di_tu_satellite_layer = new TileLayer({
        title: "天地图卫星影像",
        // preload: 5,
        source: new XYZ({
            url: 'https://t3.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=e67b6383a8f8d5826792cdb19f302c71'
        })
      });
      const map = new Map({
        layers: [tian_di_tu_satellite_layer ],
        target: 'map',
        view: new View({
          center: lonLatToMercator([-0.131049, 51.498568]),
          zoom: 14,
        }),
      });
      const Layer = new VectorLayer().addTo(map)
      const marker = new LineString([-0.131049, 51.498568],
        [-0.107049, 51.498568], {
        arrowStyle : null, // arrow-style : now we only have classic
        arrowPlacement : 'vertex-last', // arrow's placement: vertex-first, vertex-last, vertex-firstlast, point
        visible : true,
        editable : true,
        cursor : null,
        shadowBlur : 0,
        shadowColor : 'black',
        draggable : false,
        dragShadow : false, // display a shadow during dragging
        drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
        symbol: {
          'lineColor' : '#1bbc9b',
          'lineWidth' : 3
        }
      }).addTo(Layer)
      marker.updatePoint([2,2])
    }
}
</script>

<style>
  html,body{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  #root{
    height: 100%;
  }
  #root >div{
    height: 100%;
  }
  .map{
    width: 100%;
    height: 100%;
  }
</style>