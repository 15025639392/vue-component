
<template>
  <div id="map" class="map"></div>
</template>

<script>
import Map from 'ol/Map';
// import GeoJSON from 'ol/format/GeoJSON'
// import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
// import ol from 'ol'
import DragBox from 'ol/interaction/DragBox';
import Select from 'ol/interaction/Select';
// import VectorLayer from 'ol/layer/Vector';
// import condition from 'ol/events/condition'
export default {
    name:'XzMap',
    mounted(){
        new Map({
        layers: [
            new TileLayer({
            attribution:'',
            source: new OSM(),
          })
        ],
        interactions:[//交互
            new Select(),//选择
            new DragBox({
                condition: true
            })//画框
        ],
        target: 'map',
        view: new View({
            center: [0, 0],
            zoom: 2
        })
    });
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