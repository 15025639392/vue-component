<template>
  <div id="map" class="map"></div>
</template>

<script>
import Map from 'ol/Map';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import Marker from '../index'
import VectorLayer from '../../vectorLayer';
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
      const map = new Map({
        layers: [tian_di_tu_satellite_layer ],
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      const Layer = new VectorLayer().addTo(map)
      const marker = new Marker([0, 0],{
          'id' : 'marker0',
          'symbol' : {
              'markerFile': 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
              'markerWidth' : 20,
              // 'markerHeight': 20,
          },
          'properties' : {
              'foo' : 'value'
          }
      }).addTo(Layer)


      marker.updatePoint([-100,100])
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