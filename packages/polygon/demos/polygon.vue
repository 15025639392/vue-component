<template>
  <div id="map" class="map"></div>
</template>

<script>
import Map from 'ol/Map';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import {Polygon} from '../index'
import View from 'ol/View';
import VectorLayer from '../../vectorLayer';
import XYZ from 'ol/source/XYZ';
import {lonLatToMercator} from '../../utils'
export default {
    name:'XzMap',
    mounted(){
      const tian_di_tu_satellite_layer = new TileLayer({
        title: "天地图卫星影像",
        preload: Infinity,
        source: new XYZ({
            url: 'https://t3.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=e67b6383a8f8d5826792cdb19f302c71'
        })
      });
      const center = lonLatToMercator([-0.113049, 51.498568])
      const map = new Map({
        layers: [tian_di_tu_satellite_layer ],
        target: 'map',
        view: new View({
          projection:'EPSG:3857',
          center: center,
          // center:[-0.113049, 51.498568],
          zoom: 14,
          minZoom:3,
          maxZoom:18
        }),
      });
      const Layer = new VectorLayer().addTo(map)
      const marker = new Polygon([
        [
          [-0.131049, 51.498568],
          [-0.107049, 51.498568],
          [-0.107049, 51.493568],
          [-0.131049, 51.493568],
          [-0.131049, 51.498568]
        ].map(v=>lonLatToMercator(v))
      ], {
        visible : true,
        editable : true,
        cursor : 'pointer',
        shadowBlur : 0,
        shadowColor : 'black',
        draggable : false,
        dragShadow : false, // display a shadow during dragging
        drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
        symbol: {
          'lineColor' : '#34495e',
          'lineWidth' : 2,
          'polygonFill' : 'rgb(135,196,240)',
          'polygonOpacity' : 0.6
        }
      }).addTo(Layer)
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