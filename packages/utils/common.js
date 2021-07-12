export function now() {
    return Date.now();
}

/**
 * @classdesc
 * Utilities methods used internally. It is static and should not be initiated.
 * @class
 * @static
 * @category core
 * @name Util
 */

/**
 * Merges the properties of sources into destination object.
 * @param  {Object} dest   - object to extend
 * @param  {...Object} src - sources
 * @return {Object}
 * @memberOf Util
 */
export function extend(dest) { // (Object[, Object, ...]) ->
    for (let i = 1; i < arguments.length; i++) {
        const src = arguments[i];
        for (const k in src) {
            dest[k] = src[k];
        }
    }
    return dest;
}

/**
 * Whether the object is null or undefined.
 * @param  {Object}  obj - object
 * @return {Boolean}
 * @memberOf Util
 */
export function isNull(obj) {
    return obj == null;
}

/**
 * Whether val is a number and not a NaN.
 * @param  {Object}  val - val
 * @return {Boolean}
 * @memberOf Util
 */
export function isNumber(val) {
    return (typeof val === 'number') && !isNaN(val);
}

/**
 * Whether a number is an integer
 * @param  {Number}  n
 * @return {Boolean}
 * @memberOf Util
 */
export function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Whether the obj is a javascript object.
 * @param  {Object}  obj  - object
 * @return {Boolean}
 * @memberOf Util
 */
export function isObject(obj) {
    return typeof obj === 'object' && !!obj;
}

/**
 * Check whether the object is a string
 * @param {Object} obj
 * @return {Boolean}
 * @memberOf Util
 */
export function isString(obj) {
    if (isNull(obj)) {
        return false;
    }
    return typeof obj === 'string' || (obj.constructor !== null && obj.constructor === String);
}

/**
 * Check whether the object is a function
 * @param {Object} obj
 * @return {Boolean}
 * @memberOf Util
 */
export function isFunction(obj) {
    if (isNull(obj)) {
        return false;
    }
    return typeof obj === 'function' || (obj.constructor !== null && obj.constructor === Function);
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check whether the object owns the property.
 * @param  {Object}  obj - object
 * @param  {String}  key - property
 * @return {Boolean}
 * @memberOf Util
 */
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

/**
 * Join an array, standard or a typed one.
 * @param  {Object[]} arr       array to join
 * @param  {String} seperator  seperator
 * @return {String}           result string
 * @private
 * @memberOf Util
 */
export function join(arr, seperator) {
    if (arr.join) {
        return arr.join(seperator || ',');
    } else {
        return Array.prototype.join.call(arr, seperator || ',');
    }
}

/**
 * Determine if an object has any properties.
 * @param object The object to check.
 * @returns {boolean} The object is empty
 */
export function isEmpty(object) {
    let property;
    for (property in object) {
        return false;
    }
    return !property;
}

const pi = Math.PI / 180;

export function toRadian(d) {
    return d * pi;
}

export function toDegree(r) {
    return r / pi;
}

export function isArray(opt) {
    return Array.isArray(opt)
}

// 经纬度(EPSG:4326)转换EPSG:3857
export function lonLatToMercator(lonlat){
    const isArr = isArray(lonlat)
    let temp = isArr?{
        lng:lonlat[0],
        lat:lonlat[1]
    }:{
        lng:lonlat.x,
        lat:lonlat.y
    }
    const mercator = {
		x:0,
    	y:0
	};
    const earthRad = 6378137.0;
    mercator.x = temp.lng * Math.PI / 180 * earthRad;
    const a = temp.lat * Math.PI / 180;
    mercator.y = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
    return isArr?[mercator.x,mercator.y]:mercator;
}

// EPSG:3857转换经纬度(EPSG:4326)
export function mercatorTolonlat(mercator){
    const lonlat={
    	x:0,
    	y:0
    };
    let x = mercator.x/20037508.34*180;
    let y = mercator.y/20037508.34*180;
    y = 180/Math.PI*(2*Math.atan(Math.exp(y*Math.PI/180))-Math.PI/2);
    lonlat.x = x;
    lonlat.y = y;
    return lonlat;
}

export function transformLonlatArray(list){
    return list.map(lonLatToMercator)
}

// 颜色转化
export function getRgba(color, op) {
    if (isNull(op)) {
        op = 1;
    }
    if (color[0] !== '#') {
        return color;
    }
    let r, g, b;
    if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
    } else {
        r = parseInt(color.substring(1, 2), 16) * 17;
        g = parseInt(color.substring(2, 3), 16) * 17;
        b = parseInt(color.substring(3, 4), 16) * 17;
    }
    return 'rgba(' + r + ',' + g + ',' + b + ',' + op + ')';
}