<template>
  <div id="map" class="map"></div>
</template>

<script>
import Map from 'ol/Map';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import {Label} from '../index'
import VectorLayer from '../../vectorLayer';
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
          center: [0, 0],
          zoom: 2,
        }),
      });
      const Layer = new VectorLayer().addTo(map)
      const marker = new Label('ldytest',[-0.126049, 51.496568],
        {
          'draggable' : true,
          'textSymbol': {
            'textFaceName' : 'monospace',
            'textFill' : '#34495e',
            'textHaloFill' : '#fff',
            'textHaloRadius' : 4,
            'textSize' : 50,
            'textWeight' : 'bold',
            'textVerticalAlignment' : 'top'
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