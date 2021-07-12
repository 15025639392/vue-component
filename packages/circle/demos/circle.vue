<template>
  <div id="map" class="map"></div>
</template>

<script>
import Map from 'ol/Map';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import {Circle} from '../index'
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
      const center = [12127398.797692968, 4063894.123105166]
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
      const marker = new Circle([12127398.797692968, 4063894.123105166],1000, {
        symbol: {
          lineColor: '#34495e',
          lineWidth: 2,
          polygonFill: '#1bbc9b',
          polygonOpacity: 0.4
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