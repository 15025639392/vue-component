import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
export function updatePoint(coordinates){
    this.setGeometry(new Point(fromLonLat(coordinates)))
}