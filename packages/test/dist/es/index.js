/**
 * @module ol/util
 */
/**
 * @return {?} Any return.
 */
function abstract() {
    return /** @type {?} */ ((function () {
        throw new Error('Unimplemented abstract method.');
    })());
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */
var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @api
 */
function getUid(obj) {
    return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */
var VERSION = '6.5.0';

var __extends$F = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError = /** @class */ (function (_super) {
    __extends$F(AssertionError, _super);
    /**
     * @param {number} code Error code.
     */
    function AssertionError(code) {
        var _this = this;
        var path = 'v' + VERSION.split('-')[0];
        var message = 'Assertion failed. See https://openlayers.org/en/' +
            path +
            '/doc/errors/#' +
            code +
            ' for details.';
        _this = _super.call(this, message) || this;
        /**
         * Error code. The meaning of the code can be found on
         * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
         * the version found in the OpenLayers script's header comment if a version
         * other than the latest is used).
         * @type {number}
         * @api
         */
        _this.code = code;
        /**
         * @type {string}
         */
        _this.name = 'AssertionError';
        // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40
        _this.message = message;
        return _this;
    }
    return AssertionError;
}(Error));

/**
 * @module ol/events/Event
 */
/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
var BaseEvent = /** @class */ (function () {
    /**
     * @param {string} type Type.
     */
    function BaseEvent(type) {
        /**
         * @type {boolean}
         */
        this.propagationStopped;
        /**
         * The event type.
         * @type {string}
         * @api
         */
        this.type = type;
        /**
         * The event target.
         * @type {Object}
         * @api
         */
        this.target = null;
    }
    /**
     * Stop event propagation.
     * @api
     */
    BaseEvent.prototype.preventDefault = function () {
        this.propagationStopped = true;
    };
    /**
     * Stop event propagation.
     * @api
     */
    BaseEvent.prototype.stopPropagation = function () {
        this.propagationStopped = true;
    };
    return BaseEvent;
}());

/**
 * @module ol/ObjectEventType
 */
/**
 * @enum {string}
 */
var ObjectEventType = {
    /**
     * Triggered when a property is changed.
     * @event module:ol/Object.ObjectEvent#propertychange
     * @api
     */
    PROPERTYCHANGE: 'propertychange',
};

/**
 * @module ol/Disposable
 */
/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable = /** @class */ (function () {
    function Disposable() {
        /**
         * The object has already been disposed.
         * @type {boolean}
         * @protected
         */
        this.disposed = false;
    }
    /**
     * Clean up.
     */
    Disposable.prototype.dispose = function () {
        if (!this.disposed) {
            this.disposed = true;
            this.disposeInternal();
        }
    };
    /**
     * Extension point for disposable objects.
     * @protected
     */
    Disposable.prototype.disposeInternal = function () { };
    return Disposable;
}());

/**
 * @module ol/array
 */
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */
function numberSafeCompareFunction(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * @param {Array<number>} arr Array.
 * @param {number} target Target.
 * @param {number} direction 0 means return the nearest, > 0
 *    means return the largest nearest, < 0 means return the
 *    smallest nearest.
 * @return {number} Index.
 */
function linearFindNearest(arr, target, direction) {
    var n = arr.length;
    if (arr[0] <= target) {
        return 0;
    }
    else if (target <= arr[n - 1]) {
        return n - 1;
    }
    else {
        var i = void 0;
        if (direction > 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] < target) {
                    return i - 1;
                }
            }
        }
        else if (direction < 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] <= target) {
                    return i;
                }
            }
        }
        else {
            for (i = 1; i < n; ++i) {
                if (arr[i] == target) {
                    return i;
                }
                else if (arr[i] < target) {
                    if (arr[i - 1] - target < target - arr[i]) {
                        return i - 1;
                    }
                    else {
                        return i;
                    }
                }
            }
        }
        return n - 1;
    }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */
function extend(arr, data) {
    var extension = Array.isArray(data) ? data : [data];
    var length = extension.length;
    for (var i = 0; i < length; i++) {
        arr[arr.length] = extension[i];
    }
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */
function equals$2(arr1, arr2) {
    var len1 = arr1.length;
    if (len1 !== arr2.length) {
        return false;
    }
    for (var i = 0; i < len1; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * @module ol/functions
 */
/**
 * Always returns true.
 * @returns {boolean} true.
 */
function TRUE() {
    return true;
}
/**
 * Always returns false.
 * @returns {boolean} false.
 */
function FALSE() {
    return false;
}
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */
function VOID() { }
/**
 * Wrap a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 *
 * @param {function(...any): ReturnType} fn The function to memoize.
 * @return {function(...any): ReturnType} The memoized function.
 * @template ReturnType
 */
function memoizeOne(fn) {
    var called = false;
    /** @type {ReturnType} */
    var lastResult;
    /** @type {Array<any>} */
    var lastArgs;
    var lastThis;
    return function () {
        var nextArgs = Array.prototype.slice.call(arguments);
        if (!called || this !== lastThis || !equals$2(nextArgs, lastArgs)) {
            called = true;
            lastThis = this;
            lastArgs = nextArgs;
            lastResult = fn.apply(this, arguments);
        }
        return lastResult;
    };
}

/**
 * @module ol/obj
 */
/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
var assign = typeof Object.assign === 'function'
    ? Object.assign
    : function (target, var_sources) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var i = 1, ii = arguments.length; i < ii; ++i) {
            var source = arguments[i];
            if (source !== undefined && source !== null) {
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        output[key] = source[key];
                    }
                }
            }
        }
        return output;
    };
/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */
function clear(object) {
    for (var property in object) {
        delete object[property];
    }
}
/**
 * Polyfill for Object.values().  Get an array of property values from an object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 *
 * @param {!Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */
var getValues = typeof Object.values === 'function'
    ? Object.values
    : function (object) {
        var values = [];
        for (var property in object) {
            values.push(object[property]);
        }
        return values;
    };
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */
function isEmpty$1(object) {
    var property;
    for (property in object) {
        return false;
    }
    return !property;
}

var __extends$E = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {EventTarget|Target} EventTargetLike
 */
/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */
var Target = /** @class */ (function (_super) {
    __extends$E(Target, _super);
    /**
     * @param {*=} opt_target Default event target for dispatched events.
     */
    function Target(opt_target) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {*}
         */
        _this.eventTarget_ = opt_target;
        /**
         * @private
         * @type {Object<string, number>}
         */
        _this.pendingRemovals_ = null;
        /**
         * @private
         * @type {Object<string, number>}
         */
        _this.dispatching_ = null;
        /**
         * @private
         * @type {Object<string, Array<import("../events.js").Listener>>}
         */
        _this.listeners_ = null;
        return _this;
    }
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    Target.prototype.addEventListener = function (type, listener) {
        if (!type || !listener) {
            return;
        }
        var listeners = this.listeners_ || (this.listeners_ = {});
        var listenersForType = listeners[type] || (listeners[type] = []);
        if (listenersForType.indexOf(listener) === -1) {
            listenersForType.push(listener);
        }
    };
    /**
     * Dispatches an event and calls all listeners listening for events
     * of this type. The event parameter can either be a string or an
     * Object with a `type` property.
     *
     * @param {import("./Event.js").default|string} event Event object.
     * @return {boolean|undefined} `false` if anyone called preventDefault on the
     *     event object or if any of the listeners returned false.
     * @api
     */
    Target.prototype.dispatchEvent = function (event) {
        /** @type {import("./Event.js").default|Event} */
        var evt = typeof event === 'string' ? new BaseEvent(event) : event;
        var type = evt.type;
        if (!evt.target) {
            evt.target = this.eventTarget_ || this;
        }
        var listeners = this.listeners_ && this.listeners_[type];
        var propagate;
        if (listeners) {
            var dispatching = this.dispatching_ || (this.dispatching_ = {});
            var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
            if (!(type in dispatching)) {
                dispatching[type] = 0;
                pendingRemovals[type] = 0;
            }
            ++dispatching[type];
            for (var i = 0, ii = listeners.length; i < ii; ++i) {
                if ('handleEvent' in listeners[i]) {
                    propagate = /** @type {import("../events.js").ListenerObject} */ (listeners[i]).handleEvent(evt);
                }
                else {
                    propagate = /** @type {import("../events.js").ListenerFunction} */ (listeners[i]).call(this, evt);
                }
                if (propagate === false || evt.propagationStopped) {
                    propagate = false;
                    break;
                }
            }
            --dispatching[type];
            if (dispatching[type] === 0) {
                var pr = pendingRemovals[type];
                delete pendingRemovals[type];
                while (pr--) {
                    this.removeEventListener(type, VOID);
                }
                delete dispatching[type];
            }
            return propagate;
        }
    };
    /**
     * Clean up.
     */
    Target.prototype.disposeInternal = function () {
        this.listeners_ && clear(this.listeners_);
    };
    /**
     * Get the listeners for a specified event type. Listeners are returned in the
     * order that they will be called in.
     *
     * @param {string} type Type.
     * @return {Array<import("../events.js").Listener>|undefined} Listeners.
     */
    Target.prototype.getListeners = function (type) {
        return (this.listeners_ && this.listeners_[type]) || undefined;
    };
    /**
     * @param {string=} opt_type Type. If not provided,
     *     `true` will be returned if this event target has any listeners.
     * @return {boolean} Has listeners.
     */
    Target.prototype.hasListener = function (opt_type) {
        if (!this.listeners_) {
            return false;
        }
        return opt_type
            ? opt_type in this.listeners_
            : Object.keys(this.listeners_).length > 0;
    };
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    Target.prototype.removeEventListener = function (type, listener) {
        var listeners = this.listeners_ && this.listeners_[type];
        if (listeners) {
            var index = listeners.indexOf(listener);
            if (index !== -1) {
                if (this.pendingRemovals_ && type in this.pendingRemovals_) {
                    // make listener a no-op, and remove later in #dispatchEvent()
                    listeners[index] = VOID;
                    ++this.pendingRemovals_[type];
                }
                else {
                    listeners.splice(index, 1);
                    if (listeners.length === 0) {
                        delete this.listeners_[type];
                    }
                }
            }
        }
    };
    return Target;
}(Disposable));

/**
 * @module ol/events/EventType
 */
/**
 * @enum {string}
 * @const
 */
var EventType = {
    /**
     * Generic change event. Triggered when the revision counter is increased.
     * @event module:ol/events/Event~BaseEvent#change
     * @api
     */
    CHANGE: 'change',
    /**
     * Generic error event. Triggered when an error occurs.
     * @event module:ol/events/Event~BaseEvent#error
     * @api
     */
    ERROR: 'error',
    BLUR: 'blur',
    CLEAR: 'clear',
    CONTEXTMENU: 'contextmenu',
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    DRAGENTER: 'dragenter',
    DRAGOVER: 'dragover',
    DROP: 'drop',
    FOCUS: 'focus',
    KEYDOWN: 'keydown',
    KEYPRESS: 'keypress',
    LOAD: 'load',
    RESIZE: 'resize',
    TOUCHMOVE: 'touchmove',
    WHEEL: 'wheel',
};

/**
 * @module ol/events
 */
/**
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
 * @typedef {Object} EventsKey
 * @property {ListenerFunction} listener
 * @property {import("./events/Target.js").EventTargetLike} target
 * @property {string} type
 * @api
 */
/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */
/**
 * @typedef {Object} ListenerObject
 * @property {ListenerFunction} handleEvent
 */
/**
 * @typedef {ListenerFunction|ListenerObject} Listener
 */
/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events~unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean=} opt_once If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */
function listen(target, type, listener, opt_this, opt_once) {
    if (opt_this && opt_this !== target) {
        listener = listener.bind(opt_this);
    }
    if (opt_once) {
        var originalListener_1 = listener;
        listener = function () {
            target.removeEventListener(type, listener);
            originalListener_1.apply(this, arguments);
        };
    }
    var eventsKey = {
        target: target,
        type: type,
        listener: listener,
    };
    target.addEventListener(type, listener);
    return eventsKey;
}
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events~unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events~listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */
function listenOnce(target, type, listener, opt_this) {
    return listen(target, type, listener, opt_this, true);
}
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events~listen} or {@link module:ol/events~listenOnce}.
 *
 * @param {EventsKey} key The key.
 */
function unlistenByKey(key) {
    if (key && key.target) {
        key.target.removeEventListener(key.type, key.listener);
        clear(key);
    }
}

var __extends$D = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */
var Observable = /** @class */ (function (_super) {
    __extends$D(Observable, _super);
    function Observable() {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {number}
         */
        _this.revision_ = 0;
        return _this;
    }
    /**
     * Increases the revision counter and dispatches a 'change' event.
     * @api
     */
    Observable.prototype.changed = function () {
        ++this.revision_;
        this.dispatchEvent(EventType.CHANGE);
    };
    /**
     * Get the version number for this object.  Each time the object is modified,
     * its version number will be incremented.
     * @return {number} Revision.
     * @api
     */
    Observable.prototype.getRevision = function () {
        return this.revision_;
    };
    /**
     * Listen for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
     *     called with an array of event types as the first argument, the return
     *     will be an array of keys.
     * @api
     */
    Observable.prototype.on = function (type, listener) {
        if (Array.isArray(type)) {
            var len = type.length;
            var keys = new Array(len);
            for (var i = 0; i < len; ++i) {
                keys[i] = listen(this, type[i], listener);
            }
            return keys;
        }
        else {
            return listen(this, /** @type {string} */ (type), listener);
        }
    };
    /**
     * Listen once for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
     *     called with an array of event types as the first argument, the return
     *     will be an array of keys.
     * @api
     */
    Observable.prototype.once = function (type, listener) {
        var key;
        if (Array.isArray(type)) {
            var len = type.length;
            key = new Array(len);
            for (var i = 0; i < len; ++i) {
                key[i] = listenOnce(this, type[i], listener);
            }
        }
        else {
            key = listenOnce(this, /** @type {string} */ (type), listener);
        }
        /** @type {Object} */ (listener).ol_key = key;
        return key;
    };
    /**
     * Unlisten for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @api
     */
    Observable.prototype.un = function (type, listener) {
        var key = /** @type {Object} */ (listener).ol_key;
        if (key) {
            unByKey(key);
        }
        else if (Array.isArray(type)) {
            for (var i = 0, ii = type.length; i < ii; ++i) {
                this.removeEventListener(type[i], listener);
            }
        }
        else {
            this.removeEventListener(type, listener);
        }
    };
    return Observable;
}(Target));
/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */
function unByKey(key) {
    if (Array.isArray(key)) {
        for (var i = 0, ii = key.length; i < ii; ++i) {
            unlistenByKey(key[i]);
        }
    }
    else {
        unlistenByKey(/** @type {import("./events.js").EventsKey} */ (key));
    }
}

var __extends$C = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */
var ObjectEvent = /** @class */ (function (_super) {
    __extends$C(ObjectEvent, _super);
    /**
     * @param {string} type The event type.
     * @param {string} key The property name.
     * @param {*} oldValue The old value for `key`.
     */
    function ObjectEvent(type, key, oldValue) {
        var _this = _super.call(this, type) || this;
        /**
         * The name of the property whose value is changing.
         * @type {string}
         * @api
         */
        _this.key = key;
        /**
         * The old value. To get the new value use `e.target.get(e.key)` where
         * `e` is the event object.
         * @type {*}
         * @api
         */
        _this.oldValue = oldValue;
        return _this;
    }
    return ObjectEvent;
}(BaseEvent));
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */
var BaseObject = /** @class */ (function (_super) {
    __extends$C(BaseObject, _super);
    /**
     * @param {Object<string, *>=} opt_values An object with key-value pairs.
     */
    function BaseObject(opt_values) {
        var _this = _super.call(this) || this;
        // Call {@link module:ol/util~getUid} to ensure that the order of objects' ids is
        // the same as the order in which they were created.  This also helps to
        // ensure that object properties are always added in the same order, which
        // helps many JavaScript engines generate faster code.
        getUid(_this);
        /**
         * @private
         * @type {Object<string, *>}
         */
        _this.values_ = null;
        if (opt_values !== undefined) {
            _this.setProperties(opt_values);
        }
        return _this;
    }
    /**
     * Gets a value.
     * @param {string} key Key name.
     * @return {*} Value.
     * @api
     */
    BaseObject.prototype.get = function (key) {
        var value;
        if (this.values_ && this.values_.hasOwnProperty(key)) {
            value = this.values_[key];
        }
        return value;
    };
    /**
     * Get a list of object property names.
     * @return {Array<string>} List of property names.
     * @api
     */
    BaseObject.prototype.getKeys = function () {
        return (this.values_ && Object.keys(this.values_)) || [];
    };
    /**
     * Get an object of all property names and values.
     * @return {Object<string, *>} Object.
     * @api
     */
    BaseObject.prototype.getProperties = function () {
        return (this.values_ && assign({}, this.values_)) || {};
    };
    /**
     * @return {boolean} The object has properties.
     */
    BaseObject.prototype.hasProperties = function () {
        return !!this.values_;
    };
    /**
     * @param {string} key Key name.
     * @param {*} oldValue Old value.
     */
    BaseObject.prototype.notify = function (key, oldValue) {
        var eventType;
        eventType = getChangeEventType(key);
        this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
        eventType = ObjectEventType.PROPERTYCHANGE;
        this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    };
    /**
     * Sets a value.
     * @param {string} key Key name.
     * @param {*} value Value.
     * @param {boolean=} opt_silent Update without triggering an event.
     * @api
     */
    BaseObject.prototype.set = function (key, value, opt_silent) {
        var values = this.values_ || (this.values_ = {});
        if (opt_silent) {
            values[key] = value;
        }
        else {
            var oldValue = values[key];
            values[key] = value;
            if (oldValue !== value) {
                this.notify(key, oldValue);
            }
        }
    };
    /**
     * Sets a collection of key-value pairs.  Note that this changes any existing
     * properties and adds new ones (it does not remove any existing properties).
     * @param {Object<string, *>} values Values.
     * @param {boolean=} opt_silent Update without triggering an event.
     * @api
     */
    BaseObject.prototype.setProperties = function (values, opt_silent) {
        for (var key in values) {
            this.set(key, values[key], opt_silent);
        }
    };
    /**
     * Apply any properties from another object without triggering events.
     * @param {BaseObject} source The source object.
     * @protected
     */
    BaseObject.prototype.applyProperties = function (source) {
        if (!source.values_) {
            return;
        }
        assign(this.values_ || (this.values_ = {}), source.values_);
    };
    /**
     * Unsets a property.
     * @param {string} key Key name.
     * @param {boolean=} opt_silent Unset without triggering an event.
     * @api
     */
    BaseObject.prototype.unset = function (key, opt_silent) {
        if (this.values_ && key in this.values_) {
            var oldValue = this.values_[key];
            delete this.values_[key];
            if (isEmpty$1(this.values_)) {
                this.values_ = null;
            }
            if (!opt_silent) {
                this.notify(key, oldValue);
            }
        }
    };
    return BaseObject;
}(Observable));
/**
 * @type {Object<string, string>}
 */
var changeEventTypeCache = {};
/**
 * @param {string} key Key name.
 * @return {string} Change name.
 */
function getChangeEventType(key) {
    return changeEventTypeCache.hasOwnProperty(key)
        ? changeEventTypeCache[key]
        : (changeEventTypeCache[key] = 'change:' + key);
}

/**
 * @module ol/CollectionEventType
 */
/**
 * @enum {string}
 */
var CollectionEventType = {
    /**
     * Triggered when an item is added to the collection.
     * @event module:ol/Collection.CollectionEvent#add
     * @api
     */
    ADD: 'add',
    /**
     * Triggered when an item is removed from the collection.
     * @event module:ol/Collection.CollectionEvent#remove
     * @api
     */
    REMOVE: 'remove',
};

var __extends$B = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @enum {string}
 * @private
 */
var Property$1 = {
    LENGTH: 'length',
};
/**
 * @classdesc
 * Events emitted by {@link module:ol/Collection~Collection} instances are instances of this
 * type.
 */
var CollectionEvent = /** @class */ (function (_super) {
    __extends$B(CollectionEvent, _super);
    /**
     * @param {import("./CollectionEventType.js").default} type Type.
     * @param {*=} opt_element Element.
     * @param {number=} opt_index The index of the added or removed element.
     */
    function CollectionEvent(type, opt_element, opt_index) {
        var _this = _super.call(this, type) || this;
        /**
         * The element that is added to or removed from the collection.
         * @type {*}
         * @api
         */
        _this.element = opt_element;
        /**
         * The index of the added or removed element.
         * @type {number}
         * @api
         */
        _this.index = opt_index;
        return _this;
    }
    return CollectionEvent;
}(BaseEvent));
/**
 * @typedef {Object} Options
 * @property {boolean} [unique=false] Disallow the same item from being added to
 * the collection twice.
 */
/**
 * @classdesc
 * An expanded version of standard JS Array, adding convenience methods for
 * manipulation. Add and remove changes to the Collection trigger a Collection
 * event. Note that this does not cover changes to the objects _within_ the
 * Collection; they trigger events on the appropriate object, not on the
 * Collection as a whole.
 *
 * @fires CollectionEvent
 *
 * @template T
 * @api
 */
var Collection = /** @class */ (function (_super) {
    __extends$B(Collection, _super);
    /**
     * @param {Array<T>=} opt_array Array.
     * @param {Options=} opt_options Collection options.
     */
    function Collection(opt_array, opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options || {};
        /**
         * @private
         * @type {boolean}
         */
        _this.unique_ = !!options.unique;
        /**
         * @private
         * @type {!Array<T>}
         */
        _this.array_ = opt_array ? opt_array : [];
        if (_this.unique_) {
            for (var i = 0, ii = _this.array_.length; i < ii; ++i) {
                _this.assertUnique_(_this.array_[i], i);
            }
        }
        _this.updateLength_();
        return _this;
    }
    /**
     * Remove all elements from the collection.
     * @api
     */
    Collection.prototype.clear = function () {
        while (this.getLength() > 0) {
            this.pop();
        }
    };
    /**
     * Add elements to the collection.  This pushes each item in the provided array
     * to the end of the collection.
     * @param {!Array<T>} arr Array.
     * @return {Collection<T>} This collection.
     * @api
     */
    Collection.prototype.extend = function (arr) {
        for (var i = 0, ii = arr.length; i < ii; ++i) {
            this.push(arr[i]);
        }
        return this;
    };
    /**
     * Iterate over each element, calling the provided callback.
     * @param {function(T, number, Array<T>): *} f The function to call
     *     for every element. This function takes 3 arguments (the element, the
     *     index and the array). The return value is ignored.
     * @api
     */
    Collection.prototype.forEach = function (f) {
        var array = this.array_;
        for (var i = 0, ii = array.length; i < ii; ++i) {
            f(array[i], i, array);
        }
    };
    /**
     * Get a reference to the underlying Array object. Warning: if the array
     * is mutated, no events will be dispatched by the collection, and the
     * collection's "length" property won't be in sync with the actual length
     * of the array.
     * @return {!Array<T>} Array.
     * @api
     */
    Collection.prototype.getArray = function () {
        return this.array_;
    };
    /**
     * Get the element at the provided index.
     * @param {number} index Index.
     * @return {T} Element.
     * @api
     */
    Collection.prototype.item = function (index) {
        return this.array_[index];
    };
    /**
     * Get the length of this collection.
     * @return {number} The length of the array.
     * @observable
     * @api
     */
    Collection.prototype.getLength = function () {
        return this.get(Property$1.LENGTH);
    };
    /**
     * Insert an element at the provided index.
     * @param {number} index Index.
     * @param {T} elem Element.
     * @api
     */
    Collection.prototype.insertAt = function (index, elem) {
        if (this.unique_) {
            this.assertUnique_(elem);
        }
        this.array_.splice(index, 0, elem);
        this.updateLength_();
        this.dispatchEvent(new CollectionEvent(CollectionEventType.ADD, elem, index));
    };
    /**
     * Remove the last element of the collection and return it.
     * Return `undefined` if the collection is empty.
     * @return {T|undefined} Element.
     * @api
     */
    Collection.prototype.pop = function () {
        return this.removeAt(this.getLength() - 1);
    };
    /**
     * Insert the provided element at the end of the collection.
     * @param {T} elem Element.
     * @return {number} New length of the collection.
     * @api
     */
    Collection.prototype.push = function (elem) {
        if (this.unique_) {
            this.assertUnique_(elem);
        }
        var n = this.getLength();
        this.insertAt(n, elem);
        return this.getLength();
    };
    /**
     * Remove the first occurrence of an element from the collection.
     * @param {T} elem Element.
     * @return {T|undefined} The removed element or undefined if none found.
     * @api
     */
    Collection.prototype.remove = function (elem) {
        var arr = this.array_;
        for (var i = 0, ii = arr.length; i < ii; ++i) {
            if (arr[i] === elem) {
                return this.removeAt(i);
            }
        }
        return undefined;
    };
    /**
     * Remove the element at the provided index and return it.
     * Return `undefined` if the collection does not contain this index.
     * @param {number} index Index.
     * @return {T|undefined} Value.
     * @api
     */
    Collection.prototype.removeAt = function (index) {
        var prev = this.array_[index];
        this.array_.splice(index, 1);
        this.updateLength_();
        this.dispatchEvent(new CollectionEvent(CollectionEventType.REMOVE, prev, index));
        return prev;
    };
    /**
     * Set the element at the provided index.
     * @param {number} index Index.
     * @param {T} elem Element.
     * @api
     */
    Collection.prototype.setAt = function (index, elem) {
        var n = this.getLength();
        if (index < n) {
            if (this.unique_) {
                this.assertUnique_(elem, index);
            }
            var prev = this.array_[index];
            this.array_[index] = elem;
            this.dispatchEvent(new CollectionEvent(CollectionEventType.REMOVE, prev, index));
            this.dispatchEvent(new CollectionEvent(CollectionEventType.ADD, elem, index));
        }
        else {
            for (var j = n; j < index; ++j) {
                this.insertAt(j, undefined);
            }
            this.insertAt(index, elem);
        }
    };
    /**
     * @private
     */
    Collection.prototype.updateLength_ = function () {
        this.set(Property$1.LENGTH, this.array_.length);
    };
    /**
     * @private
     * @param {T} elem Element.
     * @param {number=} opt_except Optional index to ignore.
     */
    Collection.prototype.assertUnique_ = function (elem, opt_except) {
        for (var i = 0, ii = this.array_.length; i < ii; ++i) {
            if (this.array_[i] === elem && i !== opt_except) {
                throw new AssertionError(58);
            }
        }
    };
    return Collection;
}(BaseObject));

/**
 * @module ol/asserts
 */
/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
function assert(assertion, errorCode) {
    if (!assertion) {
        throw new AssertionError(errorCode);
    }
}

/**
 * @module ol/geom/GeometryLayout
 */
/**
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available. Supported values are `'XY'`,
 * `'XYZ'`, `'XYM'`, `'XYZM'`.
 * @enum {string}
 */
var GeometryLayout = {
    XY: 'XY',
    XYZ: 'XYZ',
    XYM: 'XYM',
    XYZM: 'XYZM',
};

/**
 * @module ol/geom/GeometryType
 */
/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
var GeometryType = {
    POINT: 'Point',
    LINE_STRING: 'LineString',
    LINEAR_RING: 'LinearRing',
    POLYGON: 'Polygon',
    MULTI_POINT: 'MultiPoint',
    MULTI_LINE_STRING: 'MultiLineString',
    MULTI_POLYGON: 'MultiPolygon',
    GEOMETRY_COLLECTION: 'GeometryCollection',
    CIRCLE: 'Circle',
};

/**
 * @module ol/proj/Units
 */
/**
 * Projection units: `'degrees'`, `'ft'`, `'m'`, `'pixels'`, `'tile-pixels'` or
 * `'us-ft'`.
 * @enum {string}
 */
var Units = {
    /**
     * Degrees
     * @api
     */
    DEGREES: 'degrees',
    /**
     * Feet
     * @api
     */
    FEET: 'ft',
    /**
     * Meters
     * @api
     */
    METERS: 'm',
    /**
     * Pixels
     * @api
     */
    PIXELS: 'pixels',
    /**
     * Tile Pixels
     * @api
     */
    TILE_PIXELS: 'tile-pixels',
    /**
     * US Feet
     * @api
     */
    USFEET: 'us-ft',
};
/**
 * Meters per unit lookup table.
 * @const
 * @type {Object<Units, number>}
 * @api
 */
var METERS_PER_UNIT$1 = {};
// use the radius of the Normal sphere
METERS_PER_UNIT$1[Units.DEGREES] = (2 * Math.PI * 6370997) / 360;
METERS_PER_UNIT$1[Units.FEET] = 0.3048;
METERS_PER_UNIT$1[Units.METERS] = 1;
METERS_PER_UNIT$1[Units.USFEET] = 1200 / 3937;

/**
 * @module ol/transform
 */
/**
 * An array representing an affine 2d transformation for use with
 * {@link module:ol/transform} functions. The array has 6 elements.
 * @typedef {!Array<number>} Transform
 * @api
 */
/**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3×3 matrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */
/**
 * @private
 * @type {Transform}
 */
new Array(6);
/**
 * Create an identity transform.
 * @return {!Transform} Identity transform.
 */
function create() {
    return [1, 0, 0, 1, 0, 0];
}
/**
 * Transforms the given coordinate with the given transform returning the
 * resulting, transformed coordinate. The coordinate will be modified in-place.
 *
 * @param {Transform} transform The transformation.
 * @param {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} coordinate The coordinate to transform.
 * @return {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} return coordinate so that operations can be
 *     chained together.
 */
function apply(transform, coordinate) {
    var x = coordinate[0];
    var y = coordinate[1];
    coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
    coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
    return coordinate;
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative).
 * @param {!Transform} transform The transform (will be modified in place).
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {!Transform} The composite transform.
 */
function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    transform[0] = sx * cos;
    transform[1] = sy * sin;
    transform[2] = -sx * sin;
    transform[3] = sy * cos;
    transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
    transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
    return transform;
}
/**
 * Invert the given transform.
 * @param {!Transform} target Transform to be set as the inverse of
 *     the source transform.
 * @param {!Transform} source The source transform to invert.
 * @return {!Transform} The inverted (target) transform.
 */
function makeInverse(target, source) {
    var det = determinant(source);
    assert(det !== 0, 32); // Transformation matrix cannot be inverted
    var a = source[0];
    var b = source[1];
    var c = source[2];
    var d = source[3];
    var e = source[4];
    var f = source[5];
    target[0] = d / det;
    target[1] = -b / det;
    target[2] = -c / det;
    target[3] = a / det;
    target[4] = (c * f - d * e) / det;
    target[5] = -(a * f - b * e) / det;
    return target;
}
/**
 * Returns the determinant of the given matrix.
 * @param {!Transform} mat Matrix.
 * @return {number} Determinant.
 */
function determinant(mat) {
    return mat[0] * mat[3] - mat[1] * mat[2];
}

/**
 * @module ol/extent/Relationship
 */
/**
 * Relationship to an extent.
 * @enum {number}
 */
var Relationship = {
    UNKNOWN: 0,
    INTERSECTING: 1,
    ABOVE: 2,
    RIGHT: 4,
    BELOW: 8,
    LEFT: 16,
};

/**
 * @module ol/extent
 */
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} The clone.
 */
function clone(extent, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0];
        opt_extent[1] = extent[1];
        opt_extent[2] = extent[2];
        opt_extent[3] = extent[3];
        return opt_extent;
    }
    else {
        return extent.slice();
    }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */
function closestSquaredDistanceXY(extent, x, y) {
    var dx, dy;
    if (x < extent[0]) {
        dx = extent[0] - x;
    }
    else if (extent[2] < x) {
        dx = x - extent[2];
    }
    else {
        dx = 0;
    }
    if (y < extent[1]) {
        dy = extent[1] - y;
    }
    else if (extent[3] < y) {
        dy = y - extent[3];
    }
    else {
        dy = 0;
    }
    return dx * dx + dy * dy;
}
/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */
function containsExtent(extent1, extent2) {
    return (extent1[0] <= extent2[0] &&
        extent2[2] <= extent1[2] &&
        extent1[1] <= extent2[1] &&
        extent2[3] <= extent1[3]);
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */
function containsXY(extent, x, y) {
    return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */
function coordinateRelationship(extent, coordinate) {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var x = coordinate[0];
    var y = coordinate[1];
    var relationship = Relationship.UNKNOWN;
    if (x < minX) {
        relationship = relationship | Relationship.LEFT;
    }
    else if (x > maxX) {
        relationship = relationship | Relationship.RIGHT;
    }
    if (y < minY) {
        relationship = relationship | Relationship.BELOW;
    }
    else if (y > maxY) {
        relationship = relationship | Relationship.ABOVE;
    }
    if (relationship === Relationship.UNKNOWN) {
        relationship = Relationship.INTERSECTING;
    }
    return relationship;
}
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */
function createEmpty() {
    return [Infinity, Infinity, -Infinity, -Infinity];
}
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */
function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = minX;
        opt_extent[1] = minY;
        opt_extent[2] = maxX;
        opt_extent[3] = maxY;
        return opt_extent;
    }
    else {
        return [minX, minY, maxX, maxY];
    }
}
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateEmpty(opt_extent) {
    return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateFromCoordinate(coordinate, opt_extent) {
    var x = coordinate[0];
    var y = coordinate[1];
    return createOrUpdate(x, y, x, y, opt_extent);
}
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateFromCoordinates(coordinates, opt_extent) {
    var extent = createOrUpdateEmpty(opt_extent);
    return extendCoordinates(extent, coordinates);
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
    var extent = createOrUpdateEmpty(opt_extent);
    return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */
function equals$1(extent1, extent2) {
    return (extent1[0] == extent2[0] &&
        extent1[2] == extent2[2] &&
        extent1[1] == extent2[1] &&
        extent1[3] == extent2[3]);
}
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */
function extendCoordinate(extent, coordinate) {
    if (coordinate[0] < extent[0]) {
        extent[0] = coordinate[0];
    }
    if (coordinate[0] > extent[2]) {
        extent[2] = coordinate[0];
    }
    if (coordinate[1] < extent[1]) {
        extent[1] = coordinate[1];
    }
    if (coordinate[1] > extent[3]) {
        extent[3] = coordinate[1];
    }
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */
function extendCoordinates(extent, coordinates) {
    for (var i = 0, ii = coordinates.length; i < ii; ++i) {
        extendCoordinate(extent, coordinates[i]);
    }
    return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */
function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
    for (; offset < end; offset += stride) {
        extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
    }
    return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */
function extendXY(extent, x, y) {
    extent[0] = Math.min(extent[0], x);
    extent[1] = Math.min(extent[1], y);
    extent[2] = Math.max(extent[2], x);
    extent[3] = Math.max(extent[3], y);
}
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
 * @return {S|boolean} Value.
 * @template S
 */
function forEachCorner(extent, callback) {
    var val;
    val = callback(getBottomLeft(extent));
    if (val) {
        return val;
    }
    val = callback(getBottomRight(extent));
    if (val) {
        return val;
    }
    val = callback(getTopRight(extent));
    if (val) {
        return val;
    }
    val = callback(getTopLeft(extent));
    if (val) {
        return val;
    }
    return false;
}
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */
function getBottomLeft(extent) {
    return [extent[0], extent[1]];
}
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */
function getBottomRight(extent) {
    return [extent[2], extent[1]];
}
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */
function getCenter(extent) {
    return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */
function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
    var dx = (resolution * size[0]) / 2;
    var dy = (resolution * size[1]) / 2;
    var cosRotation = Math.cos(rotation);
    var sinRotation = Math.sin(rotation);
    var xCos = dx * cosRotation;
    var xSin = dx * sinRotation;
    var yCos = dy * cosRotation;
    var ySin = dy * sinRotation;
    var x = center[0];
    var y = center[1];
    var x0 = x - xCos + ySin;
    var x1 = x - xCos - ySin;
    var x2 = x + xCos - ySin;
    var x3 = x + xCos + ySin;
    var y0 = y - xSin - yCos;
    var y1 = y - xSin + yCos;
    var y2 = y + xSin + yCos;
    var y3 = y + xSin - yCos;
    return createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
}
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */
function getHeight(extent) {
    return extent[3] - extent[1];
}
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent=} opt_extent Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */
function getIntersection(extent1, extent2, opt_extent) {
    var intersection = opt_extent ? opt_extent : createEmpty();
    if (intersects(extent1, extent2)) {
        if (extent1[0] > extent2[0]) {
            intersection[0] = extent1[0];
        }
        else {
            intersection[0] = extent2[0];
        }
        if (extent1[1] > extent2[1]) {
            intersection[1] = extent1[1];
        }
        else {
            intersection[1] = extent2[1];
        }
        if (extent1[2] < extent2[2]) {
            intersection[2] = extent1[2];
        }
        else {
            intersection[2] = extent2[2];
        }
        if (extent1[3] < extent2[3]) {
            intersection[3] = extent1[3];
        }
        else {
            intersection[3] = extent2[3];
        }
    }
    else {
        createOrUpdateEmpty(intersection);
    }
    return intersection;
}
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */
function getTopLeft(extent) {
    return [extent[0], extent[3]];
}
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */
function getTopRight(extent) {
    return [extent[2], extent[3]];
}
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */
function getWidth(extent) {
    return extent[2] - extent[0];
}
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */
function intersects(extent1, extent2) {
    return (extent1[0] <= extent2[2] &&
        extent1[2] >= extent2[0] &&
        extent1[1] <= extent2[3] &&
        extent1[3] >= extent2[1]);
}
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */
function isEmpty(extent) {
    return extent[2] < extent[0] || extent[3] < extent[1];
}
/**
 * @param {Extent} extent Extent.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function returnOrUpdate(extent, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0];
        opt_extent[1] = extent[1];
        opt_extent[2] = extent[2];
        opt_extent[3] = extent[3];
        return opt_extent;
    }
    else {
        return extent;
    }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */
function scaleFromCenter(extent, value) {
    var deltaX = ((extent[2] - extent[0]) / 2) * (value - 1);
    var deltaY = ((extent[3] - extent[1]) / 2) * (value - 1);
    extent[0] -= deltaX;
    extent[2] += deltaX;
    extent[1] -= deltaY;
    extent[3] += deltaY;
}
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */
function intersectsSegment(extent, start, end) {
    var intersects = false;
    var startRel = coordinateRelationship(extent, start);
    var endRel = coordinateRelationship(extent, end);
    if (startRel === Relationship.INTERSECTING ||
        endRel === Relationship.INTERSECTING) {
        intersects = true;
    }
    else {
        var minX = extent[0];
        var minY = extent[1];
        var maxX = extent[2];
        var maxY = extent[3];
        var startX = start[0];
        var startY = start[1];
        var endX = end[0];
        var endY = end[1];
        var slope = (endY - startY) / (endX - startX);
        var x = void 0, y = void 0;
        if (!!(endRel & Relationship.ABOVE) && !(startRel & Relationship.ABOVE)) {
            // potentially intersects top
            x = endX - (endY - maxY) / slope;
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects &&
            !!(endRel & Relationship.RIGHT) &&
            !(startRel & Relationship.RIGHT)) {
            // potentially intersects right
            y = endY - (endX - maxX) * slope;
            intersects = y >= minY && y <= maxY;
        }
        if (!intersects &&
            !!(endRel & Relationship.BELOW) &&
            !(startRel & Relationship.BELOW)) {
            // potentially intersects bottom
            x = endX - (endY - minY) / slope;
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects &&
            !!(endRel & Relationship.LEFT) &&
            !(startRel & Relationship.LEFT)) {
            // potentially intersects left
            y = endY - (endX - minX) * slope;
            intersects = y >= minY && y <= maxY;
        }
    }
    return intersects;
}

/**
 * @module ol/proj/Projection
 */
/**
 * @typedef {Object} Options
 * @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
 * @property {import("./Units.js").default|string} [units] Units. Required unless a
 * proj4 projection is defined for `code`.
 * @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
 * @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
 * @property {boolean} [global=false] Whether the projection is valid for the whole globe.
 * @property {number} [metersPerUnit] The meters per unit for the SRS.
 * If not provided, the `units` are used to get the meters per unit from the {@link module:ol/proj/Units~METERS_PER_UNIT}
 * lookup table.
 * @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
 * @property {function(number, import("../coordinate.js").Coordinate):number} [getPointResolution]
 * Function to determine resolution at a point. The function is called with a
 * `{number}` view resolution and an `{import("../coordinate.js").Coordinate}` as arguments, and returns
 * the `{number}` resolution in projection units at the passed coordinate. If this is `undefined`,
 * the default {@link module:ol/proj#getPointResolution} function will be used.
 */
/**
 * @classdesc
 * Projection definition class. One of these is created for each projection
 * supported in the application and stored in the {@link module:ol/proj} namespace.
 * You can use these in applications, but this is not required, as API params
 * and options use {@link module:ol/proj~ProjectionLike} which means the simple string
 * code will suffice.
 *
 * You can use {@link module:ol/proj~get} to retrieve the object for a particular
 * projection.
 *
 * The library includes definitions for `EPSG:4326` and `EPSG:3857`, together
 * with the following aliases:
 * * `EPSG:4326`: CRS:84, urn:ogc:def:crs:EPSG:6.6:4326,
 *     urn:ogc:def:crs:OGC:1.3:CRS84, urn:ogc:def:crs:OGC:2:84,
 *     http://www.opengis.net/gml/srs/epsg.xml#4326,
 *     urn:x-ogc:def:crs:EPSG:4326
 * * `EPSG:3857`: EPSG:102100, EPSG:102113, EPSG:900913,
 *     urn:ogc:def:crs:EPSG:6.18:3:3857,
 *     http://www.opengis.net/gml/srs/epsg.xml#3857
 *
 * If you use [proj4js](https://github.com/proj4js/proj4js), aliases can
 * be added using `proj4.defs()`. After all required projection definitions are
 * added, call the {@link module:ol/proj/proj4~register} function.
 *
 * @api
 */
var Projection = /** @class */ (function () {
    /**
     * @param {Options} options Projection options.
     */
    function Projection(options) {
        /**
         * @private
         * @type {string}
         */
        this.code_ = options.code;
        /**
         * Units of projected coordinates. When set to `TILE_PIXELS`, a
         * `this.extent_` and `this.worldExtent_` must be configured properly for each
         * tile.
         * @private
         * @type {import("./Units.js").default}
         */
        this.units_ = /** @type {import("./Units.js").default} */ (options.units);
        /**
         * Validity extent of the projection in projected coordinates. For projections
         * with `TILE_PIXELS` units, this is the extent of the tile in
         * tile pixel space.
         * @private
         * @type {import("../extent.js").Extent}
         */
        this.extent_ = options.extent !== undefined ? options.extent : null;
        /**
         * Extent of the world in EPSG:4326. For projections with
         * `TILE_PIXELS` units, this is the extent of the tile in
         * projected coordinate space.
         * @private
         * @type {import("../extent.js").Extent}
         */
        this.worldExtent_ =
            options.worldExtent !== undefined ? options.worldExtent : null;
        /**
         * @private
         * @type {string}
         */
        this.axisOrientation_ =
            options.axisOrientation !== undefined ? options.axisOrientation : 'enu';
        /**
         * @private
         * @type {boolean}
         */
        this.global_ = options.global !== undefined ? options.global : false;
        /**
         * @private
         * @type {boolean}
         */
        this.canWrapX_ = !!(this.global_ && this.extent_);
        /**
         * @private
         * @type {function(number, import("../coordinate.js").Coordinate):number|undefined}
         */
        this.getPointResolutionFunc_ = options.getPointResolution;
        /**
         * @private
         * @type {import("../tilegrid/TileGrid.js").default}
         */
        this.defaultTileGrid_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        this.metersPerUnit_ = options.metersPerUnit;
    }
    /**
     * @return {boolean} The projection is suitable for wrapping the x-axis
     */
    Projection.prototype.canWrapX = function () {
        return this.canWrapX_;
    };
    /**
     * Get the code for this projection, e.g. 'EPSG:4326'.
     * @return {string} Code.
     * @api
     */
    Projection.prototype.getCode = function () {
        return this.code_;
    };
    /**
     * Get the validity extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    Projection.prototype.getExtent = function () {
        return this.extent_;
    };
    /**
     * Get the units of this projection.
     * @return {import("./Units.js").default} Units.
     * @api
     */
    Projection.prototype.getUnits = function () {
        return this.units_;
    };
    /**
     * Get the amount of meters per unit of this projection.  If the projection is
     * not configured with `metersPerUnit` or a units identifier, the return is
     * `undefined`.
     * @return {number|undefined} Meters.
     * @api
     */
    Projection.prototype.getMetersPerUnit = function () {
        return this.metersPerUnit_ || METERS_PER_UNIT$1[this.units_];
    };
    /**
     * Get the world extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    Projection.prototype.getWorldExtent = function () {
        return this.worldExtent_;
    };
    /**
     * Get the axis orientation of this projection.
     * Example values are:
     * enu - the default easting, northing, elevation.
     * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
     *     or south orientated transverse mercator.
     * wnu - westing, northing, up - some planetary coordinate systems have
     *     "west positive" coordinate systems
     * @return {string} Axis orientation.
     * @api
     */
    Projection.prototype.getAxisOrientation = function () {
        return this.axisOrientation_;
    };
    /**
     * Is this projection a global projection which spans the whole world?
     * @return {boolean} Whether the projection is global.
     * @api
     */
    Projection.prototype.isGlobal = function () {
        return this.global_;
    };
    /**
     * Set if the projection is a global projection which spans the whole world
     * @param {boolean} global Whether the projection is global.
     * @api
     */
    Projection.prototype.setGlobal = function (global) {
        this.global_ = global;
        this.canWrapX_ = !!(global && this.extent_);
    };
    /**
     * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
     */
    Projection.prototype.getDefaultTileGrid = function () {
        return this.defaultTileGrid_;
    };
    /**
     * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
     */
    Projection.prototype.setDefaultTileGrid = function (tileGrid) {
        this.defaultTileGrid_ = tileGrid;
    };
    /**
     * Set the validity extent for this projection.
     * @param {import("../extent.js").Extent} extent Extent.
     * @api
     */
    Projection.prototype.setExtent = function (extent) {
        this.extent_ = extent;
        this.canWrapX_ = !!(this.global_ && extent);
    };
    /**
     * Set the world extent for this projection.
     * @param {import("../extent.js").Extent} worldExtent World extent
     *     [minlon, minlat, maxlon, maxlat].
     * @api
     */
    Projection.prototype.setWorldExtent = function (worldExtent) {
        this.worldExtent_ = worldExtent;
    };
    /**
     * Set the getPointResolution function (see {@link module:ol/proj~getPointResolution}
     * for this projection.
     * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
     * @api
     */
    Projection.prototype.setGetPointResolution = function (func) {
        this.getPointResolutionFunc_ = func;
    };
    /**
     * Get the custom point resolution function for this projection (if set).
     * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
     * resolution function (if set).
     */
    Projection.prototype.getPointResolutionFunc = function () {
        return this.getPointResolutionFunc_;
    };
    return Projection;
}());

/**
 * @module ol/math
 */
/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * Return the hyperbolic cosine of a given number. The method will use the
 * native `Math.cosh` function if it is available, otherwise the hyperbolic
 * cosine will be calculated via the reference implementation of the Mozilla
 * developer network.
 *
 * @param {number} x X.
 * @return {number} Hyperbolic cosine of x.
 */
var cosh = (function () {
    // Wrapped in a iife, to save the overhead of checking for the native
    // implementation on every invocation.
    var cosh;
    if ('cosh' in Math) {
        // The environment supports the native Math.cosh function, use it…
        cosh = Math.cosh;
    }
    else {
        // … else, use the reference implementation of MDN:
        cosh = function (x) {
            var y = /** @type {Math} */ (Math).exp(x);
            return (y + 1 / y) / 2;
        };
    }
    return cosh;
})();
/**
 * Returns the square of the closest distance between the point (x, y) and the
 * line segment (x1, y1) to (x2, y2).
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */
function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    if (dx !== 0 || dy !== 0) {
        var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            x1 = x2;
            y1 = y2;
        }
        else if (t > 0) {
            x1 += dx * t;
            y1 += dy * t;
        }
    }
    return squaredDistance(x, y, x1, y1);
}
/**
 * Returns the square of the distance between the points (x1, y1) and (x2, y2).
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */
function squaredDistance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */
function toRadians(angleInDegrees) {
    return (angleInDegrees * Math.PI) / 180;
}
/**
 * Returns the modulo of a / b, depending on the sign of b.
 *
 * @param {number} a Dividend.
 * @param {number} b Divisor.
 * @return {number} Modulo.
 */
function modulo(a, b) {
    var r = a % b;
    return r * b < 0 ? r + b : r;
}
/**
 * Calculates the linearly interpolated value of x between a and b.
 *
 * @param {number} a Number
 * @param {number} b Number
 * @param {number} x Value to be interpolated.
 * @return {number} Interpolated value.
 */
function lerp(a, b, x) {
    return a + x * (b - a);
}

var __extends$A = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
var RADIUS$1 = 6378137;
/**
 * @const
 * @type {number}
 */
var HALF_SIZE = Math.PI * RADIUS$1;
/**
 * @const
 * @type {import("../extent.js").Extent}
 */
var EXTENT$1 = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
/**
 * @const
 * @type {import("../extent.js").Extent}
 */
var WORLD_EXTENT = [-180, -85, 180, 85];
/**
 * Maximum safe value in y direction
 * @const
 * @type {number}
 */
var MAX_SAFE_Y = RADIUS$1 * Math.log(Math.tan(Math.PI / 2));
/**
 * @classdesc
 * Projection object for web/spherical Mercator (EPSG:3857).
 */
var EPSG3857Projection = /** @class */ (function (_super) {
    __extends$A(EPSG3857Projection, _super);
    /**
     * @param {string} code Code.
     */
    function EPSG3857Projection(code) {
        return _super.call(this, {
            code: code,
            units: Units.METERS,
            extent: EXTENT$1,
            global: true,
            worldExtent: WORLD_EXTENT,
            getPointResolution: function (resolution, point) {
                return resolution / cosh(point[1] / RADIUS$1);
            },
        }) || this;
    }
    return EPSG3857Projection;
}(Projection));
/**
 * Projections equal to EPSG:3857.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */
var PROJECTIONS$1 = [
    new EPSG3857Projection('EPSG:3857'),
    new EPSG3857Projection('EPSG:102100'),
    new EPSG3857Projection('EPSG:102113'),
    new EPSG3857Projection('EPSG:900913'),
    new EPSG3857Projection('http://www.opengis.net/gml/srs/epsg.xml#3857'),
];
/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
function fromEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === undefined) {
        if (dimension > 2) {
            // preserve values beyond second dimension
            output = input.slice();
        }
        else {
            output = new Array(length);
        }
    }
    for (var i = 0; i < length; i += dimension) {
        output[i] = (HALF_SIZE * input[i]) / 180;
        var y = RADIUS$1 * Math.log(Math.tan((Math.PI * (+input[i + 1] + 90)) / 360));
        if (y > MAX_SAFE_Y) {
            y = MAX_SAFE_Y;
        }
        else if (y < -MAX_SAFE_Y) {
            y = -MAX_SAFE_Y;
        }
        output[i + 1] = y;
    }
    return output;
}
/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
function toEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === undefined) {
        if (dimension > 2) {
            // preserve values beyond second dimension
            output = input.slice();
        }
        else {
            output = new Array(length);
        }
    }
    for (var i = 0; i < length; i += dimension) {
        output[i] = (180 * input[i]) / HALF_SIZE;
        output[i + 1] =
            (360 * Math.atan(Math.exp(input[i + 1] / RADIUS$1))) / Math.PI - 90;
    }
    return output;
}

var __extends$z = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Semi-major radius of the WGS84 ellipsoid.
 *
 * @const
 * @type {number}
 */
var RADIUS = 6378137;
/**
 * Extent of the EPSG:4326 projection which is the whole world.
 *
 * @const
 * @type {import("../extent.js").Extent}
 */
var EXTENT = [-180, -90, 180, 90];
/**
 * @const
 * @type {number}
 */
var METERS_PER_UNIT = (Math.PI * RADIUS) / 180;
/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 */
var EPSG4326Projection = /** @class */ (function (_super) {
    __extends$z(EPSG4326Projection, _super);
    /**
     * @param {string} code Code.
     * @param {string=} opt_axisOrientation Axis orientation.
     */
    function EPSG4326Projection(code, opt_axisOrientation) {
        return _super.call(this, {
            code: code,
            units: Units.DEGREES,
            extent: EXTENT,
            axisOrientation: opt_axisOrientation,
            global: true,
            metersPerUnit: METERS_PER_UNIT,
            worldExtent: EXTENT,
        }) || this;
    }
    return EPSG4326Projection;
}(Projection));
/**
 * Projections equal to EPSG:4326.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */
var PROJECTIONS = [
    new EPSG4326Projection('CRS:84'),
    new EPSG4326Projection('EPSG:4326', 'neu'),
    new EPSG4326Projection('urn:ogc:def:crs:OGC:1.3:CRS84'),
    new EPSG4326Projection('urn:ogc:def:crs:OGC:2:84'),
    new EPSG4326Projection('http://www.opengis.net/gml/srs/epsg.xml#4326', 'neu'),
];

/**
 * @module ol/proj/projections
 */
/**
 * @type {Object<string, import("./Projection.js").default>}
 */
var cache = {};
/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {import("./Projection.js").default} The projection (if cached).
 */
function get$2(code) {
    return (cache[code] ||
        cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, 'EPSG:$3')] ||
        null);
}
/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {import("./Projection.js").default} projection The projection to cache.
 */
function add$2(code, projection) {
    cache[code] = projection;
}

/**
 * @module ol/proj/transforms
 */
/**
 * @private
 * @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
 */
var transforms = {};
/**
 * Registers a conversion function to convert coordinates from the source
 * projection to the destination projection.
 *
 * @param {import("./Projection.js").default} source Source.
 * @param {import("./Projection.js").default} destination Destination.
 * @param {import("../proj.js").TransformFunction} transformFn Transform.
 */
function add$1(source, destination, transformFn) {
    var sourceCode = source.getCode();
    var destinationCode = destination.getCode();
    if (!(sourceCode in transforms)) {
        transforms[sourceCode] = {};
    }
    transforms[sourceCode][destinationCode] = transformFn;
}
/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {import("../proj.js").TransformFunction|undefined} The transform function (if found).
 */
function get$1(sourceCode, destinationCode) {
    var transform;
    if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
        transform = transforms[sourceCode][destinationCode];
    }
    return transform;
}

/**
 * @module ol/coordinate
 */
/**
 * An array of numbers representing an xy coordinate. Example: `[16, 48]`.
 * @typedef {Array<number>} Coordinate
 * @api
 */
/**
 * A function that takes a {@link module:ol/coordinate~Coordinate} and
 * transforms it into a `{string}`.
 *
 * @typedef {function((Coordinate|undefined)): string} CoordinateFormat
 * @api
 */
/**
 * Add `delta` to `coordinate`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {add} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     add(coord, [-2, 4]);
 *     // coord is now [5.85, 51.983333]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {Coordinate} delta Delta.
 * @return {Coordinate} The input coordinate adjusted by
 * the given delta.
 * @api
 */
function add(coordinate, delta) {
    coordinate[0] += +delta[0];
    coordinate[1] += +delta[1];
    return coordinate;
}
/**
 * @param {Coordinate} coordinate1 First coordinate.
 * @param {Coordinate} coordinate2 Second coordinate.
 * @return {boolean} The two coordinates are equal.
 */
function equals(coordinate1, coordinate2) {
    var equals = true;
    for (var i = coordinate1.length - 1; i >= 0; --i) {
        if (coordinate1[i] != coordinate2[i]) {
            equals = false;
            break;
        }
    }
    return equals;
}
/**
 * Rotate `coordinate` by `angle`. `coordinate` is modified in place and
 * returned by the function.
 *
 * Example:
 *
 *     import {rotate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var rotateRadians = Math.PI / 2; // 90 degrees
 *     rotate(coord, rotateRadians);
 *     // coord is now [-47.983333, 7.85]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} angle Angle in radian.
 * @return {Coordinate} Coordinate.
 * @api
 */
function rotate$1(coordinate, angle) {
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    coordinate[0] = x;
    coordinate[1] = y;
    return coordinate;
}
/**
 * Scale `coordinate` by `scale`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {scale as scaleCoordinate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var scale = 1.2;
 *     scaleCoordinate(coord, scale);
 *     // coord is now [9.42, 57.5799996]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} scale Scale factor.
 * @return {Coordinate} Coordinate.
 */
function scale$1(coordinate, scale) {
    coordinate[0] *= scale;
    coordinate[1] *= scale;
    return coordinate;
}
/**
 * Modifies the provided coordinate in-place to be within the real world
 * extent. The lower projection extent boundary is inclusive, the upper one
 * exclusive.
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {Coordinate} The coordinate within the real world extent.
 */
function wrapX(coordinate, projection) {
    if (projection.canWrapX()) {
        var worldWidth = getWidth(projection.getExtent());
        var worldsAway = getWorldsAway(coordinate, projection, worldWidth);
        if (worldsAway) {
            coordinate[0] -= worldsAway * worldWidth;
        }
    }
    return coordinate;
}
/**
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @param {number=} opt_sourceExtentWidth Width of the source extent.
 * @return {number} Offset in world widths.
 */
function getWorldsAway(coordinate, projection, opt_sourceExtentWidth) {
    var projectionExtent = projection.getExtent();
    var worldsAway = 0;
    if (projection.canWrapX() &&
        (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
        var sourceExtentWidth = opt_sourceExtentWidth || getWidth(projectionExtent);
        worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
    }
    return worldsAway;
}

/**
 * @module ol/proj
 */
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array<number>} Output coordinate array (new array, same coordinate
 *     values).
 */
function cloneTransform(input, opt_output, opt_dimension) {
    var output;
    if (opt_output !== undefined) {
        for (var i = 0, ii = input.length; i < ii; ++i) {
            opt_output[i] = input[i];
        }
        output = opt_output;
    }
    else {
        output = input.slice();
    }
    return output;
}
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array<number>} Input coordinate array (same array as input).
 */
function identityTransform(input, opt_output, opt_dimension) {
    if (opt_output !== undefined && input !== opt_output) {
        for (var i = 0, ii = input.length; i < ii; ++i) {
            opt_output[i] = input[i];
        }
        input = opt_output;
    }
    return input;
}
/**
 * Add a Projection object to the list of supported projections that can be
 * looked up by their code.
 *
 * @param {Projection} projection Projection instance.
 * @api
 */
function addProjection(projection) {
    add$2(projection.getCode(), projection);
    add$1(projection, projection, cloneTransform);
}
/**
 * @param {Array<Projection>} projections Projections.
 */
function addProjections(projections) {
    projections.forEach(addProjection);
}
/**
 * Fetches a Projection object for the code specified.
 *
 * @param {ProjectionLike} projectionLike Either a code string which is
 *     a combination of authority and identifier such as "EPSG:4326", or an
 *     existing projection object, or undefined.
 * @return {Projection} Projection object, or null if not in list.
 * @api
 */
function get(projectionLike) {
    return typeof projectionLike === 'string'
        ? get$2(/** @type {string} */ (projectionLike))
        : /** @type {Projection} */ (projectionLike) || null;
}
/**
 * Registers transformation functions that don't alter coordinates. Those allow
 * to transform between projections with equal meaning.
 *
 * @param {Array<Projection>} projections Projections.
 * @api
 */
function addEquivalentProjections(projections) {
    addProjections(projections);
    projections.forEach(function (source) {
        projections.forEach(function (destination) {
            if (source !== destination) {
                add$1(source, destination, cloneTransform);
            }
        });
    });
}
/**
 * Registers transformation functions to convert coordinates in any projection
 * in projection1 to any projection in projection2.
 *
 * @param {Array<Projection>} projections1 Projections with equal
 *     meaning.
 * @param {Array<Projection>} projections2 Projections with equal
 *     meaning.
 * @param {TransformFunction} forwardTransform Transformation from any
 *   projection in projection1 to any projection in projection2.
 * @param {TransformFunction} inverseTransform Transform from any projection
 *   in projection2 to any projection in projection1..
 */
function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
    projections1.forEach(function (projection1) {
        projections2.forEach(function (projection2) {
            add$1(projection1, projection2, forwardTransform);
            add$1(projection2, projection1, inverseTransform);
        });
    });
}
/**
 * @param {Projection|string|undefined} projection Projection.
 * @param {string} defaultCode Default code.
 * @return {Projection} Projection.
 */
function createProjection(projection, defaultCode) {
    if (!projection) {
        return get(defaultCode);
    }
    else if (typeof projection === 'string') {
        return get(projection);
    }
    else {
        return /** @type {Projection} */ (projection);
    }
}
/**
 * Searches in the list of transform functions for the function for converting
 * coordinates from the source projection to the destination projection.
 *
 * @param {Projection} sourceProjection Source Projection object.
 * @param {Projection} destinationProjection Destination Projection
 *     object.
 * @return {TransformFunction} Transform function.
 */
function getTransformFromProjections(sourceProjection, destinationProjection) {
    var sourceCode = sourceProjection.getCode();
    var destinationCode = destinationProjection.getCode();
    var transformFunc = get$1(sourceCode, destinationCode);
    if (!transformFunc) {
        transformFunc = identityTransform;
    }
    return transformFunc;
}
/**
 * Given the projection-like objects, searches for a transformation
 * function to convert a coordinates array from the source projection to the
 * destination projection.
 *
 * @param {ProjectionLike} source Source.
 * @param {ProjectionLike} destination Destination.
 * @return {TransformFunction} Transform function.
 * @api
 */
function getTransform(source, destination) {
    var sourceProjection = get(source);
    var destinationProjection = get(destination);
    return getTransformFromProjections(sourceProjection, destinationProjection);
}
/**
 * @type {?Projection}
 */
var userProjection = null;
/**
 * Get the projection for coordinates supplied from and returned by API methods.
 * Note that this method is not yet a part of the stable API.  Support for user
 * projections is not yet complete and should be considered experimental.
 * @returns {?Projection} The user projection (or null if not set).
 */
function getUserProjection() {
    return userProjection;
}
/**
 * Return a coordinate transformed into the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} sourceProjection The input coordinate projection.
 * @returns {Array<number>} The input coordinate in the user projection.
 */
function toUserCoordinate(coordinate, sourceProjection) {
    {
        return coordinate;
    }
}
/**
 * Return a coordinate transformed from the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} destProjection The destination projection.
 * @returns {Array<number>} The input coordinate transformed.
 */
function fromUserCoordinate(coordinate, destProjection) {
    {
        return coordinate;
    }
}
/**
 * Return an extent transformed into the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} sourceProjection The input extent projection.
 * @returns {import("./extent.js").Extent} The input extent in the user projection.
 */
function toUserExtent(extent, sourceProjection) {
    {
        return extent;
    }
}
/**
 * Return an extent transformed from the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} destProjection The destination projection.
 * @returns {import("./extent.js").Extent} The input extent transformed.
 */
function fromUserExtent(extent, destProjection) {
    {
        return extent;
    }
}
/**
 * Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
 * by when this module is executed and should only need to be called again after
 * `clearAllProjections()` is called (e.g. in tests).
 */
function addCommon() {
    // Add transformations that don't alter coordinates to convert within set of
    // projections with equal meaning.
    addEquivalentProjections(PROJECTIONS$1);
    addEquivalentProjections(PROJECTIONS);
    // Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
    // coordinates and back.
    addEquivalentTransforms(PROJECTIONS, PROJECTIONS$1, fromEPSG4326, toEPSG4326);
}
addCommon();

/**
 * @module ol/geom/flat/transform
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */
function transform2D(flatCoordinates, offset, end, stride, transform, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
        var x = flatCoordinates[j];
        var y = flatCoordinates[j + 1];
        dest[i++] = transform[0] * x + transform[2] * y + transform[4];
        dest[i++] = transform[1] * x + transform[3] * y + transform[5];
    }
    if (opt_dest && dest.length != i) {
        dest.length = i;
    }
    return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array<number>} anchor Rotation anchor point.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */
function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var anchorX = anchor[0];
    var anchorY = anchor[1];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
        var deltaX = flatCoordinates[j] - anchorX;
        var deltaY = flatCoordinates[j + 1] - anchorY;
        dest[i++] = anchorX + deltaX * cos - deltaY * sin;
        dest[i++] = anchorY + deltaX * sin + deltaY * cos;
        for (var k = j + 2; k < j + stride; ++k) {
            dest[i++] = flatCoordinates[k];
        }
    }
    if (opt_dest && dest.length != i) {
        dest.length = i;
    }
    return dest;
}
/**
 * Scale the coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} sx Scale factor in the x-direction.
 * @param {number} sy Scale factor in the y-direction.
 * @param {Array<number>} anchor Scale anchor point.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */
function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var anchorX = anchor[0];
    var anchorY = anchor[1];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
        var deltaX = flatCoordinates[j] - anchorX;
        var deltaY = flatCoordinates[j + 1] - anchorY;
        dest[i++] = anchorX + sx * deltaX;
        dest[i++] = anchorY + sy * deltaY;
        for (var k = j + 2; k < j + stride; ++k) {
            dest[i++] = flatCoordinates[k];
        }
    }
    if (opt_dest && dest.length != i) {
        dest.length = i;
    }
    return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */
function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
        dest[i++] = flatCoordinates[j] + deltaX;
        dest[i++] = flatCoordinates[j + 1] + deltaY;
        for (var k = j + 2; k < j + stride; ++k) {
            dest[i++] = flatCoordinates[k];
        }
    }
    if (opt_dest && dest.length != i) {
        dest.length = i;
    }
    return dest;
}

var __extends$y = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @type {import("../transform.js").Transform}
 */
var tmpTransform = create();
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @abstract
 * @api
 */
var Geometry = /** @class */ (function (_super) {
    __extends$y(Geometry, _super);
    function Geometry() {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {import("../extent.js").Extent}
         */
        _this.extent_ = createEmpty();
        /**
         * @private
         * @type {number}
         */
        _this.extentRevision_ = -1;
        /**
         * @protected
         * @type {number}
         */
        _this.simplifiedGeometryMaxMinSquaredTolerance = 0;
        /**
         * @protected
         * @type {number}
         */
        _this.simplifiedGeometryRevision = 0;
        /**
         * Get a transformed and simplified version of the geometry.
         * @abstract
         * @param {number} revision The geometry revision.
         * @param {number} squaredTolerance Squared tolerance.
         * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
         * @return {Geometry} Simplified geometry.
         */
        _this.simplifyTransformedInternal = memoizeOne(function (revision, squaredTolerance, opt_transform) {
            if (!opt_transform) {
                return this.getSimplifiedGeometry(squaredTolerance);
            }
            var clone = this.clone();
            clone.applyTransform(opt_transform);
            return clone.getSimplifiedGeometry(squaredTolerance);
        });
        return _this;
    }
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */
    Geometry.prototype.simplifyTransformed = function (squaredTolerance, opt_transform) {
        return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, opt_transform);
    };
    /**
     * Make a complete copy of the geometry.
     * @abstract
     * @return {!Geometry} Clone.
     */
    Geometry.prototype.clone = function () {
        return abstract();
    };
    /**
     * @abstract
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    Geometry.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        return abstract();
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    Geometry.prototype.containsXY = function (x, y) {
        var coord = this.getClosestPoint([x, y]);
        return coord[0] === x && coord[1] === y;
    };
    /**
     * Return the closest point of the geometry to the passed point as
     * {@link module:ol/coordinate~Coordinate coordinate}.
     * @param {import("../coordinate.js").Coordinate} point Point.
     * @param {import("../coordinate.js").Coordinate=} opt_closestPoint Closest point.
     * @return {import("../coordinate.js").Coordinate} Closest point.
     * @api
     */
    Geometry.prototype.getClosestPoint = function (point, opt_closestPoint) {
        var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
        this.closestPointXY(point[0], point[1], closestPoint, Infinity);
        return closestPoint;
    };
    /**
     * Returns true if this geometry includes the specified coordinate. If the
     * coordinate is on the boundary of the geometry, returns false.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains coordinate.
     * @api
     */
    Geometry.prototype.intersectsCoordinate = function (coordinate) {
        return this.containsXY(coordinate[0], coordinate[1]);
    };
    /**
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    Geometry.prototype.computeExtent = function (extent) {
        return abstract();
    };
    /**
     * Get the extent of the geometry.
     * @param {import("../extent.js").Extent=} opt_extent Extent.
     * @return {import("../extent.js").Extent} extent Extent.
     * @api
     */
    Geometry.prototype.getExtent = function (opt_extent) {
        if (this.extentRevision_ != this.getRevision()) {
            var extent = this.computeExtent(this.extent_);
            if (isNaN(extent[0]) || isNaN(extent[1])) {
                createOrUpdateEmpty(extent);
            }
            this.extentRevision_ = this.getRevision();
        }
        return returnOrUpdate(this.extent_, opt_extent);
    };
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     * @abstract
     * @param {number} angle Rotation angle in radians.
     * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
     * @api
     */
    Geometry.prototype.rotate = function (angle, anchor) {
        abstract();
    };
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     * @abstract
     * @param {number} sx The scaling factor in the x-direction.
     * @param {number=} opt_sy The scaling factor in the y-direction (defaults to sx).
     * @param {import("../coordinate.js").Coordinate=} opt_anchor The scale origin (defaults to the center
     *     of the geometry extent).
     * @api
     */
    Geometry.prototype.scale = function (sx, opt_sy, opt_anchor) {
        abstract();
    };
    /**
     * Create a simplified version of this geometry.  For linestrings, this uses
     * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
     * algorithm.  For polygons, a quantization-based
     * simplification is used to preserve topology.
     * @param {number} tolerance The tolerance distance for simplification.
     * @return {Geometry} A new, simplified version of the original geometry.
     * @api
     */
    Geometry.prototype.simplify = function (tolerance) {
        return this.getSimplifiedGeometry(tolerance * tolerance);
    };
    /**
     * Create a simplified version of this geometry using the Douglas Peucker
     * algorithm.
     * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @return {Geometry} Simplified geometry.
     */
    Geometry.prototype.getSimplifiedGeometry = function (squaredTolerance) {
        return abstract();
    };
    /**
     * Get the type of this geometry.
     * @abstract
     * @return {import("./GeometryType.js").default} Geometry type.
     */
    Geometry.prototype.getType = function () {
        return abstract();
    };
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     * @abstract
     * @param {import("../proj.js").TransformFunction} transformFn Transform function.
     * Called with a flat array of geometry coordinates.
     */
    Geometry.prototype.applyTransform = function (transformFn) {
        abstract();
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     */
    Geometry.prototype.intersectsExtent = function (extent) {
        return abstract();
    };
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first `clone()` this geometry.
     * @abstract
     * @param {number} deltaX Delta X.
     * @param {number} deltaY Delta Y.
     * @api
     */
    Geometry.prototype.translate = function (deltaX, deltaY) {
        abstract();
    };
    /**
     * Transform each coordinate of the geometry from one coordinate reference
     * system to another. The geometry is modified in place.
     * For example, a line will be transformed to a line and a circle to a circle.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     *
     * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
     *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
     * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
     *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
     * @return {Geometry} This geometry.  Note that original geometry is
     *     modified in place.
     * @api
     */
    Geometry.prototype.transform = function (source, destination) {
        /** @type {import("../proj/Projection.js").default} */
        var sourceProj = get(source);
        var transformFn = sourceProj.getUnits() == Units.TILE_PIXELS
            ? function (inCoordinates, outCoordinates, stride) {
                var pixelExtent = sourceProj.getExtent();
                var projectedExtent = sourceProj.getWorldExtent();
                var scale = getHeight(projectedExtent) / getHeight(pixelExtent);
                compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
                transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
                return getTransform(sourceProj, destination)(inCoordinates, outCoordinates, stride);
            }
            : getTransform(sourceProj, destination);
        this.applyTransform(transformFn);
        return this;
    };
    return Geometry;
}(BaseObject));

var __extends$x = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */
var SimpleGeometry = /** @class */ (function (_super) {
    __extends$x(SimpleGeometry, _super);
    function SimpleGeometry() {
        var _this = _super.call(this) || this;
        /**
         * @protected
         * @type {import("./GeometryLayout.js").default}
         */
        _this.layout = GeometryLayout.XY;
        /**
         * @protected
         * @type {number}
         */
        _this.stride = 2;
        /**
         * @protected
         * @type {Array<number>}
         */
        _this.flatCoordinates = null;
        return _this;
    }
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    SimpleGeometry.prototype.computeExtent = function (extent) {
        return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    };
    /**
     * @abstract
     * @return {Array<*>} Coordinates.
     */
    SimpleGeometry.prototype.getCoordinates = function () {
        return abstract();
    };
    /**
     * Return the first coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} First coordinate.
     * @api
     */
    SimpleGeometry.prototype.getFirstCoordinate = function () {
        return this.flatCoordinates.slice(0, this.stride);
    };
    /**
     * @return {Array<number>} Flat coordinates.
     */
    SimpleGeometry.prototype.getFlatCoordinates = function () {
        return this.flatCoordinates;
    };
    /**
     * Return the last coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} Last point.
     * @api
     */
    SimpleGeometry.prototype.getLastCoordinate = function () {
        return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
    };
    /**
     * Return the {@link module:ol/geom/GeometryLayout layout} of the geometry.
     * @return {import("./GeometryLayout.js").default} Layout.
     * @api
     */
    SimpleGeometry.prototype.getLayout = function () {
        return this.layout;
    };
    /**
     * Create a simplified version of this geometry using the Douglas Peucker algorithm.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     */
    SimpleGeometry.prototype.getSimplifiedGeometry = function (squaredTolerance) {
        if (this.simplifiedGeometryRevision !== this.getRevision()) {
            this.simplifiedGeometryMaxMinSquaredTolerance = 0;
            this.simplifiedGeometryRevision = this.getRevision();
        }
        // If squaredTolerance is negative or if we know that simplification will not
        // have any effect then just return this.
        if (squaredTolerance < 0 ||
            (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
                squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance)) {
            return this;
        }
        var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
        var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
        if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
            return simplifiedGeometry;
        }
        else {
            // Simplification did not actually remove any coordinates.  We now know
            // that any calls to getSimplifiedGeometry with a squaredTolerance less
            // than or equal to the current squaredTolerance will also not have any
            // effect.  This allows us to short circuit simplification (saving CPU
            // cycles) and prevents the cache of simplified geometries from filling
            // up with useless identical copies of this geometry (saving memory).
            this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
            return this;
        }
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     * @protected
     */
    SimpleGeometry.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        return this;
    };
    /**
     * @return {number} Stride.
     */
    SimpleGeometry.prototype.getStride = function () {
        return this.stride;
    };
    /**
     * @param {import("./GeometryLayout.js").default} layout Layout.
     * @param {Array<number>} flatCoordinates Flat coordinates.
     */
    SimpleGeometry.prototype.setFlatCoordinates = function (layout, flatCoordinates) {
        this.stride = getStrideForLayout(layout);
        this.layout = layout;
        this.flatCoordinates = flatCoordinates;
    };
    /**
     * @abstract
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     */
    SimpleGeometry.prototype.setCoordinates = function (coordinates, opt_layout) {
        abstract();
    };
    /**
     * @param {import("./GeometryLayout.js").default|undefined} layout Layout.
     * @param {Array<*>} coordinates Coordinates.
     * @param {number} nesting Nesting.
     * @protected
     */
    SimpleGeometry.prototype.setLayout = function (layout, coordinates, nesting) {
        /** @type {number} */
        var stride;
        if (layout) {
            stride = getStrideForLayout(layout);
        }
        else {
            for (var i = 0; i < nesting; ++i) {
                if (coordinates.length === 0) {
                    this.layout = GeometryLayout.XY;
                    this.stride = 2;
                    return;
                }
                else {
                    coordinates = /** @type {Array} */ (coordinates[0]);
                }
            }
            stride = coordinates.length;
            layout = getLayoutForStride(stride);
        }
        this.layout = layout;
        this.stride = stride;
    };
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     * @param {import("../proj.js").TransformFunction} transformFn Transform function.
     * Called with a flat array of geometry coordinates.
     * @api
     */
    SimpleGeometry.prototype.applyTransform = function (transformFn) {
        if (this.flatCoordinates) {
            transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
            this.changed();
        }
    };
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     * @param {number} angle Rotation angle in counter-clockwise radians.
     * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
     * @api
     */
    SimpleGeometry.prototype.rotate = function (angle, anchor) {
        var flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            var stride = this.getStride();
            rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
            this.changed();
        }
    };
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     * @param {number} sx The scaling factor in the x-direction.
     * @param {number=} opt_sy The scaling factor in the y-direction (defaults to sx).
     * @param {import("../coordinate.js").Coordinate=} opt_anchor The scale origin (defaults to the center
     *     of the geometry extent).
     * @api
     */
    SimpleGeometry.prototype.scale = function (sx, opt_sy, opt_anchor) {
        var sy = opt_sy;
        if (sy === undefined) {
            sy = sx;
        }
        var anchor = opt_anchor;
        if (!anchor) {
            anchor = getCenter(this.getExtent());
        }
        var flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            var stride = this.getStride();
            scale(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
            this.changed();
        }
    };
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first `clone()` this geometry.
     * @param {number} deltaX Delta X.
     * @param {number} deltaY Delta Y.
     * @api
     */
    SimpleGeometry.prototype.translate = function (deltaX, deltaY) {
        var flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            var stride = this.getStride();
            translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
            this.changed();
        }
    };
    return SimpleGeometry;
}(Geometry));
/**
 * @param {number} stride Stride.
 * @return {import("./GeometryLayout.js").default} layout Layout.
 */
function getLayoutForStride(stride) {
    var layout;
    if (stride == 2) {
        layout = GeometryLayout.XY;
    }
    else if (stride == 3) {
        layout = GeometryLayout.XYZ;
    }
    else if (stride == 4) {
        layout = GeometryLayout.XYZM;
    }
    return /** @type {import("./GeometryLayout.js").default} */ (layout);
}
/**
 * @param {import("./GeometryLayout.js").default} layout Layout.
 * @return {number} Stride.
 */
function getStrideForLayout(layout) {
    var stride;
    if (layout == GeometryLayout.XY) {
        stride = 2;
    }
    else if (layout == GeometryLayout.XYZ || layout == GeometryLayout.XYM) {
        stride = 3;
    }
    else if (layout == GeometryLayout.XYZM) {
        stride = 4;
    }
    return /** @type {number} */ (stride);
}

/**
 * @module ol/geom/flat/closest
 */
/**
 * Returns the point on the 2D line segment flatCoordinates[offset1] to
 * flatCoordinates[offset2] that is closest to the point (x, y).  Extra
 * dimensions are linearly interpolated.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset1 Offset 1.
 * @param {number} offset2 Offset 2.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 */
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
    var x1 = flatCoordinates[offset1];
    var y1 = flatCoordinates[offset1 + 1];
    var dx = flatCoordinates[offset2] - x1;
    var dy = flatCoordinates[offset2 + 1] - y1;
    var offset;
    if (dx === 0 && dy === 0) {
        offset = offset1;
    }
    else {
        var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            offset = offset2;
        }
        else if (t > 0) {
            for (var i = 0; i < stride; ++i) {
                closestPoint[i] = lerp(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
            }
            closestPoint.length = stride;
            return;
        }
        else {
            offset = offset1;
        }
    }
    for (var i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
    }
    closestPoint.length = stride;
}
/**
 * Return the squared of the largest distance between any pair of consecutive
 * coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */
function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
    var x1 = flatCoordinates[offset];
    var y1 = flatCoordinates[offset + 1];
    for (offset += stride; offset < end; offset += stride) {
        var x2 = flatCoordinates[offset];
        var y2 = flatCoordinates[offset + 1];
        var squaredDelta = squaredDistance(x1, y1, x2, y2);
        if (squaredDelta > max) {
            max = squaredDelta;
        }
        x1 = x2;
        y1 = y2;
    }
    return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */
function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
        offset = end;
    }
    return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>=} opt_tmpPoint Temporary point object.
 * @return {number} Minimum squared distance.
 */
function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
    if (offset == end) {
        return minSquaredDistance;
    }
    var i, squaredDistance$1;
    if (maxDelta === 0) {
        // All points are identical, so just test the first point.
        squaredDistance$1 = squaredDistance(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);
        if (squaredDistance$1 < minSquaredDistance) {
            for (i = 0; i < stride; ++i) {
                closestPoint[i] = flatCoordinates[offset + i];
            }
            closestPoint.length = stride;
            return squaredDistance$1;
        }
        else {
            return minSquaredDistance;
        }
    }
    var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
    var index = offset + stride;
    while (index < end) {
        assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
        squaredDistance$1 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
        if (squaredDistance$1 < minSquaredDistance) {
            minSquaredDistance = squaredDistance$1;
            for (i = 0; i < stride; ++i) {
                closestPoint[i] = tmpPoint[i];
            }
            closestPoint.length = stride;
            index += stride;
        }
        else {
            // Skip ahead multiple points, because we know that all the skipped
            // points cannot be any closer than the closest point we have found so
            // far.  We know this because we know how close the current point is, how
            // close the closest point we have found so far is, and the maximum
            // distance between consecutive points.  For example, if we're currently
            // at distance 10, the best we've found so far is 3, and that the maximum
            // distance between consecutive points is 2, then we'll need to skip at
            // least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
            // finding a closer point.  We use Math.max(..., 1) to ensure that we
            // always advance at least one point, to avoid an infinite loop.
            index +=
                stride *
                    Math.max(((Math.sqrt(squaredDistance$1) - Math.sqrt(minSquaredDistance)) /
                        maxDelta) |
                        0, 1);
        }
    }
    if (isRing) {
        // Check the closing segment.
        assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
        squaredDistance$1 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
        if (squaredDistance$1 < minSquaredDistance) {
            minSquaredDistance = squaredDistance$1;
            for (i = 0; i < stride; ++i) {
                closestPoint[i] = tmpPoint[i];
            }
            closestPoint.length = stride;
        }
    }
    return minSquaredDistance;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>=} opt_tmpPoint Temporary point object.
 * @return {number} Minimum squared distance.
 */
function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
    var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
    for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
        offset = end;
    }
    return minSquaredDistance;
}

/**
 * @module ol/geom/flat/deflate
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
    for (var i = 0, ii = coordinate.length; i < ii; ++i) {
        flatCoordinates[offset++] = coordinate[i];
    }
    return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
    for (var i = 0, ii = coordinates.length; i < ii; ++i) {
        var coordinate = coordinates[i];
        for (var j = 0; j < stride; ++j) {
            flatCoordinates[offset++] = coordinate[j];
        }
    }
    return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array<number>=} opt_ends Ends.
 * @return {Array<number>} Ends.
 */
function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, opt_ends) {
    var ends = opt_ends ? opt_ends : [];
    var i = 0;
    for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
        var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
        ends[i++] = end;
        offset = end;
    }
    ends.length = i;
    return ends;
}

/**
 * @module ol/geom/flat/simplify
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */
function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    var n = (end - offset) / stride;
    if (n < 3) {
        for (; offset < end; offset += stride) {
            simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
            simplifiedFlatCoordinates[simplifiedOffset++] =
                flatCoordinates[offset + 1];
        }
        return simplifiedOffset;
    }
    /** @type {Array<number>} */
    var markers = new Array(n);
    markers[0] = 1;
    markers[n - 1] = 1;
    /** @type {Array<number>} */
    var stack = [offset, end - stride];
    var index = 0;
    while (stack.length > 0) {
        var last = stack.pop();
        var first = stack.pop();
        var maxSquaredDistance = 0;
        var x1 = flatCoordinates[first];
        var y1 = flatCoordinates[first + 1];
        var x2 = flatCoordinates[last];
        var y2 = flatCoordinates[last + 1];
        for (var i = first + stride; i < last; i += stride) {
            var x = flatCoordinates[i];
            var y = flatCoordinates[i + 1];
            var squaredDistance_1 = squaredSegmentDistance(x, y, x1, y1, x2, y2);
            if (squaredDistance_1 > maxSquaredDistance) {
                index = i;
                maxSquaredDistance = squaredDistance_1;
            }
        }
        if (maxSquaredDistance > squaredTolerance) {
            markers[(index - offset) / stride] = 1;
            if (first + stride < index) {
                stack.push(first, index);
            }
            if (index + stride < last) {
                stack.push(index, last);
            }
        }
    }
    for (var i = 0; i < n; ++i) {
        if (markers[i]) {
            simplifiedFlatCoordinates[simplifiedOffset++] =
                flatCoordinates[offset + i * stride];
            simplifiedFlatCoordinates[simplifiedOffset++] =
                flatCoordinates[offset + i * stride + 1];
        }
    }
    return simplifiedOffset;
}
/**
 * @param {number} value Value.
 * @param {number} tolerance Tolerance.
 * @return {number} Rounded value.
 */
function snap(value, tolerance) {
    return tolerance * Math.round(value / tolerance);
}
/**
 * Simplifies a line string using an algorithm designed by Tim Schaub.
 * Coordinates are snapped to the nearest value in a virtual grid and
 * consecutive duplicate coordinates are discarded.  This effectively preserves
 * topology as the simplification of any subsection of a line string is
 * independent of the rest of the line string.  This means that, for examples,
 * the common edge between two polygons will be simplified to the same line
 * string independently in both polygons.  This implementation uses a single
 * pass over the coordinates and eliminates intermediate collinear points.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */
function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    // do nothing if the line is empty
    if (offset == end) {
        return simplifiedOffset;
    }
    // snap the first coordinate (P1)
    var x1 = snap(flatCoordinates[offset], tolerance);
    var y1 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;
    // add the first coordinate to the output
    simplifiedFlatCoordinates[simplifiedOffset++] = x1;
    simplifiedFlatCoordinates[simplifiedOffset++] = y1;
    // find the next coordinate that does not snap to the same value as the first
    // coordinate (P2)
    var x2, y2;
    do {
        x2 = snap(flatCoordinates[offset], tolerance);
        y2 = snap(flatCoordinates[offset + 1], tolerance);
        offset += stride;
        if (offset == end) {
            // all coordinates snap to the same value, the line collapses to a point
            // push the last snapped value anyway to ensure that the output contains
            // at least two points
            // FIXME should we really return at least two points anyway?
            simplifiedFlatCoordinates[simplifiedOffset++] = x2;
            simplifiedFlatCoordinates[simplifiedOffset++] = y2;
            return simplifiedOffset;
        }
    } while (x2 == x1 && y2 == y1);
    while (offset < end) {
        // snap the next coordinate (P3)
        var x3 = snap(flatCoordinates[offset], tolerance);
        var y3 = snap(flatCoordinates[offset + 1], tolerance);
        offset += stride;
        // skip P3 if it is equal to P2
        if (x3 == x2 && y3 == y2) {
            continue;
        }
        // calculate the delta between P1 and P2
        var dx1 = x2 - x1;
        var dy1 = y2 - y1;
        // calculate the delta between P3 and P1
        var dx2 = x3 - x1;
        var dy2 = y3 - y1;
        // if P1, P2, and P3 are colinear and P3 is further from P1 than P2 is from
        // P1 in the same direction then P2 is on the straight line between P1 and
        // P3
        if (dx1 * dy2 == dy1 * dx2 &&
            ((dx1 < 0 && dx2 < dx1) || dx1 == dx2 || (dx1 > 0 && dx2 > dx1)) &&
            ((dy1 < 0 && dy2 < dy1) || dy1 == dy2 || (dy1 > 0 && dy2 > dy1))) {
            // discard P2 and set P2 = P3
            x2 = x3;
            y2 = y3;
            continue;
        }
        // either P1, P2, and P3 are not colinear, or they are colinear but P3 is
        // between P3 and P1 or on the opposite half of the line to P2.  add P2,
        // and continue with P1 = P2 and P2 = P3
        simplifiedFlatCoordinates[simplifiedOffset++] = x2;
        simplifiedFlatCoordinates[simplifiedOffset++] = y2;
        x1 = x2;
        y1 = y2;
        x2 = x3;
        y2 = y3;
    }
    // add the last point (P2)
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */
function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
        simplifiedEnds.push(simplifiedOffset);
        offset = end;
    }
    return simplifiedOffset;
}

/**
 * @module ol/geom/flat/inflate
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array<import("../../coordinate.js").Coordinate>=} opt_coordinates Coordinates.
 * @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
 */
function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
    var coordinates = opt_coordinates !== undefined ? opt_coordinates : [];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
        coordinates[i++] = flatCoordinates.slice(j, j + stride);
    }
    coordinates.length = i;
    return coordinates;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>=} opt_coordinatess Coordinatess.
 * @return {Array<Array<import("../../coordinate.js").Coordinate>>} Coordinatess.
 */
function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, opt_coordinatess) {
    var coordinatess = opt_coordinatess !== undefined ? opt_coordinatess : [];
    var i = 0;
    for (var j = 0, jj = ends.length; j < jj; ++j) {
        var end = ends[j];
        coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
        offset = end;
    }
    coordinatess.length = i;
    return coordinatess;
}

/**
 * @module ol/geom/flat/area
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
function linearRing(flatCoordinates, offset, end, stride) {
    var twiceArea = 0;
    var x1 = flatCoordinates[end - stride];
    var y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
        var x2 = flatCoordinates[offset];
        var y2 = flatCoordinates[offset + 1];
        twiceArea += y1 * x2 - x1 * y2;
        x1 = x2;
        y1 = y2;
    }
    return twiceArea / 2;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
function linearRings(flatCoordinates, offset, ends, stride) {
    var area = 0;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        area += linearRing(flatCoordinates, offset, end, stride);
        offset = end;
    }
    return area;
}

var __extends$w = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */
var LinearRing = /** @class */ (function (_super) {
    __extends$w(LinearRing, _super);
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     */
    function LinearRing(coordinates, opt_layout) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {number}
         */
        _this.maxDelta_ = -1;
        /**
         * @private
         * @type {number}
         */
        _this.maxDeltaRevision_ = -1;
        if (opt_layout !== undefined && !Array.isArray(coordinates[0])) {
            _this.setFlatCoordinates(opt_layout, 
            /** @type {Array<number>} */ (coordinates));
        }
        else {
            _this.setCoordinates(
            /** @type {Array<import("../coordinate.js").Coordinate>} */ (coordinates), opt_layout);
        }
        return _this;
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!LinearRing} Clone.
     * @api
     */
    LinearRing.prototype.clone = function () {
        return new LinearRing(this.flatCoordinates.slice(), this.layout);
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    LinearRing.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    /**
     * Return the area of the linear ring on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    LinearRing.prototype.getArea = function () {
        return linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    /**
     * Return the coordinates of the linear ring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     */
    LinearRing.prototype.getCoordinates = function () {
        return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LinearRing} Simplified LinearRing.
     * @protected
     */
    LinearRing.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        var simplifiedFlatCoordinates = [];
        simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
        return new LinearRing(simplifiedFlatCoordinates, GeometryLayout.XY);
    };
    /**
     * Get the type of this geometry.
     * @return {import("./GeometryType.js").default} Geometry type.
     * @api
     */
    LinearRing.prototype.getType = function () {
        return GeometryType.LINEAR_RING;
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    LinearRing.prototype.intersectsExtent = function (extent) {
        return false;
    };
    /**
     * Set the coordinates of the linear ring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @api
     */
    LinearRing.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 1);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    };
    return LinearRing;
}(SimpleGeometry));

var __extends$v = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */
var Point = /** @class */ (function (_super) {
    __extends$v(Point, _super);
    /**
     * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     */
    function Point(coordinates, opt_layout) {
        var _this = _super.call(this) || this;
        _this.setCoordinates(coordinates, opt_layout);
        return _this;
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!Point} Clone.
     * @api
     */
    Point.prototype.clone = function () {
        var point = new Point(this.flatCoordinates.slice(), this.layout);
        point.applyProperties(this);
        return point;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    Point.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        var flatCoordinates = this.flatCoordinates;
        var squaredDistance$1 = squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
        if (squaredDistance$1 < minSquaredDistance) {
            var stride = this.stride;
            for (var i = 0; i < stride; ++i) {
                closestPoint[i] = flatCoordinates[i];
            }
            closestPoint.length = stride;
            return squaredDistance$1;
        }
        else {
            return minSquaredDistance;
        }
    };
    /**
     * Return the coordinate of the point.
     * @return {import("../coordinate.js").Coordinate} Coordinates.
     * @api
     */
    Point.prototype.getCoordinates = function () {
        return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    Point.prototype.computeExtent = function (extent) {
        return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
    };
    /**
     * Get the type of this geometry.
     * @return {import("./GeometryType.js").default} Geometry type.
     * @api
     */
    Point.prototype.getType = function () {
        return GeometryType.POINT;
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    Point.prototype.intersectsExtent = function (extent) {
        return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
    };
    /**
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @api
     */
    Point.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 0);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    };
    return Point;
}(SimpleGeometry));

/**
 * @module ol/geom/flat/contains
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} Contains extent.
 */
function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
    var outside = forEachCorner(extent, 
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function (coordinate) {
        return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
    });
    return !outside;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
    // http://geomalgorithms.com/a03-_inclusion.html
    // Copyright 2000 softSurfer, 2012 Dan Sunday
    // This code may be freely used and modified for any purpose
    // providing that this copyright notice is included with it.
    // SoftSurfer makes no warranty for this code, and cannot be held
    // liable for any real or imagined damage resulting from its use.
    // Users of this code must verify correctness for their application.
    var wn = 0;
    var x1 = flatCoordinates[end - stride];
    var y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
        var x2 = flatCoordinates[offset];
        var y2 = flatCoordinates[offset + 1];
        if (y1 <= y) {
            if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) {
                wn++;
            }
        }
        else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) {
            wn--;
        }
        x1 = x2;
        y1 = y2;
    }
    return wn !== 0;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
    if (ends.length === 0) {
        return false;
    }
    if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
        return false;
    }
    for (var i = 1, ii = ends.length; i < ii; ++i) {
        if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
            return false;
        }
    }
    return true;
}

/**
 * @module ol/geom/flat/interiorpoint
 */
/**
 * Calculates a point that is likely to lie in the interior of the linear rings.
 * Inspired by JTS's com.vividsolutions.jts.geom.Geometry#getInteriorPoint.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @param {number} flatCentersOffset Flat center offset.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Destination point as XYM coordinate, where M is the
 * length of the horizontal intersection that the point belongs to.
 */
function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
    var i, ii, x, x1, x2, y1, y2;
    var y = flatCenters[flatCentersOffset + 1];
    /** @type {Array<number>} */
    var intersections = [];
    // Calculate intersections with the horizontal line
    for (var r = 0, rr = ends.length; r < rr; ++r) {
        var end = ends[r];
        x1 = flatCoordinates[end - stride];
        y1 = flatCoordinates[end - stride + 1];
        for (i = offset; i < end; i += stride) {
            x2 = flatCoordinates[i];
            y2 = flatCoordinates[i + 1];
            if ((y <= y1 && y2 <= y) || (y1 <= y && y <= y2)) {
                x = ((y - y1) / (y2 - y1)) * (x2 - x1) + x1;
                intersections.push(x);
            }
            x1 = x2;
            y1 = y2;
        }
    }
    // Find the longest segment of the horizontal line that has its center point
    // inside the linear ring.
    var pointX = NaN;
    var maxSegmentLength = -Infinity;
    intersections.sort(numberSafeCompareFunction);
    x1 = intersections[0];
    for (i = 1, ii = intersections.length; i < ii; ++i) {
        x2 = intersections[i];
        var segmentLength = Math.abs(x2 - x1);
        if (segmentLength > maxSegmentLength) {
            x = (x1 + x2) / 2;
            if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
                pointX = x;
                maxSegmentLength = segmentLength;
            }
        }
        x1 = x2;
    }
    if (isNaN(pointX)) {
        // There is no horizontal line that has its center point inside the linear
        // ring.  Use the center of the the linear ring's extent.
        pointX = flatCenters[flatCentersOffset];
    }
    if (opt_dest) {
        opt_dest.push(pointX, y, maxSegmentLength);
        return opt_dest;
    }
    else {
        return [pointX, y, maxSegmentLength];
    }
}

/**
 * @module ol/geom/flat/segments
 */
/**
 * This function calls `callback` for each segment of the flat coordinates
 * array. If the callback returns a truthy value the function returns that
 * value immediately. Otherwise the function returns `false`.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
 *     called for each segment.
 * @return {T|boolean} Value.
 * @template T
 */
function forEach(flatCoordinates, offset, end, stride, callback) {
    var point1 = [flatCoordinates[offset], flatCoordinates[offset + 1]];
    var point2 = [];
    var ret;
    for (; offset + stride < end; offset += stride) {
        point2[0] = flatCoordinates[offset + stride];
        point2[1] = flatCoordinates[offset + stride + 1];
        ret = callback(point1, point2);
        if (ret) {
            return ret;
        }
        point1[0] = point2[0];
        point1[1] = point2[1];
    }
    return false;
}

/**
 * @module ol/geom/flat/intersectsextent
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
    var coordinatesExtent = extendFlatCoordinates(createEmpty(), flatCoordinates, offset, end, stride);
    if (!intersects(extent, coordinatesExtent)) {
        return false;
    }
    if (containsExtent(extent, coordinatesExtent)) {
        return true;
    }
    if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
        return true;
    }
    if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
        return true;
    }
    return forEach(flatCoordinates, offset, end, stride, 
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function (point1, point2) {
        return intersectsSegment(extent, point1, point2);
    });
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
    if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
        return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[1])) {
        return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[3])) {
        return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[1])) {
        return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[3])) {
        return true;
    }
    return false;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
    if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) {
        return false;
    }
    if (ends.length === 1) {
        return true;
    }
    for (var i = 1, ii = ends.length; i < ii; ++i) {
        if (linearRingContainsExtent(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
            if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * @module ol/geom/flat/reverse
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 */
function coordinates(flatCoordinates, offset, end, stride) {
    while (offset < end - stride) {
        for (var i = 0; i < stride; ++i) {
            var tmp = flatCoordinates[offset + i];
            flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
            flatCoordinates[end - stride + i] = tmp;
        }
        offset += stride;
        end -= stride;
    }
}

/**
 * @module ol/geom/flat/orient
 */
/**
 * Is the linear ring oriented clockwise in a coordinate system with a bottom-left
 * coordinate origin? For a coordinate system with a top-left coordinate origin,
 * the ring's orientation is clockwise when this function returns false.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {boolean} Is clockwise.
 */
function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
    // http://tinyurl.com/clockwise-method
    // https://github.com/OSGeo/gdal/blob/trunk/gdal/ogr/ogrlinearring.cpp
    var edge = 0;
    var x1 = flatCoordinates[end - stride];
    var y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
        var x2 = flatCoordinates[offset];
        var y2 = flatCoordinates[offset + 1];
        edge += (x2 - x1) * (y2 + y1);
        x1 = x2;
        y1 = y2;
    }
    return edge === 0 ? undefined : edge > 0;
}
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean=} opt_right Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */
function linearRingsAreOriented(flatCoordinates, offset, ends, stride, opt_right) {
    var right = opt_right !== undefined ? opt_right : false;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
        if (i === 0) {
            if ((right && isClockwise) || (!right && !isClockwise)) {
                return false;
            }
        }
        else {
            if ((right && !isClockwise) || (!right && isClockwise)) {
                return false;
            }
        }
        offset = end;
    }
    return true;
}
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {boolean=} opt_right Follow the right-hand rule for orientation.
 * @return {number} End.
 */
function orientLinearRings(flatCoordinates, offset, ends, stride, opt_right) {
    var right = opt_right !== undefined ? opt_right : false;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
        var reverse = i === 0
            ? (right && isClockwise) || (!right && !isClockwise)
            : (right && !isClockwise) || (!right && isClockwise);
        if (reverse) {
            coordinates(flatCoordinates, offset, end, stride);
        }
        offset = end;
    }
    return offset;
}

var __extends$u = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */
var Polygon = /** @class */ (function (_super) {
    __extends$u(Polygon, _super);
    /**
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
     *     Array of linear rings that define the polygon. The first linear ring of the
     *     array defines the outer-boundary or surface of the polygon. Each subsequent
     *     linear ring defines a hole in the surface of the polygon. A linear ring is
     *     an array of vertices' coordinates where the first coordinate and the last are
     *     equivalent. (For internal use, flat coordinates in combination with
     *     `opt_layout` and `opt_ends` are also accepted.)
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @param {Array<number>=} opt_ends Ends (for internal use with flat coordinates).
     */
    function Polygon(coordinates, opt_layout, opt_ends) {
        var _this = _super.call(this) || this;
        /**
         * @type {Array<number>}
         * @private
         */
        _this.ends_ = [];
        /**
         * @private
         * @type {number}
         */
        _this.flatInteriorPointRevision_ = -1;
        /**
         * @private
         * @type {import("../coordinate.js").Coordinate}
         */
        _this.flatInteriorPoint_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.maxDelta_ = -1;
        /**
         * @private
         * @type {number}
         */
        _this.maxDeltaRevision_ = -1;
        /**
         * @private
         * @type {number}
         */
        _this.orientedRevision_ = -1;
        /**
         * @private
         * @type {Array<number>}
         */
        _this.orientedFlatCoordinates_ = null;
        if (opt_layout !== undefined && opt_ends) {
            _this.setFlatCoordinates(opt_layout, 
            /** @type {Array<number>} */ (coordinates));
            _this.ends_ = opt_ends;
        }
        else {
            _this.setCoordinates(
            /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */ (coordinates), opt_layout);
        }
        return _this;
    }
    /**
     * Append the passed linear ring to this polygon.
     * @param {LinearRing} linearRing Linear ring.
     * @api
     */
    Polygon.prototype.appendLinearRing = function (linearRing) {
        if (!this.flatCoordinates) {
            this.flatCoordinates = linearRing.getFlatCoordinates().slice();
        }
        else {
            extend(this.flatCoordinates, linearRing.getFlatCoordinates());
        }
        this.ends_.push(this.flatCoordinates.length);
        this.changed();
    };
    /**
     * Make a complete copy of the geometry.
     * @return {!Polygon} Clone.
     * @api
     */
    Polygon.prototype.clone = function () {
        var polygon = new Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
        polygon.applyProperties(this);
        return polygon;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    Polygon.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    Polygon.prototype.containsXY = function (x, y) {
        return linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
    };
    /**
     * Return the area of the polygon on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    Polygon.prototype.getArea = function () {
        return linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
    };
    /**
     * Get the coordinate array for this geometry.  This array has the structure
     * of a GeoJSON coordinate array for polygons.
     *
     * @param {boolean=} opt_right Orient coordinates according to the right-hand
     *     rule (counter-clockwise for exterior and clockwise for interior rings).
     *     If `false`, coordinates will be oriented according to the left-hand rule
     *     (clockwise for exterior and counter-clockwise for interior rings).
     *     By default, coordinate orientation will depend on how the geometry was
     *     constructed.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     */
    Polygon.prototype.getCoordinates = function (opt_right) {
        var flatCoordinates;
        if (opt_right !== undefined) {
            flatCoordinates = this.getOrientedFlatCoordinates().slice();
            orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, opt_right);
        }
        else {
            flatCoordinates = this.flatCoordinates;
        }
        return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
    };
    /**
     * @return {Array<number>} Ends.
     */
    Polygon.prototype.getEnds = function () {
        return this.ends_;
    };
    /**
     * @return {Array<number>} Interior point.
     */
    Polygon.prototype.getFlatInteriorPoint = function () {
        if (this.flatInteriorPointRevision_ != this.getRevision()) {
            var flatCenter = getCenter(this.getExtent());
            this.flatInteriorPoint_ = getInteriorPointOfArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
            this.flatInteriorPointRevision_ = this.getRevision();
        }
        return this.flatInteriorPoint_;
    };
    /**
     * Return an interior point of the polygon.
     * @return {Point} Interior point as XYM coordinate, where M is the
     * length of the horizontal intersection that the point belongs to.
     * @api
     */
    Polygon.prototype.getInteriorPoint = function () {
        return new Point(this.getFlatInteriorPoint(), GeometryLayout.XYM);
    };
    /**
     * Return the number of rings of the polygon,  this includes the exterior
     * ring and any interior rings.
     *
     * @return {number} Number of rings.
     * @api
     */
    Polygon.prototype.getLinearRingCount = function () {
        return this.ends_.length;
    };
    /**
     * Return the Nth linear ring of the polygon geometry. Return `null` if the
     * given index is out of range.
     * The exterior linear ring is available at index `0` and the interior rings
     * at index `1` and beyond.
     *
     * @param {number} index Index.
     * @return {LinearRing} Linear ring.
     * @api
     */
    Polygon.prototype.getLinearRing = function (index) {
        if (index < 0 || this.ends_.length <= index) {
            return null;
        }
        return new LinearRing(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    };
    /**
     * Return the linear rings of the polygon.
     * @return {Array<LinearRing>} Linear rings.
     * @api
     */
    Polygon.prototype.getLinearRings = function () {
        var layout = this.layout;
        var flatCoordinates = this.flatCoordinates;
        var ends = this.ends_;
        var linearRings = [];
        var offset = 0;
        for (var i = 0, ii = ends.length; i < ii; ++i) {
            var end = ends[i];
            var linearRing = new LinearRing(flatCoordinates.slice(offset, end), layout);
            linearRings.push(linearRing);
            offset = end;
        }
        return linearRings;
    };
    /**
     * @return {Array<number>} Oriented flat coordinates.
     */
    Polygon.prototype.getOrientedFlatCoordinates = function () {
        if (this.orientedRevision_ != this.getRevision()) {
            var flatCoordinates = this.flatCoordinates;
            if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) {
                this.orientedFlatCoordinates_ = flatCoordinates;
            }
            else {
                this.orientedFlatCoordinates_ = flatCoordinates.slice();
                this.orientedFlatCoordinates_.length = orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
            }
            this.orientedRevision_ = this.getRevision();
        }
        return this.orientedFlatCoordinates_;
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {Polygon} Simplified Polygon.
     * @protected
     */
    Polygon.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        var simplifiedFlatCoordinates = [];
        var simplifiedEnds = [];
        simplifiedFlatCoordinates.length = quantizeArray(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
        return new Polygon(simplifiedFlatCoordinates, GeometryLayout.XY, simplifiedEnds);
    };
    /**
     * Get the type of this geometry.
     * @return {import("./GeometryType.js").default} Geometry type.
     * @api
     */
    Polygon.prototype.getType = function () {
        return GeometryType.POLYGON;
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    Polygon.prototype.intersectsExtent = function (extent) {
        return intersectsLinearRingArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
    };
    /**
     * Set the coordinates of the polygon.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @api
     */
    Polygon.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 2);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        var ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
        this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
        this.changed();
    };
    return Polygon;
}(SimpleGeometry));
/**
 * Create a polygon from an extent. The layout used is `XY`.
 * @param {import("../extent.js").Extent} extent The extent.
 * @return {Polygon} The polygon.
 * @api
 */
function fromExtent(extent) {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var flatCoordinates = [
        minX,
        minY,
        minX,
        maxY,
        maxX,
        maxY,
        maxX,
        minY,
        minX,
        minY,
    ];
    return new Polygon(flatCoordinates, GeometryLayout.XY, [
        flatCoordinates.length,
    ]);
}

/**
 * @module ol/render/EventType
 */
/**
 * @enum {string}
 */
var RenderEventType = {
    /**
     * Triggered before a layer is rendered.
     * @event module:ol/render/Event~RenderEvent#prerender
     * @api
     */
    PRERENDER: 'prerender',
    /**
     * Triggered after a layer is rendered.
     * @event module:ol/render/Event~RenderEvent#postrender
     * @api
     */
    POSTRENDER: 'postrender',
    /**
     * Triggered before layers are rendered.
     * The event object will not have a `context` set.
     * @event module:ol/render/Event~RenderEvent#precompose
     * @api
     */
    PRECOMPOSE: 'precompose',
    /**
     * Triggered after all layers are rendered.
     * The event object will not have a `context` set.
     * @event module:ol/render/Event~RenderEvent#postcompose
     * @api
     */
    POSTCOMPOSE: 'postcompose',
    /**
     * Triggered when rendering is complete, i.e. all sources and tiles have
     * finished loading for the current viewport, and all tiles are faded in.
     * The event object will not have a `context` set.
     * @event module:ol/render/Event~RenderEvent#rendercomplete
     * @api
     */
    RENDERCOMPLETE: 'rendercomplete',
};

/**
 * @module ol/size
 */
/**
 * Determines if a size has a positive area.
 * @param {Size} size The size to test.
 * @return {boolean} The size has a positive area.
 */
function hasArea(size) {
    return size[0] > 0 && size[1] > 0;
}

/**
 * @module ol/color
 */
/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */
function asString(color) {
    if (typeof color === 'string') {
        return color;
    }
    else {
        return toString(color);
    }
}
/**
 * @param {Color} color Color.
 * @return {string} String.
 */
function toString(color) {
    var r = color[0];
    if (r != (r | 0)) {
        r = (r + 0.5) | 0;
    }
    var g = color[1];
    if (g != (g | 0)) {
        g = (g + 0.5) | 0;
    }
    var b = color[2];
    if (b != (b | 0)) {
        b = (b + 0.5) | 0;
    }
    var a = color[3] === undefined ? 1 : color[3];
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

/**
 * @module ol/has
 */
var ua = typeof navigator !== 'undefined' && typeof navigator.userAgent !== 'undefined'
    ? navigator.userAgent.toLowerCase()
    : '';
/**
 * User agent string says we are dealing with Firefox as browser.
 * @type {boolean}
 */
var FIREFOX = ua.indexOf('firefox') !== -1;
/**
 * User agent string says we are dealing with Safari as browser.
 * @type {boolean}
 */
ua.indexOf('safari') !== -1 && ua.indexOf('chrom') == -1;
/**
 * User agent string says we are dealing with a WebKit engine.
 * @type {boolean}
 */
var WEBKIT = ua.indexOf('webkit') !== -1 && ua.indexOf('edge') == -1;
/**
 * User agent string says we are dealing with a Mac as platform.
 * @type {boolean}
 */
var MAC = ua.indexOf('macintosh') !== -1;
/**
 * The ratio between physical pixels and device-independent pixels
 * (dips) on the device (`window.devicePixelRatio`).
 * @const
 * @type {number}
 * @api
 */
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1;
/**
 * The execution context is a worker with OffscreenCanvas available.
 * @const
 * @type {boolean}
 */
typeof WorkerGlobalScope !== 'undefined' &&
    typeof OffscreenCanvas !== 'undefined' &&
    self instanceof WorkerGlobalScope; //eslint-disable-line
/**
 * Image.prototype.decode() is supported.
 * @type {boolean}
 */
var IMAGE_DECODE = typeof Image !== 'undefined' && Image.prototype.decode;
/**
 * @type {boolean}
 */
var PASSIVE_EVENT_LISTENERS = (function () {
    var passive = false;
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passive = true;
            },
        });
        window.addEventListener('_', null, options);
        window.removeEventListener('_', null, options);
    }
    catch (error) {
        // passive not supported
    }
    return passive;
})();

/**
 * @param {Node} newNode Node to replace old node
 * @param {Node} oldNode The node to be replaced
 */
function replaceNode(newNode, oldNode) {
    var parent = oldNode.parentNode;
    if (parent) {
        parent.replaceChild(newNode, oldNode);
    }
}
/**
 * @param {Node} node The node to remove.
 * @returns {Node} The node that was removed or null.
 */
function removeNode(node) {
    return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
/**
 * @param {Node} node The node to remove the children from.
 */
function removeChildren(node) {
    while (node.lastChild) {
        node.removeChild(node.lastChild);
    }
}
/**
 * Transform the children of a parent node so they match the
 * provided list of children.  This function aims to efficiently
 * remove, add, and reorder child nodes while maintaining a simple
 * implementation (it is not guaranteed to minimize DOM operations).
 * @param {Node} node The parent node whose children need reworking.
 * @param {Array<Node>} children The desired children.
 */
function replaceChildren(node, children) {
    var oldChildren = node.childNodes;
    for (var i = 0; true; ++i) {
        var oldChild = oldChildren[i];
        var newChild = children[i];
        // check if our work is done
        if (!oldChild && !newChild) {
            break;
        }
        // check if children match
        if (oldChild === newChild) {
            continue;
        }
        // check if a new child needs to be added
        if (!oldChild) {
            node.appendChild(newChild);
            continue;
        }
        // check if an old child needs to be removed
        if (!newChild) {
            node.removeChild(oldChild);
            --i;
            continue;
        }
        // reorder
        node.insertBefore(newChild, oldChild);
    }
}

/**
 * @module ol/css
 */
/**
 * @typedef {Object} FontParameters
 * @property {string} style
 * @property {string} variant
 * @property {string} weight
 * @property {string} size
 * @property {string} lineHeight
 * @property {string} family
 * @property {Array<string>} families
 */
/**
 * The CSS class for hidden feature.
 *
 * @const
 * @type {string}
 */
var CLASS_HIDDEN = 'ol-hidden';
/**
 * The CSS class that we'll give the DOM elements to have them unselectable.
 *
 * @const
 * @type {string}
 */
var CLASS_UNSELECTABLE = 'ol-unselectable';
/**
 * The CSS class for controls.
 *
 * @const
 * @type {string}
 */
var CLASS_CONTROL = 'ol-control';
/**
 * The CSS class that we'll give the DOM elements that are collapsed, i.e.
 * to those elements which usually can be expanded.
 *
 * @const
 * @type {string}
 */
var CLASS_COLLAPSED = 'ol-collapsed';

/**
 * @module ol/render/canvas
 */
/**
 * @type {BaseObject}
 */
var checkedFonts = new BaseObject();
/**
 * The label cache for text rendering. To change the default cache size of 2048
 * entries, use {@link module:ol/structs/LRUCache#setSize}.
 * Deprecated - there is no label cache any more.
 * @type {?}
 * @api
 * @deprecated
 */
var labelCache = new Target();
labelCache.setSize = function () {
    console.warn('labelCache is deprecated.'); //eslint-disable-line
};

/**
 * @module ol/layer/Property
 */
/**
 * @enum {string}
 */
var LayerProperty = {
    OPACITY: 'opacity',
    VISIBLE: 'visible',
    EXTENT: 'extent',
    Z_INDEX: 'zIndex',
    MAX_RESOLUTION: 'maxResolution',
    MIN_RESOLUTION: 'minResolution',
    MAX_ZOOM: 'maxZoom',
    MIN_ZOOM: 'minZoom',
    SOURCE: 'source',
};

var __extends$t = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */
var BaseLayer = /** @class */ (function (_super) {
    __extends$t(BaseLayer, _super);
    /**
     * @param {Options} options Layer options.
     */
    function BaseLayer(options) {
        var _this = _super.call(this) || this;
        /**
         * @type {Object<string, *>}
         */
        var properties = assign({}, options);
        properties[LayerProperty.OPACITY] =
            options.opacity !== undefined ? options.opacity : 1;
        assert(typeof properties[LayerProperty.OPACITY] === 'number', 64); // Layer opacity must be a number
        properties[LayerProperty.VISIBLE] =
            options.visible !== undefined ? options.visible : true;
        properties[LayerProperty.Z_INDEX] = options.zIndex;
        properties[LayerProperty.MAX_RESOLUTION] =
            options.maxResolution !== undefined ? options.maxResolution : Infinity;
        properties[LayerProperty.MIN_RESOLUTION] =
            options.minResolution !== undefined ? options.minResolution : 0;
        properties[LayerProperty.MIN_ZOOM] =
            options.minZoom !== undefined ? options.minZoom : -Infinity;
        properties[LayerProperty.MAX_ZOOM] =
            options.maxZoom !== undefined ? options.maxZoom : Infinity;
        /**
         * @type {string}
         * @private
         */
        _this.className_ =
            properties.className !== undefined ? options.className : 'ol-layer';
        delete properties.className;
        _this.setProperties(properties);
        /**
         * @type {import("./Layer.js").State}
         * @private
         */
        _this.state_ = null;
        return _this;
    }
    /**
     * @return {string} CSS class name.
     */
    BaseLayer.prototype.getClassName = function () {
        return this.className_;
    };
    /**
     * This method is not meant to be called by layers or layer renderers because the state
     * is incorrect if the layer is included in a layer group.
     *
     * @param {boolean=} opt_managed Layer is managed.
     * @return {import("./Layer.js").State} Layer state.
     */
    BaseLayer.prototype.getLayerState = function (opt_managed) {
        /** @type {import("./Layer.js").State} */
        var state = this.state_ ||
            /** @type {?} */ ({
                layer: this,
                managed: opt_managed === undefined ? true : opt_managed,
            });
        var zIndex = this.getZIndex();
        state.opacity = clamp(Math.round(this.getOpacity() * 100) / 100, 0, 1);
        state.sourceState = this.getSourceState();
        state.visible = this.getVisible();
        state.extent = this.getExtent();
        state.zIndex =
            zIndex !== undefined ? zIndex : state.managed === false ? Infinity : 0;
        state.maxResolution = this.getMaxResolution();
        state.minResolution = Math.max(this.getMinResolution(), 0);
        state.minZoom = this.getMinZoom();
        state.maxZoom = this.getMaxZoom();
        this.state_ = state;
        return state;
    };
    /**
     * @abstract
     * @param {Array<import("./Layer.js").default>=} opt_array Array of layers (to be
     *     modified in place).
     * @return {Array<import("./Layer.js").default>} Array of layers.
     */
    BaseLayer.prototype.getLayersArray = function (opt_array) {
        return abstract();
    };
    /**
     * @abstract
     * @param {Array<import("./Layer.js").State>=} opt_states Optional list of layer
     *     states (to be modified in place).
     * @return {Array<import("./Layer.js").State>} List of layer states.
     */
    BaseLayer.prototype.getLayerStatesArray = function (opt_states) {
        return abstract();
    };
    /**
     * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
     * will be visible regardless of extent.
     * @return {import("../extent.js").Extent|undefined} The layer extent.
     * @observable
     * @api
     */
    BaseLayer.prototype.getExtent = function () {
        return /** @type {import("../extent.js").Extent|undefined} */ (this.get(LayerProperty.EXTENT));
    };
    /**
     * Return the maximum resolution of the layer.
     * @return {number} The maximum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMaxResolution = function () {
        return /** @type {number} */ (this.get(LayerProperty.MAX_RESOLUTION));
    };
    /**
     * Return the minimum resolution of the layer.
     * @return {number} The minimum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMinResolution = function () {
        return /** @type {number} */ (this.get(LayerProperty.MIN_RESOLUTION));
    };
    /**
     * Return the minimum zoom level of the layer.
     * @return {number} The minimum zoom level of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMinZoom = function () {
        return /** @type {number} */ (this.get(LayerProperty.MIN_ZOOM));
    };
    /**
     * Return the maximum zoom level of the layer.
     * @return {number} The maximum zoom level of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMaxZoom = function () {
        return /** @type {number} */ (this.get(LayerProperty.MAX_ZOOM));
    };
    /**
     * Return the opacity of the layer (between 0 and 1).
     * @return {number} The opacity of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getOpacity = function () {
        return /** @type {number} */ (this.get(LayerProperty.OPACITY));
    };
    /**
     * @abstract
     * @return {import("../source/State.js").default} Source state.
     */
    BaseLayer.prototype.getSourceState = function () {
        return abstract();
    };
    /**
     * Return the visibility of the layer (`true` or `false`).
     * @return {boolean} The visibility of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getVisible = function () {
        return /** @type {boolean} */ (this.get(LayerProperty.VISIBLE));
    };
    /**
     * Return the Z-index of the layer, which is used to order layers before
     * rendering. The default Z-index is 0.
     * @return {number} The Z-index of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getZIndex = function () {
        return /** @type {number} */ (this.get(LayerProperty.Z_INDEX));
    };
    /**
     * Set the extent at which the layer is visible.  If `undefined`, the layer
     * will be visible at all extents.
     * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setExtent = function (extent) {
        this.set(LayerProperty.EXTENT, extent);
    };
    /**
     * Set the maximum resolution at which the layer is visible.
     * @param {number} maxResolution The maximum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMaxResolution = function (maxResolution) {
        this.set(LayerProperty.MAX_RESOLUTION, maxResolution);
    };
    /**
     * Set the minimum resolution at which the layer is visible.
     * @param {number} minResolution The minimum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMinResolution = function (minResolution) {
        this.set(LayerProperty.MIN_RESOLUTION, minResolution);
    };
    /**
     * Set the maximum zoom (exclusive) at which the layer is visible.
     * Note that the zoom levels for layer visibility are based on the
     * view zoom level, which may be different from a tile source zoom level.
     * @param {number} maxZoom The maximum zoom of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMaxZoom = function (maxZoom) {
        this.set(LayerProperty.MAX_ZOOM, maxZoom);
    };
    /**
     * Set the minimum zoom (inclusive) at which the layer is visible.
     * Note that the zoom levels for layer visibility are based on the
     * view zoom level, which may be different from a tile source zoom level.
     * @param {number} minZoom The minimum zoom of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMinZoom = function (minZoom) {
        this.set(LayerProperty.MIN_ZOOM, minZoom);
    };
    /**
     * Set the opacity of the layer, allowed values range from 0 to 1.
     * @param {number} opacity The opacity of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setOpacity = function (opacity) {
        assert(typeof opacity === 'number', 64); // Layer opacity must be a number
        this.set(LayerProperty.OPACITY, opacity);
    };
    /**
     * Set the visibility of the layer (`true` or `false`).
     * @param {boolean} visible The visibility of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setVisible = function (visible) {
        this.set(LayerProperty.VISIBLE, visible);
    };
    /**
     * Set Z-index of the layer, which is used to order layers before rendering.
     * The default Z-index is 0.
     * @param {number} zindex The z-index of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setZIndex = function (zindex) {
        this.set(LayerProperty.Z_INDEX, zindex);
    };
    /**
     * Clean up.
     */
    BaseLayer.prototype.disposeInternal = function () {
        if (this.state_) {
            this.state_.layer = null;
            this.state_ = null;
        }
        _super.prototype.disposeInternal.call(this);
    };
    return BaseLayer;
}(BaseObject));

/**
 * @module ol/source/State
 */
/**
 * @enum {string}
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */
var SourceState = {
    UNDEFINED: 'undefined',
    LOADING: 'loading',
    READY: 'ready',
    ERROR: 'error',
};

var __extends$s = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {function(import("../PluggableMap.js").FrameState):HTMLElement} RenderFunction
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../source/Source.js").default} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../PluggableMap.js").default} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 */
/**
 * @typedef {Object} State
 * @property {import("./Layer.js").default} layer
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {import("../source/State.js").default} sourceState
 * @property {boolean} visible
 * @property {boolean} managed
 * @property {import("../extent.js").Extent} [extent]
 * @property {number} zIndex
 * @property {number} maxResolution
 * @property {number} minResolution
 * @property {number} minZoom
 * @property {number} maxZoom
 */
/**
 * @classdesc
 * Base class from which all layer types are derived. This should only be instantiated
 * in the case where a custom layer is be added to the map with a custom `render` function.
 * Such a function can be specified in the `options` object, and is expected to return an HTML element.
 *
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with {@link module:ol/Map#addLayer}. Components
 * like {@link module:ol/interaction/Select~Select} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * {@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 *
 * Please note that for performance reasons several layers might get rendered to
 * the same HTML element, which will cause {@link module:ol/Map~Map#forEachLayerAtPixel} to
 * give false positives. To avoid this, apply different `className` properties to the
 * layers at creation time.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 *
 * @template {import("../source/Source.js").default} SourceType
 * @api
 */
/** @class */ ((function (_super) {
    __extends$s(Layer, _super);
    /**
     * @param {Options} options Layer options.
     */
    function Layer(options) {
        var _this = this;
        var baseOptions = assign({}, options);
        delete baseOptions.source;
        _this = _super.call(this, baseOptions) || this;
        /**
         * @private
         * @type {?import("../events.js").EventsKey}
         */
        _this.mapPrecomposeKey_ = null;
        /**
         * @private
         * @type {?import("../events.js").EventsKey}
         */
        _this.mapRenderKey_ = null;
        /**
         * @private
         * @type {?import("../events.js").EventsKey}
         */
        _this.sourceChangeKey_ = null;
        /**
         * @private
         * @type {import("../renderer/Layer.js").default}
         */
        _this.renderer_ = null;
        // Overwrite default render method with a custom one
        if (options.render) {
            _this.render = options.render;
        }
        if (options.map) {
            _this.setMap(options.map);
        }
        _this.addEventListener(getChangeEventType(LayerProperty.SOURCE), _this.handleSourcePropertyChange_);
        var source = options.source
            ? /** @type {SourceType} */ (options.source)
            : null;
        _this.setSource(source);
        return _this;
    }
    /**
     * @param {Array<import("./Layer.js").default>=} opt_array Array of layers (to be modified in place).
     * @return {Array<import("./Layer.js").default>} Array of layers.
     */
    Layer.prototype.getLayersArray = function (opt_array) {
        var array = opt_array ? opt_array : [];
        array.push(this);
        return array;
    };
    /**
     * @param {Array<import("./Layer.js").State>=} opt_states Optional list of layer states (to be modified in place).
     * @return {Array<import("./Layer.js").State>} List of layer states.
     */
    Layer.prototype.getLayerStatesArray = function (opt_states) {
        var states = opt_states ? opt_states : [];
        states.push(this.getLayerState());
        return states;
    };
    /**
     * Get the layer source.
     * @return {SourceType} The layer source (or `null` if not yet set).
     * @observable
     * @api
     */
    Layer.prototype.getSource = function () {
        return /** @type {SourceType} */ (this.get(LayerProperty.SOURCE)) || null;
    };
    /**
     * @return {import("../source/State.js").default} Source state.
     */
    Layer.prototype.getSourceState = function () {
        var source = this.getSource();
        return !source ? SourceState.UNDEFINED : source.getState();
    };
    /**
     * @private
     */
    Layer.prototype.handleSourceChange_ = function () {
        this.changed();
    };
    /**
     * @private
     */
    Layer.prototype.handleSourcePropertyChange_ = function () {
        if (this.sourceChangeKey_) {
            unlistenByKey(this.sourceChangeKey_);
            this.sourceChangeKey_ = null;
        }
        var source = this.getSource();
        if (source) {
            this.sourceChangeKey_ = listen(source, EventType.CHANGE, this.handleSourceChange_, this);
        }
        this.changed();
    };
    /**
     * @param {import("../pixel").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
     * an array of features.
     */
    Layer.prototype.getFeatures = function (pixel) {
        return this.renderer_.getFeatures(pixel);
    };
    /**
     * In charge to manage the rendering of the layer. One layer type is
     * bounded with one layer renderer.
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target which the renderer may (but need not) use
     * for rendering its content.
     * @return {HTMLElement} The rendered element.
     */
    Layer.prototype.render = function (frameState, target) {
        var layerRenderer = this.getRenderer();
        if (layerRenderer.prepareFrame(frameState)) {
            return layerRenderer.renderFrame(frameState, target);
        }
    };
    /**
     * Sets the layer to be rendered on top of other layers on a map. The map will
     * not manage this layer in its layers collection, and the callback in
     * {@link module:ol/Map#forEachLayerAtPixel} will receive `null` as layer. This
     * is useful for temporary layers. To remove an unmanaged layer from the map,
     * use `#setMap(null)`.
     *
     * To add the layer to a map and have it managed by the map, use
     * {@link module:ol/Map#addLayer} instead.
     * @param {import("../PluggableMap.js").default} map Map.
     * @api
     */
    Layer.prototype.setMap = function (map) {
        if (this.mapPrecomposeKey_) {
            unlistenByKey(this.mapPrecomposeKey_);
            this.mapPrecomposeKey_ = null;
        }
        if (!map) {
            this.changed();
        }
        if (this.mapRenderKey_) {
            unlistenByKey(this.mapRenderKey_);
            this.mapRenderKey_ = null;
        }
        if (map) {
            this.mapPrecomposeKey_ = listen(map, RenderEventType.PRECOMPOSE, function (evt) {
                var renderEvent = /** @type {import("../render/Event.js").default} */ (evt);
                var layerStatesArray = renderEvent.frameState.layerStatesArray;
                var layerState = this.getLayerState(false);
                // A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both.
                assert(!layerStatesArray.some(function (arrayLayerState) {
                    return arrayLayerState.layer === layerState.layer;
                }), 67);
                layerStatesArray.push(layerState);
            }, this);
            this.mapRenderKey_ = listen(this, EventType.CHANGE, map.render, map);
            this.changed();
        }
    };
    /**
     * Set the layer source.
     * @param {SourceType} source The layer source.
     * @observable
     * @api
     */
    Layer.prototype.setSource = function (source) {
        this.set(LayerProperty.SOURCE, source);
    };
    /**
     * Get the renderer for this layer.
     * @return {import("../renderer/Layer.js").default} The layer renderer.
     */
    Layer.prototype.getRenderer = function () {
        if (!this.renderer_) {
            this.renderer_ = this.createRenderer();
        }
        return this.renderer_;
    };
    /**
     * @return {boolean} The layer has a renderer.
     */
    Layer.prototype.hasRenderer = function () {
        return !!this.renderer_;
    };
    /**
     * Create a renderer for this layer.
     * @return {import("../renderer/Layer.js").default} A layer renderer.
     * @protected
     */
    Layer.prototype.createRenderer = function () {
        return null;
    };
    /**
     * Clean up.
     */
    Layer.prototype.disposeInternal = function () {
        this.setSource(null);
        _super.prototype.disposeInternal.call(this);
    };
    return Layer;
})(BaseLayer));
/**
 * Return `true` if the layer is visible and if the provided view state
 * has resolution and zoom levels that are in range of the layer's min/max.
 * @param {State} layerState Layer state.
 * @param {import("../View.js").State} viewState View state.
 * @return {boolean} The layer is visible at the given view state.
 */
function inView(layerState, viewState) {
    if (!layerState.visible) {
        return false;
    }
    var resolution = viewState.resolution;
    if (resolution < layerState.minResolution ||
        resolution >= layerState.maxResolution) {
        return false;
    }
    var zoom = viewState.zoom;
    return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
}

/**
 * @module ol/render/Event
 */
var __extends$r = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RenderEvent = /** @class */ (function (_super) {
    __extends$r(RenderEvent, _super);
    /**
     * @param {import("./EventType.js").default} type Type.
     * @param {import("../transform.js").Transform=} opt_inversePixelTransform Transform for
     *     CSS pixels to rendered pixels.
     * @param {import("../PluggableMap.js").FrameState=} opt_frameState Frame state.
     * @param {?CanvasRenderingContext2D=} opt_context Context.
     */
    function RenderEvent(type, opt_inversePixelTransform, opt_frameState, opt_context) {
        var _this = _super.call(this, type) || this;
        /**
         * Transform from CSS pixels (relative to the top-left corner of the map viewport)
         * to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
         * @type {import("../transform.js").Transform|undefined}
         * @api
         */
        _this.inversePixelTransform = opt_inversePixelTransform;
        /**
         * An object representing the current render frame state.
         * @type {import("../PluggableMap.js").FrameState|undefined}
         * @api
         */
        _this.frameState = opt_frameState;
        /**
         * Canvas context. Not available when the event is dispatched by the map. Only available
         * when a Canvas renderer is used, null otherwise.
         * @type {CanvasRenderingContext2D|null|undefined}
         * @api
         */
        _this.context = opt_context;
        return _this;
    }
    return RenderEvent;
}(BaseEvent));

/**
 * @module ol/ViewHint
 */
/**
 * @enum {number}
 */
var ViewHint = {
    ANIMATING: 0,
    INTERACTING: 1,
};

/**
 * @module ol/style/IconImageCache
 */
/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache~shared}.
 */
var IconImageCache = /** @class */ (function () {
    function IconImageCache() {
        /**
         * @type {!Object<string, import("./IconImage.js").default>}
         * @private
         */
        this.cache_ = {};
        /**
         * @type {number}
         * @private
         */
        this.cacheSize_ = 0;
        /**
         * @type {number}
         * @private
         */
        this.maxCacheSize_ = 32;
    }
    /**
     * FIXME empty description for jsdoc
     */
    IconImageCache.prototype.clear = function () {
        this.cache_ = {};
        this.cacheSize_ = 0;
    };
    /**
     * @return {boolean} Can expire cache.
     */
    IconImageCache.prototype.canExpireCache = function () {
        return this.cacheSize_ > this.maxCacheSize_;
    };
    /**
     * FIXME empty description for jsdoc
     */
    IconImageCache.prototype.expire = function () {
        if (this.canExpireCache()) {
            var i = 0;
            for (var key in this.cache_) {
                var iconImage = this.cache_[key];
                if ((i++ & 3) === 0 && !iconImage.hasListener()) {
                    delete this.cache_[key];
                    --this.cacheSize_;
                }
            }
        }
    };
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color} color Color.
     * @return {import("./IconImage.js").default} Icon image.
     */
    IconImageCache.prototype.get = function (src, crossOrigin, color) {
        var key = getKey(src, crossOrigin, color);
        return key in this.cache_ ? this.cache_[key] : null;
    };
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color} color Color.
     * @param {import("./IconImage.js").default} iconImage Icon image.
     */
    IconImageCache.prototype.set = function (src, crossOrigin, color, iconImage) {
        var key = getKey(src, crossOrigin, color);
        this.cache_[key] = iconImage;
        ++this.cacheSize_;
    };
    /**
     * Set the cache size of the icon cache. Default is `32`. Change this value when
     * your map uses more than 32 different icon images and you are not caching icon
     * styles on the application level.
     * @param {number} maxCacheSize Cache max size.
     * @api
     */
    IconImageCache.prototype.setSize = function (maxCacheSize) {
        this.maxCacheSize_ = maxCacheSize;
        this.expire();
    };
    return IconImageCache;
}());
/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../color.js").Color} color Color.
 * @return {string} Cache key.
 */
function getKey(src, crossOrigin, color) {
    var colorString = color ? asString(color) : 'null';
    return crossOrigin + ':' + src + ':' + colorString;
}
/**
 * The {@link module:ol/style/IconImageCache~IconImageCache} for
 * {@link module:ol/style/Icon~Icon} images.
 * @api
 */
var shared = new IconImageCache();

/**
 * @module ol/TileState
 */
/**
 * @enum {number}
 */
var TileState = {
    IDLE: 0,
    LOADING: 1,
    LOADED: 2,
    /**
     * Indicates that tile loading failed
     * @type {number}
     */
    ERROR: 3,
    EMPTY: 4,
};

/**
 * @module ol/easing
 */
/**
 * Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */
function easeIn(t) {
    return Math.pow(t, 3);
}
/**
 * Start fast and slow down.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */
function easeOut(t) {
    return 1 - easeIn(1 - t);
}
/**
 * Start slow, speed up, and then slow down again.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */
function inAndOut(t) {
    return 3 * t * t - 2 * t * t * t;
}
/**
 * Maintain a constant speed over time.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */
function linear(t) {
    return t;
}

/**
 * @module ol/Kinetic
 */
/**
 * @classdesc
 * Implementation of inertial deceleration for map movement.
 *
 * @api
 */
var Kinetic = /** @class */ (function () {
    /**
     * @param {number} decay Rate of decay (must be negative).
     * @param {number} minVelocity Minimum velocity (pixels/millisecond).
     * @param {number} delay Delay to consider to calculate the kinetic
     *     initial values (milliseconds).
     */
    function Kinetic(decay, minVelocity, delay) {
        /**
         * @private
         * @type {number}
         */
        this.decay_ = decay;
        /**
         * @private
         * @type {number}
         */
        this.minVelocity_ = minVelocity;
        /**
         * @private
         * @type {number}
         */
        this.delay_ = delay;
        /**
         * @private
         * @type {Array<number>}
         */
        this.points_ = [];
        /**
         * @private
         * @type {number}
         */
        this.angle_ = 0;
        /**
         * @private
         * @type {number}
         */
        this.initialVelocity_ = 0;
    }
    /**
     * FIXME empty description for jsdoc
     */
    Kinetic.prototype.begin = function () {
        this.points_.length = 0;
        this.angle_ = 0;
        this.initialVelocity_ = 0;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     */
    Kinetic.prototype.update = function (x, y) {
        this.points_.push(x, y, Date.now());
    };
    /**
     * @return {boolean} Whether we should do kinetic animation.
     */
    Kinetic.prototype.end = function () {
        if (this.points_.length < 6) {
            // at least 2 points are required (i.e. there must be at least 6 elements
            // in the array)
            return false;
        }
        var delay = Date.now() - this.delay_;
        var lastIndex = this.points_.length - 3;
        if (this.points_[lastIndex + 2] < delay) {
            // the last tracked point is too old, which means that the user stopped
            // panning before releasing the map
            return false;
        }
        // get the first point which still falls into the delay time
        var firstIndex = lastIndex - 3;
        while (firstIndex > 0 && this.points_[firstIndex + 2] > delay) {
            firstIndex -= 3;
        }
        var duration = this.points_[lastIndex + 2] - this.points_[firstIndex + 2];
        // we don't want a duration of 0 (divide by zero)
        // we also make sure the user panned for a duration of at least one frame
        // (1/60s) to compute sane displacement values
        if (duration < 1000 / 60) {
            return false;
        }
        var dx = this.points_[lastIndex] - this.points_[firstIndex];
        var dy = this.points_[lastIndex + 1] - this.points_[firstIndex + 1];
        this.angle_ = Math.atan2(dy, dx);
        this.initialVelocity_ = Math.sqrt(dx * dx + dy * dy) / duration;
        return this.initialVelocity_ > this.minVelocity_;
    };
    /**
     * @return {number} Total distance travelled (pixels).
     */
    Kinetic.prototype.getDistance = function () {
        return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
    };
    /**
     * @return {number} Angle of the kinetic panning animation (radians).
     */
    Kinetic.prototype.getAngle = function () {
        return this.angle_;
    };
    return Kinetic;
}());

var __extends$q = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef HitMatch
 * @property {import("../Feature.js").FeatureLike} feature
 * @property {import("../layer/Layer.js").default} layer
 * @property {import("../geom/SimpleGeometry.js").default} geometry
 * @property {number} distanceSq
 * @property {import("./vector.js").FeatureCallback<T>} callback
 * @template T
 */
/**
 * @abstract
 */
var MapRenderer = /** @class */ (function (_super) {
    __extends$q(MapRenderer, _super);
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     */
    function MapRenderer(map) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {import("../PluggableMap.js").default}
         */
        _this.map_ = map;
        return _this;
    }
    /**
     * @abstract
     * @param {import("../render/EventType.js").default} type Event type.
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    MapRenderer.prototype.dispatchRenderEvent = function (type, frameState) {
        abstract();
    };
    /**
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @protected
     */
    MapRenderer.prototype.calculateMatrices2D = function (frameState) {
        var viewState = frameState.viewState;
        var coordinateToPixelTransform = frameState.coordinateToPixelTransform;
        var pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;
        compose(coordinateToPixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / viewState.resolution, -1 / viewState.resolution, -viewState.rotation, -viewState.center[0], -viewState.center[1]);
        makeInverse(pixelToCoordinateTransform, coordinateToPixelTransform);
    };
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {boolean} checkWrapped Check for wrapped geometries.
     * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {S} thisArg Value to use as `this` when executing `callback`.
     * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
     * @return {T|undefined} Callback result.
     * @template S,T,U
     */
    MapRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, checkWrapped, callback, thisArg, layerFilter, thisArg2) {
        var result;
        var viewState = frameState.viewState;
        /**
         * @param {boolean} managed Managed layer.
         * @param {import("../Feature.js").FeatureLike} feature Feature.
         * @param {import("../layer/Layer.js").default} layer Layer.
         * @param {import("../geom/Geometry.js").default} geometry Geometry.
         * @return {T|undefined} Callback result.
         */
        function forEachFeatureAtCoordinate(managed, feature, layer, geometry) {
            return callback.call(thisArg, feature, managed ? layer : null, geometry);
        }
        var projection = viewState.projection;
        var translatedCoordinate = wrapX(coordinate.slice(), projection);
        var offsets = [[0, 0]];
        if (projection.canWrapX() && checkWrapped) {
            var projectionExtent = projection.getExtent();
            var worldWidth = getWidth(projectionExtent);
            offsets.push([-worldWidth, 0], [worldWidth, 0]);
        }
        var layerStates = frameState.layerStatesArray;
        var numLayers = layerStates.length;
        var matches = /** @type {Array<HitMatch<T>>} */ ([]);
        var tmpCoord = [];
        for (var i = 0; i < offsets.length; i++) {
            for (var j = numLayers - 1; j >= 0; --j) {
                var layerState = layerStates[j];
                var layer = layerState.layer;
                if (layer.hasRenderer() &&
                    inView(layerState, viewState) &&
                    layerFilter.call(thisArg2, layer)) {
                    var layerRenderer = layer.getRenderer();
                    var source = layer.getSource();
                    if (layerRenderer && source) {
                        var coordinates = source.getWrapX()
                            ? translatedCoordinate
                            : coordinate;
                        var callback_1 = forEachFeatureAtCoordinate.bind(null, layerState.managed);
                        tmpCoord[0] = coordinates[0] + offsets[i][0];
                        tmpCoord[1] = coordinates[1] + offsets[i][1];
                        result = layerRenderer.forEachFeatureAtCoordinate(tmpCoord, frameState, hitTolerance, callback_1, matches);
                    }
                    if (result) {
                        return result;
                    }
                }
            }
        }
        if (matches.length === 0) {
            return undefined;
        }
        var order = 1 / matches.length;
        matches.forEach(function (m, i) { return (m.distanceSq += i * order); });
        matches.sort(function (a, b) { return a.distanceSq - b.distanceSq; });
        matches.some(function (m) {
            return (result = m.callback(m.feature, m.layer, m.geometry));
        });
        return result;
    };
    /**
     * @abstract
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(import("../layer/Layer.js").default, (Uint8ClampedArray|Uint8Array)): T} callback Layer
     *     callback.
     * @param {function(import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @return {T|undefined} Callback result.
     * @template T
     */
    MapRenderer.prototype.forEachLayerAtPixel = function (pixel, frameState, hitTolerance, callback, layerFilter) {
        return abstract();
    };
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {boolean} checkWrapped Check for wrapped geometries.
     * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
     * @return {boolean} Is there a feature at the given coordinate?
     * @template U
     */
    MapRenderer.prototype.hasFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, checkWrapped, layerFilter, thisArg) {
        var hasFeature = this.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, TRUE, this, layerFilter, thisArg);
        return hasFeature !== undefined;
    };
    /**
     * @return {import("../PluggableMap.js").default} Map.
     */
    MapRenderer.prototype.getMap = function () {
        return this.map_;
    };
    /**
     * Render.
     * @abstract
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    MapRenderer.prototype.renderFrame = function (frameState) {
        abstract();
    };
    /**
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    MapRenderer.prototype.scheduleExpireIconCache = function (frameState) {
        if (shared.canExpireCache()) {
            frameState.postRenderFunctions.push(expireIconCache);
        }
    };
    return MapRenderer;
}(Disposable));
/**
 * @param {import("../PluggableMap.js").default} map Map.
 * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
 */
function expireIconCache(map, frameState) {
    shared.expire();
}

var __extends$p = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Canvas map renderer.
 * @api
 */
var CompositeMapRenderer = /** @class */ (function (_super) {
    __extends$p(CompositeMapRenderer, _super);
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     */
    function CompositeMapRenderer(map) {
        var _this = _super.call(this, map) || this;
        /**
         * @type {import("../events.js").EventsKey}
         */
        _this.fontChangeListenerKey_ = listen(checkedFonts, ObjectEventType.PROPERTYCHANGE, map.redrawText.bind(map));
        /**
         * @private
         * @type {HTMLDivElement}
         */
        _this.element_ = document.createElement('div');
        var style = _this.element_.style;
        style.position = 'absolute';
        style.width = '100%';
        style.height = '100%';
        style.zIndex = '0';
        _this.element_.className = CLASS_UNSELECTABLE + ' ol-layers';
        var container = map.getViewport();
        container.insertBefore(_this.element_, container.firstChild || null);
        /**
         * @private
         * @type {Array<HTMLElement>}
         */
        _this.children_ = [];
        /**
         * @private
         * @type {boolean}
         */
        _this.renderedVisible_ = true;
        return _this;
    }
    /**
     * @param {import("../render/EventType.js").default} type Event type.
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    CompositeMapRenderer.prototype.dispatchRenderEvent = function (type, frameState) {
        var map = this.getMap();
        if (map.hasListener(type)) {
            var event_1 = new RenderEvent(type, undefined, frameState);
            map.dispatchEvent(event_1);
        }
    };
    CompositeMapRenderer.prototype.disposeInternal = function () {
        unlistenByKey(this.fontChangeListenerKey_);
        this.element_.parentNode.removeChild(this.element_);
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Render.
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    CompositeMapRenderer.prototype.renderFrame = function (frameState) {
        if (!frameState) {
            if (this.renderedVisible_) {
                this.element_.style.display = 'none';
                this.renderedVisible_ = false;
            }
            return;
        }
        this.calculateMatrices2D(frameState);
        this.dispatchRenderEvent(RenderEventType.PRECOMPOSE, frameState);
        var layerStatesArray = frameState.layerStatesArray.sort(function (a, b) {
            return a.zIndex - b.zIndex;
        });
        var viewState = frameState.viewState;
        this.children_.length = 0;
        /**
         * @type {Array<import("../layer/BaseVector.js").default>}
         */
        var declutterLayers = [];
        var previousElement = null;
        for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
            var layerState = layerStatesArray[i];
            frameState.layerIndex = i;
            if (!inView(layerState, viewState) ||
                (layerState.sourceState != SourceState.READY &&
                    layerState.sourceState != SourceState.UNDEFINED)) {
                continue;
            }
            var layer = layerState.layer;
            var element = layer.render(frameState, previousElement);
            if (!element) {
                continue;
            }
            if (element !== previousElement) {
                this.children_.push(element);
                previousElement = element;
            }
            if ('getDeclutter' in layer) {
                declutterLayers.push(layer);
            }
        }
        for (var i = declutterLayers.length - 1; i >= 0; --i) {
            declutterLayers[i].renderDeclutter(frameState);
        }
        replaceChildren(this.element_, this.children_);
        this.dispatchRenderEvent(RenderEventType.POSTCOMPOSE, frameState);
        if (!this.renderedVisible_) {
            this.element_.style.display = '';
            this.renderedVisible_ = true;
        }
        this.scheduleExpireIconCache(frameState);
    };
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(import("../layer/Layer.js").default, (Uint8ClampedArray|Uint8Array)): T} callback Layer
     *     callback.
     * @param {function(import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @return {T|undefined} Callback result.
     * @template T
     */
    CompositeMapRenderer.prototype.forEachLayerAtPixel = function (pixel, frameState, hitTolerance, callback, layerFilter) {
        var viewState = frameState.viewState;
        var layerStates = frameState.layerStatesArray;
        var numLayers = layerStates.length;
        for (var i = numLayers - 1; i >= 0; --i) {
            var layerState = layerStates[i];
            var layer = layerState.layer;
            if (layer.hasRenderer() &&
                inView(layerState, viewState) &&
                layerFilter(layer)) {
                var layerRenderer = layer.getRenderer();
                var data = layerRenderer.getDataAtPixel(pixel, frameState, hitTolerance);
                if (data) {
                    var result = callback(layer, data);
                    if (result) {
                        return result;
                    }
                }
            }
        }
        return undefined;
    };
    return CompositeMapRenderer;
}(MapRenderer));

var __extends$o = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {Array<import("./Base.js").default>|import("../Collection.js").default<import("./Base.js").default>} [layers] Child layers.
 */
/**
 * @enum {string}
 * @private
 */
var Property = {
    LAYERS: 'layers',
};
/**
 * @classdesc
 * A {@link module:ol/Collection~Collection} of layers that are handled together.
 *
 * A generic `change` event is triggered when the group/Collection changes.
 *
 * @api
 */
var LayerGroup = /** @class */ (function (_super) {
    __extends$o(LayerGroup, _super);
    /**
     * @param {Options=} opt_options Layer options.
     */
    function LayerGroup(opt_options) {
        var _this = this;
        var options = opt_options || {};
        var baseOptions = /** @type {Options} */ (assign({}, options));
        delete baseOptions.layers;
        var layers = options.layers;
        _this = _super.call(this, baseOptions) || this;
        /**
         * @private
         * @type {Array<import("../events.js").EventsKey>}
         */
        _this.layersListenerKeys_ = [];
        /**
         * @private
         * @type {Object<string, Array<import("../events.js").EventsKey>>}
         */
        _this.listenerKeys_ = {};
        _this.addEventListener(getChangeEventType(Property.LAYERS), _this.handleLayersChanged_);
        if (layers) {
            if (Array.isArray(layers)) {
                layers = new Collection(layers.slice(), { unique: true });
            }
            else {
                assert(typeof ( /** @type {?} */(layers).getArray) === 'function', 43); // Expected `layers` to be an array or a `Collection`
            }
        }
        else {
            layers = new Collection(undefined, { unique: true });
        }
        _this.setLayers(layers);
        return _this;
    }
    /**
     * @private
     */
    LayerGroup.prototype.handleLayerChange_ = function () {
        this.changed();
    };
    /**
     * @private
     */
    LayerGroup.prototype.handleLayersChanged_ = function () {
        this.layersListenerKeys_.forEach(unlistenByKey);
        this.layersListenerKeys_.length = 0;
        var layers = this.getLayers();
        this.layersListenerKeys_.push(listen(layers, CollectionEventType.ADD, this.handleLayersAdd_, this), listen(layers, CollectionEventType.REMOVE, this.handleLayersRemove_, this));
        for (var id in this.listenerKeys_) {
            this.listenerKeys_[id].forEach(unlistenByKey);
        }
        clear(this.listenerKeys_);
        var layersArray = layers.getArray();
        for (var i = 0, ii = layersArray.length; i < ii; i++) {
            var layer = layersArray[i];
            this.listenerKeys_[getUid(layer)] = [
                listen(layer, ObjectEventType.PROPERTYCHANGE, this.handleLayerChange_, this),
                listen(layer, EventType.CHANGE, this.handleLayerChange_, this),
            ];
        }
        this.changed();
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
     * @private
     */
    LayerGroup.prototype.handleLayersAdd_ = function (collectionEvent) {
        var layer = /** @type {import("./Base.js").default} */ (collectionEvent.element);
        this.listenerKeys_[getUid(layer)] = [
            listen(layer, ObjectEventType.PROPERTYCHANGE, this.handleLayerChange_, this),
            listen(layer, EventType.CHANGE, this.handleLayerChange_, this),
        ];
        this.changed();
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
     * @private
     */
    LayerGroup.prototype.handleLayersRemove_ = function (collectionEvent) {
        var layer = /** @type {import("./Base.js").default} */ (collectionEvent.element);
        var key = getUid(layer);
        this.listenerKeys_[key].forEach(unlistenByKey);
        delete this.listenerKeys_[key];
        this.changed();
    };
    /**
     * Returns the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @return {!import("../Collection.js").default<import("./Base.js").default>} Collection of
     *   {@link module:ol/layer/Base layers} that are part of this group.
     * @observable
     * @api
     */
    LayerGroup.prototype.getLayers = function () {
        return /** @type {!import("../Collection.js").default<import("./Base.js").default>} */ (this.get(Property.LAYERS));
    };
    /**
     * Set the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @param {!import("../Collection.js").default<import("./Base.js").default>} layers Collection of
     *   {@link module:ol/layer/Base layers} that are part of this group.
     * @observable
     * @api
     */
    LayerGroup.prototype.setLayers = function (layers) {
        this.set(Property.LAYERS, layers);
    };
    /**
     * @param {Array<import("./Layer.js").default>=} opt_array Array of layers (to be modified in place).
     * @return {Array<import("./Layer.js").default>} Array of layers.
     */
    LayerGroup.prototype.getLayersArray = function (opt_array) {
        var array = opt_array !== undefined ? opt_array : [];
        this.getLayers().forEach(function (layer) {
            layer.getLayersArray(array);
        });
        return array;
    };
    /**
     * @param {Array<import("./Layer.js").State>=} opt_states Optional list of layer states (to be modified in place).
     * @return {Array<import("./Layer.js").State>} List of layer states.
     */
    LayerGroup.prototype.getLayerStatesArray = function (opt_states) {
        var states = opt_states !== undefined ? opt_states : [];
        var pos = states.length;
        this.getLayers().forEach(function (layer) {
            layer.getLayerStatesArray(states);
        });
        var ownLayerState = this.getLayerState();
        for (var i = pos, ii = states.length; i < ii; i++) {
            var layerState = states[i];
            layerState.opacity *= ownLayerState.opacity;
            layerState.visible = layerState.visible && ownLayerState.visible;
            layerState.maxResolution = Math.min(layerState.maxResolution, ownLayerState.maxResolution);
            layerState.minResolution = Math.max(layerState.minResolution, ownLayerState.minResolution);
            layerState.minZoom = Math.max(layerState.minZoom, ownLayerState.minZoom);
            layerState.maxZoom = Math.min(layerState.maxZoom, ownLayerState.maxZoom);
            if (ownLayerState.extent !== undefined) {
                if (layerState.extent !== undefined) {
                    layerState.extent = getIntersection(layerState.extent, ownLayerState.extent);
                }
                else {
                    layerState.extent = ownLayerState.extent;
                }
            }
        }
        return states;
    };
    /**
     * @return {import("../source/State.js").default} Source state.
     */
    LayerGroup.prototype.getSourceState = function () {
        return SourceState.READY;
    };
    return LayerGroup;
}(BaseLayer));

var __extends$n = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Events emitted as map events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map event.
 */
var MapEvent = /** @class */ (function (_super) {
    __extends$n(MapEvent, _super);
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {?import("./PluggableMap.js").FrameState=} opt_frameState Frame state.
     */
    function MapEvent(type, map, opt_frameState) {
        var _this = _super.call(this, type) || this;
        /**
         * The map where the event occurred.
         * @type {import("./PluggableMap.js").default}
         * @api
         */
        _this.map = map;
        /**
         * The frame state at the time of the event.
         * @type {?import("./PluggableMap.js").FrameState}
         * @api
         */
        _this.frameState = opt_frameState !== undefined ? opt_frameState : null;
        return _this;
    }
    return MapEvent;
}(BaseEvent));

var __extends$m = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map browser event.
 * @template {UIEvent} EVENT
 */
var MapBrowserEvent = /** @class */ (function (_super) {
    __extends$m(MapBrowserEvent, _super);
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {EVENT} originalEvent Original event.
     * @param {boolean=} opt_dragging Is the map currently being dragged?
     * @param {?import("./PluggableMap.js").FrameState=} opt_frameState Frame state.
     */
    function MapBrowserEvent(type, map, originalEvent, opt_dragging, opt_frameState) {
        var _this = _super.call(this, type, map, opt_frameState) || this;
        /**
         * The original browser event.
         * @const
         * @type {EVENT}
         * @api
         */
        _this.originalEvent = originalEvent;
        /**
         * The map pixel relative to the viewport corresponding to the original browser event.
         * @type {?import("./pixel.js").Pixel}
         */
        _this.pixel_ = null;
        /**
         * The coordinate in the user projection corresponding to the original browser event.
         * @type {?import("./coordinate.js").Coordinate}
         */
        _this.coordinate_ = null;
        /**
         * Indicates if the map is currently being dragged. Only set for
         * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
         *
         * @type {boolean}
         * @api
         */
        _this.dragging = opt_dragging !== undefined ? opt_dragging : false;
        return _this;
    }
    Object.defineProperty(MapBrowserEvent.prototype, "pixel", {
        /**
         * The map pixel relative to the viewport corresponding to the original event.
         * @type {import("./pixel.js").Pixel}
         * @api
         */
        get: function () {
            if (!this.pixel_) {
                this.pixel_ = this.map.getEventPixel(this.originalEvent);
            }
            return this.pixel_;
        },
        set: function (pixel) {
            this.pixel_ = pixel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapBrowserEvent.prototype, "coordinate", {
        /**
         * The coordinate corresponding to the original browser event.  This will be in the user
         * projection if one is set.  Otherwise it will be in the view projection.
         * @type {import("./coordinate.js").Coordinate}
         * @api
         */
        get: function () {
            if (!this.coordinate_) {
                this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel);
            }
            return this.coordinate_;
        },
        set: function (coordinate) {
            this.coordinate_ = coordinate;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Prevents the default browser action.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
     * @api
     */
    MapBrowserEvent.prototype.preventDefault = function () {
        _super.prototype.preventDefault.call(this);
        this.originalEvent.preventDefault();
    };
    /**
     * Prevents further propagation of the current event.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
     * @api
     */
    MapBrowserEvent.prototype.stopPropagation = function () {
        _super.prototype.stopPropagation.call(this);
        this.originalEvent.stopPropagation();
    };
    return MapBrowserEvent;
}(MapEvent));

/**
 * @module ol/MapBrowserEventType
 */
/**
 * Constants for event names.
 * @enum {string}
 */
var MapBrowserEventType = {
    /**
     * A true single click with no dragging and no double click. Note that this
     * event is delayed by 250 ms to ensure that it is not a double click.
     * @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
     * @api
     */
    SINGLECLICK: 'singleclick',
    /**
     * A click with no dragging. A double click will fire two of this.
     * @event module:ol/MapBrowserEvent~MapBrowserEvent#click
     * @api
     */
    CLICK: EventType.CLICK,
    /**
     * A true double click, with no dragging.
     * @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
     * @api
     */
    DBLCLICK: EventType.DBLCLICK,
    /**
     * Triggered when a pointer is dragged.
     * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
     * @api
     */
    POINTERDRAG: 'pointerdrag',
    /**
     * Triggered when a pointer is moved. Note that on touch devices this is
     * triggered when the map is panned, so is not the same as mousemove.
     * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
     * @api
     */
    POINTERMOVE: 'pointermove',
    POINTERDOWN: 'pointerdown',
    POINTERUP: 'pointerup',
    POINTEROVER: 'pointerover',
    POINTEROUT: 'pointerout',
    POINTERENTER: 'pointerenter',
    POINTERLEAVE: 'pointerleave',
    POINTERCANCEL: 'pointercancel',
};

/**
 * @module ol/pointer/EventType
 */
/**
 * Constants for event names.
 * @enum {string}
 */
var PointerEventType = {
    POINTERMOVE: 'pointermove',
    POINTERDOWN: 'pointerdown',
    POINTERUP: 'pointerup',
    POINTEROVER: 'pointerover',
    POINTEROUT: 'pointerout',
    POINTERENTER: 'pointerenter',
    POINTERLEAVE: 'pointerleave',
    POINTERCANCEL: 'pointercancel',
};

/**
 * @module ol/MapBrowserEventHandler
 */
var __extends$l = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MapBrowserEventHandler = /** @class */ (function (_super) {
    __extends$l(MapBrowserEventHandler, _super);
    /**
     * @param {import("./PluggableMap.js").default} map The map with the viewport to listen to events on.
     * @param {number=} moveTolerance The minimal distance the pointer must travel to trigger a move.
     */
    function MapBrowserEventHandler(map, moveTolerance) {
        var _this = _super.call(this, map) || this;
        /**
         * This is the element that we will listen to the real events on.
         * @type {import("./PluggableMap.js").default}
         * @private
         */
        _this.map_ = map;
        /**
         * @type {any}
         * @private
         */
        _this.clickTimeoutId_;
        /**
         * Emulate dblclick and singleclick. Will be true when only one pointer is active.
         * @type {boolean}
         */
        _this.emulateClicks_ = false;
        /**
         * @type {boolean}
         * @private
         */
        _this.dragging_ = false;
        /**
         * @type {!Array<import("./events.js").EventsKey>}
         * @private
         */
        _this.dragListenerKeys_ = [];
        /**
         * @type {number}
         * @private
         */
        _this.moveTolerance_ = moveTolerance
            ? moveTolerance * DEVICE_PIXEL_RATIO
            : DEVICE_PIXEL_RATIO;
        /**
         * The most recent "down" type event (or null if none have occurred).
         * Set on pointerdown.
         * @type {PointerEvent}
         * @private
         */
        _this.down_ = null;
        var element = _this.map_.getViewport();
        /**
         * @type {number}
         * @private
         */
        _this.activePointers_ = 0;
        /**
         * @type {!Object<number, boolean>}
         * @private
         */
        _this.trackedTouches_ = {};
        _this.element_ = element;
        /**
         * @type {?import("./events.js").EventsKey}
         * @private
         */
        _this.pointerdownListenerKey_ = listen(element, PointerEventType.POINTERDOWN, _this.handlePointerDown_, _this);
        /**
         * @type {PointerEvent}
         * @private
         */
        _this.originalPointerMoveEvent_;
        /**
         * @type {?import("./events.js").EventsKey}
         * @private
         */
        _this.relayedListenerKey_ = listen(element, PointerEventType.POINTERMOVE, _this.relayEvent_, _this);
        /**
         * @private
         */
        _this.boundHandleTouchMove_ = _this.handleTouchMove_.bind(_this);
        _this.element_.addEventListener(EventType.TOUCHMOVE, _this.boundHandleTouchMove_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
        return _this;
    }
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    MapBrowserEventHandler.prototype.emulateClick_ = function (pointerEvent) {
        var newEvent = new MapBrowserEvent(MapBrowserEventType.CLICK, this.map_, pointerEvent);
        this.dispatchEvent(newEvent);
        if (this.clickTimeoutId_ !== undefined) {
            // double-click
            clearTimeout(this.clickTimeoutId_);
            this.clickTimeoutId_ = undefined;
            newEvent = new MapBrowserEvent(MapBrowserEventType.DBLCLICK, this.map_, pointerEvent);
            this.dispatchEvent(newEvent);
        }
        else {
            // click
            this.clickTimeoutId_ = setTimeout(
            /** @this {MapBrowserEventHandler} */
            function () {
                this.clickTimeoutId_ = undefined;
                var newEvent = new MapBrowserEvent(MapBrowserEventType.SINGLECLICK, this.map_, pointerEvent);
                this.dispatchEvent(newEvent);
            }.bind(this), 250);
        }
    };
    /**
     * Keeps track on how many pointers are currently active.
     *
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    MapBrowserEventHandler.prototype.updateActivePointers_ = function (pointerEvent) {
        var event = pointerEvent;
        if (event.type == MapBrowserEventType.POINTERUP ||
            event.type == MapBrowserEventType.POINTERCANCEL) {
            delete this.trackedTouches_[event.pointerId];
        }
        else if (event.type == MapBrowserEventType.POINTERDOWN) {
            this.trackedTouches_[event.pointerId] = true;
        }
        this.activePointers_ = Object.keys(this.trackedTouches_).length;
    };
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    MapBrowserEventHandler.prototype.handlePointerUp_ = function (pointerEvent) {
        this.updateActivePointers_(pointerEvent);
        var newEvent = new MapBrowserEvent(MapBrowserEventType.POINTERUP, this.map_, pointerEvent);
        this.dispatchEvent(newEvent);
        // We emulate click events on left mouse button click, touch contact, and pen
        // contact. isMouseActionButton returns true in these cases (evt.button is set
        // to 0).
        // See http://www.w3.org/TR/pointerevents/#button-states
        // We only fire click, singleclick, and doubleclick if nobody has called
        // event.stopPropagation() or event.preventDefault().
        if (this.emulateClicks_ &&
            !newEvent.propagationStopped &&
            !this.dragging_ &&
            this.isMouseActionButton_(pointerEvent)) {
            this.emulateClick_(this.down_);
        }
        if (this.activePointers_ === 0) {
            this.dragListenerKeys_.forEach(unlistenByKey);
            this.dragListenerKeys_.length = 0;
            this.dragging_ = false;
            this.down_ = null;
        }
    };
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @return {boolean} If the left mouse button was pressed.
     * @private
     */
    MapBrowserEventHandler.prototype.isMouseActionButton_ = function (pointerEvent) {
        return pointerEvent.button === 0;
    };
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    MapBrowserEventHandler.prototype.handlePointerDown_ = function (pointerEvent) {
        this.emulateClicks_ = this.activePointers_ === 0;
        this.updateActivePointers_(pointerEvent);
        var newEvent = new MapBrowserEvent(MapBrowserEventType.POINTERDOWN, this.map_, pointerEvent);
        this.dispatchEvent(newEvent);
        this.down_ = pointerEvent;
        if (this.dragListenerKeys_.length === 0) {
            var doc = this.map_.getOwnerDocument();
            this.dragListenerKeys_.push(listen(doc, MapBrowserEventType.POINTERMOVE, this.handlePointerMove_, this), listen(doc, MapBrowserEventType.POINTERUP, this.handlePointerUp_, this), 
            /* Note that the listener for `pointercancel is set up on
             * `pointerEventHandler_` and not `documentPointerEventHandler_` like
             * the `pointerup` and `pointermove` listeners.
             *
             * The reason for this is the following: `TouchSource.vacuumTouches_()`
             * issues `pointercancel` events, when there was no `touchend` for a
             * `touchstart`. Now, let's say a first `touchstart` is registered on
             * `pointerEventHandler_`. The `documentPointerEventHandler_` is set up.
             * But `documentPointerEventHandler_` doesn't know about the first
             * `touchstart`. If there is no `touchend` for the `touchstart`, we can
             * only receive a `touchcancel` from `pointerEventHandler_`, because it is
             * only registered there.
             */
            listen(this.element_, MapBrowserEventType.POINTERCANCEL, this.handlePointerUp_, this));
            if (this.element_.getRootNode && this.element_.getRootNode() !== doc) {
                this.dragListenerKeys_.push(listen(this.element_.getRootNode(), MapBrowserEventType.POINTERUP, this.handlePointerUp_, this));
            }
        }
    };
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    MapBrowserEventHandler.prototype.handlePointerMove_ = function (pointerEvent) {
        // Between pointerdown and pointerup, pointermove events are triggered.
        // To avoid a 'false' touchmove event to be dispatched, we test if the pointer
        // moved a significant distance.
        if (this.isMoving_(pointerEvent)) {
            this.dragging_ = true;
            var newEvent = new MapBrowserEvent(MapBrowserEventType.POINTERDRAG, this.map_, pointerEvent, this.dragging_);
            this.dispatchEvent(newEvent);
        }
    };
    /**
     * Wrap and relay a pointer event.  Note that this requires that the type
     * string for the MapBrowserEvent matches the PointerEvent type.
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    MapBrowserEventHandler.prototype.relayEvent_ = function (pointerEvent) {
        this.originalPointerMoveEvent_ = pointerEvent;
        var dragging = !!(this.down_ && this.isMoving_(pointerEvent));
        this.dispatchEvent(new MapBrowserEvent(pointerEvent.type, this.map_, pointerEvent, dragging));
    };
    /**
     * Flexible handling of a `touch-action: none` css equivalent: because calling
     * `preventDefault()` on a `pointermove` event does not stop native page scrolling
     * and zooming, we also listen for `touchmove` and call `preventDefault()` on it
     * when an interaction (currently `DragPan` handles the event.
     * @param {TouchEvent} event Event.
     * @private
     */
    MapBrowserEventHandler.prototype.handleTouchMove_ = function (event) {
        // Due to https://github.com/mpizenberg/elm-pep/issues/2, `this.originalPointerMoveEvent_`
        // may not be initialized yet when we get here on a platform without native pointer events.
        if (!this.originalPointerMoveEvent_ ||
            this.originalPointerMoveEvent_.defaultPrevented) {
            event.preventDefault();
        }
    };
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @return {boolean} Is moving.
     * @private
     */
    MapBrowserEventHandler.prototype.isMoving_ = function (pointerEvent) {
        return (this.dragging_ ||
            Math.abs(pointerEvent.clientX - this.down_.clientX) >
                this.moveTolerance_ ||
            Math.abs(pointerEvent.clientY - this.down_.clientY) > this.moveTolerance_);
    };
    /**
     * Clean up.
     */
    MapBrowserEventHandler.prototype.disposeInternal = function () {
        if (this.relayedListenerKey_) {
            unlistenByKey(this.relayedListenerKey_);
            this.relayedListenerKey_ = null;
        }
        this.element_.removeEventListener(EventType.TOUCHMOVE, this.boundHandleTouchMove_);
        if (this.pointerdownListenerKey_) {
            unlistenByKey(this.pointerdownListenerKey_);
            this.pointerdownListenerKey_ = null;
        }
        this.dragListenerKeys_.forEach(unlistenByKey);
        this.dragListenerKeys_.length = 0;
        this.element_ = null;
        _super.prototype.disposeInternal.call(this);
    };
    return MapBrowserEventHandler;
}(Target));

/**
 * @module ol/MapEventType
 */
/**
 * @enum {string}
 */
var MapEventType = {
    /**
     * Triggered after a map frame is rendered.
     * @event module:ol/MapEvent~MapEvent#postrender
     * @api
     */
    POSTRENDER: 'postrender',
    /**
     * Triggered when the map starts moving.
     * @event module:ol/MapEvent~MapEvent#movestart
     * @api
     */
    MOVESTART: 'movestart',
    /**
     * Triggered after the map is moved.
     * @event module:ol/MapEvent~MapEvent#moveend
     * @api
     */
    MOVEEND: 'moveend',
};

/**
 * @module ol/MapProperty
 */
/**
 * @enum {string}
 */
var MapProperty = {
    LAYERGROUP: 'layergroup',
    SIZE: 'size',
    TARGET: 'target',
    VIEW: 'view',
};

/**
 * @module ol/structs/PriorityQueue
 */
/**
 * @type {number}
 */
var DROP = Infinity;
/**
 * @classdesc
 * Priority queue.
 *
 * The implementation is inspired from the Closure Library's Heap class and
 * Python's heapq module.
 *
 * See http://closure-library.googlecode.com/svn/docs/closure_goog_structs_heap.js.source.html
 * and http://hg.python.org/cpython/file/2.7/Lib/heapq.py.
 *
 * @template T
 */
var PriorityQueue = /** @class */ (function () {
    /**
     * @param {function(T): number} priorityFunction Priority function.
     * @param {function(T): string} keyFunction Key function.
     */
    function PriorityQueue(priorityFunction, keyFunction) {
        /**
         * @type {function(T): number}
         * @private
         */
        this.priorityFunction_ = priorityFunction;
        /**
         * @type {function(T): string}
         * @private
         */
        this.keyFunction_ = keyFunction;
        /**
         * @type {Array<T>}
         * @private
         */
        this.elements_ = [];
        /**
         * @type {Array<number>}
         * @private
         */
        this.priorities_ = [];
        /**
         * @type {!Object<string, boolean>}
         * @private
         */
        this.queuedElements_ = {};
    }
    /**
     * FIXME empty description for jsdoc
     */
    PriorityQueue.prototype.clear = function () {
        this.elements_.length = 0;
        this.priorities_.length = 0;
        clear(this.queuedElements_);
    };
    /**
     * Remove and return the highest-priority element. O(log N).
     * @return {T} Element.
     */
    PriorityQueue.prototype.dequeue = function () {
        var elements = this.elements_;
        var priorities = this.priorities_;
        var element = elements[0];
        if (elements.length == 1) {
            elements.length = 0;
            priorities.length = 0;
        }
        else {
            elements[0] = elements.pop();
            priorities[0] = priorities.pop();
            this.siftUp_(0);
        }
        var elementKey = this.keyFunction_(element);
        delete this.queuedElements_[elementKey];
        return element;
    };
    /**
     * Enqueue an element. O(log N).
     * @param {T} element Element.
     * @return {boolean} The element was added to the queue.
     */
    PriorityQueue.prototype.enqueue = function (element) {
        assert(!(this.keyFunction_(element) in this.queuedElements_), 31); // Tried to enqueue an `element` that was already added to the queue
        var priority = this.priorityFunction_(element);
        if (priority != DROP) {
            this.elements_.push(element);
            this.priorities_.push(priority);
            this.queuedElements_[this.keyFunction_(element)] = true;
            this.siftDown_(0, this.elements_.length - 1);
            return true;
        }
        return false;
    };
    /**
     * @return {number} Count.
     */
    PriorityQueue.prototype.getCount = function () {
        return this.elements_.length;
    };
    /**
     * Gets the index of the left child of the node at the given index.
     * @param {number} index The index of the node to get the left child for.
     * @return {number} The index of the left child.
     * @private
     */
    PriorityQueue.prototype.getLeftChildIndex_ = function (index) {
        return index * 2 + 1;
    };
    /**
     * Gets the index of the right child of the node at the given index.
     * @param {number} index The index of the node to get the right child for.
     * @return {number} The index of the right child.
     * @private
     */
    PriorityQueue.prototype.getRightChildIndex_ = function (index) {
        return index * 2 + 2;
    };
    /**
     * Gets the index of the parent of the node at the given index.
     * @param {number} index The index of the node to get the parent for.
     * @return {number} The index of the parent.
     * @private
     */
    PriorityQueue.prototype.getParentIndex_ = function (index) {
        return (index - 1) >> 1;
    };
    /**
     * Make this a heap. O(N).
     * @private
     */
    PriorityQueue.prototype.heapify_ = function () {
        var i;
        for (i = (this.elements_.length >> 1) - 1; i >= 0; i--) {
            this.siftUp_(i);
        }
    };
    /**
     * @return {boolean} Is empty.
     */
    PriorityQueue.prototype.isEmpty = function () {
        return this.elements_.length === 0;
    };
    /**
     * @param {string} key Key.
     * @return {boolean} Is key queued.
     */
    PriorityQueue.prototype.isKeyQueued = function (key) {
        return key in this.queuedElements_;
    };
    /**
     * @param {T} element Element.
     * @return {boolean} Is queued.
     */
    PriorityQueue.prototype.isQueued = function (element) {
        return this.isKeyQueued(this.keyFunction_(element));
    };
    /**
     * @param {number} index The index of the node to move down.
     * @private
     */
    PriorityQueue.prototype.siftUp_ = function (index) {
        var elements = this.elements_;
        var priorities = this.priorities_;
        var count = elements.length;
        var element = elements[index];
        var priority = priorities[index];
        var startIndex = index;
        while (index < count >> 1) {
            var lIndex = this.getLeftChildIndex_(index);
            var rIndex = this.getRightChildIndex_(index);
            var smallerChildIndex = rIndex < count && priorities[rIndex] < priorities[lIndex]
                ? rIndex
                : lIndex;
            elements[index] = elements[smallerChildIndex];
            priorities[index] = priorities[smallerChildIndex];
            index = smallerChildIndex;
        }
        elements[index] = element;
        priorities[index] = priority;
        this.siftDown_(startIndex, index);
    };
    /**
     * @param {number} startIndex The index of the root.
     * @param {number} index The index of the node to move up.
     * @private
     */
    PriorityQueue.prototype.siftDown_ = function (startIndex, index) {
        var elements = this.elements_;
        var priorities = this.priorities_;
        var element = elements[index];
        var priority = priorities[index];
        while (index > startIndex) {
            var parentIndex = this.getParentIndex_(index);
            if (priorities[parentIndex] > priority) {
                elements[index] = elements[parentIndex];
                priorities[index] = priorities[parentIndex];
                index = parentIndex;
            }
            else {
                break;
            }
        }
        elements[index] = element;
        priorities[index] = priority;
    };
    /**
     * FIXME empty description for jsdoc
     */
    PriorityQueue.prototype.reprioritize = function () {
        var priorityFunction = this.priorityFunction_;
        var elements = this.elements_;
        var priorities = this.priorities_;
        var index = 0;
        var n = elements.length;
        var element, i, priority;
        for (i = 0; i < n; ++i) {
            element = elements[i];
            priority = priorityFunction(element);
            if (priority == DROP) {
                delete this.queuedElements_[this.keyFunction_(element)];
            }
            else {
                priorities[index] = priority;
                elements[index++] = element;
            }
        }
        elements.length = index;
        priorities.length = index;
        this.heapify_();
    };
    return PriorityQueue;
}());

var __extends$k = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {function(import("./Tile.js").default, string, import("./coordinate.js").Coordinate, number): number} PriorityFunction
 */
var TileQueue = /** @class */ (function (_super) {
    __extends$k(TileQueue, _super);
    /**
     * @param {PriorityFunction} tilePriorityFunction Tile priority function.
     * @param {function(): ?} tileChangeCallback Function called on each tile change event.
     */
    function TileQueue(tilePriorityFunction, tileChangeCallback) {
        var _this = _super.call(this, 
        /**
         * @param {Array} element Element.
         * @return {number} Priority.
         */
        function (element) {
            return tilePriorityFunction.apply(null, element);
        }, 
        /**
         * @param {Array} element Element.
         * @return {string} Key.
         */
        function (element) {
            return /** @type {import("./Tile.js").default} */ (element[0]).getKey();
        }) || this;
        /** @private */
        _this.boundHandleTileChange_ = _this.handleTileChange.bind(_this);
        /**
         * @private
         * @type {function(): ?}
         */
        _this.tileChangeCallback_ = tileChangeCallback;
        /**
         * @private
         * @type {number}
         */
        _this.tilesLoading_ = 0;
        /**
         * @private
         * @type {!Object<string,boolean>}
         */
        _this.tilesLoadingKeys_ = {};
        return _this;
    }
    /**
     * @param {Array} element Element.
     * @return {boolean} The element was added to the queue.
     */
    TileQueue.prototype.enqueue = function (element) {
        var added = _super.prototype.enqueue.call(this, element);
        if (added) {
            var tile = element[0];
            tile.addEventListener(EventType.CHANGE, this.boundHandleTileChange_);
        }
        return added;
    };
    /**
     * @return {number} Number of tiles loading.
     */
    TileQueue.prototype.getTilesLoading = function () {
        return this.tilesLoading_;
    };
    /**
     * @param {import("./events/Event.js").default} event Event.
     * @protected
     */
    TileQueue.prototype.handleTileChange = function (event) {
        var tile = /** @type {import("./Tile.js").default} */ (event.target);
        var state = tile.getState();
        if ((tile.hifi && state === TileState.LOADED) ||
            state === TileState.ERROR ||
            state === TileState.EMPTY) {
            tile.removeEventListener(EventType.CHANGE, this.boundHandleTileChange_);
            var tileKey = tile.getKey();
            if (tileKey in this.tilesLoadingKeys_) {
                delete this.tilesLoadingKeys_[tileKey];
                --this.tilesLoading_;
            }
            this.tileChangeCallback_();
        }
    };
    /**
     * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
     * @param {number} maxNewLoads Maximum number of new tiles to load.
     */
    TileQueue.prototype.loadMoreTiles = function (maxTotalLoading, maxNewLoads) {
        var newLoads = 0;
        var state, tile, tileKey;
        while (this.tilesLoading_ < maxTotalLoading &&
            newLoads < maxNewLoads &&
            this.getCount() > 0) {
            tile = /** @type {import("./Tile.js").default} */ (this.dequeue()[0]);
            tileKey = tile.getKey();
            state = tile.getState();
            if (state === TileState.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
                this.tilesLoadingKeys_[tileKey] = true;
                ++this.tilesLoading_;
                ++newLoads;
                tile.load();
            }
        }
    };
    return TileQueue;
}(PriorityQueue));
/**
 * @param {import('./PluggableMap.js').FrameState} frameState Frame state.
 * @param {import("./Tile.js").default} tile Tile.
 * @param {string} tileSourceKey Tile source key.
 * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
 * @param {number} tileResolution Tile resolution.
 * @return {number} Tile priority.
 */
function getTilePriority(frameState, tile, tileSourceKey, tileCenter, tileResolution) {
    // Filter out tiles at higher zoom levels than the current zoom level, or that
    // are outside the visible extent.
    if (!frameState || !(tileSourceKey in frameState.wantedTiles)) {
        return DROP;
    }
    if (!frameState.wantedTiles[tileSourceKey][tile.getKey()]) {
        return DROP;
    }
    // Prioritize the highest zoom level tiles closest to the focus.
    // Tiles at higher zoom levels are prioritized using Math.log(tileResolution).
    // Within a zoom level, tiles are prioritized by the distance in pixels between
    // the center of the tile and the center of the viewport.  The factor of 65536
    // means that the prioritization should behave as desired for tiles up to
    // 65536 * Math.log(2) = 45426 pixels from the focus.
    var center = frameState.viewState.center;
    var deltaX = tileCenter[0] - center[0];
    var deltaY = tileCenter[1] - center[1];
    return (65536 * Math.log(tileResolution) +
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution);
}

/**
 * @module ol/ViewProperty
 */
/**
 * @enum {string}
 */
var ViewProperty = {
    CENTER: 'center',
    RESOLUTION: 'resolution',
    ROTATION: 'rotation',
};

/**
 * @module ol/tilegrid/common
 */
/**
 * Default tile size.
 * @type {number}
 */
var DEFAULT_TILE_SIZE = 256;

/**
 * @module ol/centerconstraint
 */
/**
 * @typedef {function((import("./coordinate.js").Coordinate|undefined), number, import("./size.js").Size, boolean=, Array<number>=): (import("./coordinate.js").Coordinate|undefined)} Type
 */
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {boolean} onlyCenter If true, the constraint will only apply to the view center.
 * @param {boolean} smooth If true, the view will be able to go slightly out of the given extent
 * (only during interaction and animation).
 * @return {Type} The constraint.
 */
function createExtent(extent, onlyCenter, smooth) {
    return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @param {Array<number>=} opt_centerShift Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function (center, resolution, size, opt_isMoving, opt_centerShift) {
        if (center) {
            var viewWidth = onlyCenter ? 0 : size[0] * resolution;
            var viewHeight = onlyCenter ? 0 : size[1] * resolution;
            var shiftX = opt_centerShift ? opt_centerShift[0] : 0;
            var shiftY = opt_centerShift ? opt_centerShift[1] : 0;
            var minX = extent[0] + viewWidth / 2 + shiftX;
            var maxX = extent[2] - viewWidth / 2 + shiftX;
            var minY = extent[1] + viewHeight / 2 + shiftY;
            var maxY = extent[3] - viewHeight / 2 + shiftY;
            // note: when zooming out of bounds, min and max values for x and y may
            // end up inverted (min > max); this has to be accounted for
            if (minX > maxX) {
                minX = (maxX + minX) / 2;
                maxX = minX;
            }
            if (minY > maxY) {
                minY = (maxY + minY) / 2;
                maxY = minY;
            }
            var x = clamp(center[0], minX, maxX);
            var y = clamp(center[1], minY, maxY);
            var ratio = 30 * resolution;
            // during an interaction, allow some overscroll
            if (opt_isMoving && smooth) {
                x +=
                    -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) +
                        ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
                y +=
                    -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) +
                        ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
            }
            return [x, y];
        }
        else {
            return undefined;
        }
    });
}
/**
 * @param {import("./coordinate.js").Coordinate=} center Center.
 * @return {import("./coordinate.js").Coordinate|undefined} Center.
 */
function none$1(center) {
    return center;
}

/**
 * @module ol/resolutionconstraint
 */
/**
 * @typedef {function((number|undefined), number, import("./size.js").Size, boolean=): (number|undefined)} Type
 */
/**
 * Returns a modified resolution taking into account the viewport size and maximum
 * allowed extent.
 * @param {number} resolution Resolution
 * @param {import("./extent.js").Extent} maxExtent Maximum allowed extent.
 * @param {import("./size.js").Size} viewportSize Viewport size.
 * @param {boolean} showFullExtent Whether to show the full extent.
 * @return {number} Capped resolution.
 */
function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
    var xResolution = getWidth(maxExtent) / viewportSize[0];
    var yResolution = getHeight(maxExtent) / viewportSize[1];
    if (showFullExtent) {
        return Math.min(resolution, Math.max(xResolution, yResolution));
    }
    return Math.min(resolution, Math.min(xResolution, yResolution));
}
/**
 * Returns a modified resolution to be between maxResolution and minResolution while
 * still allowing the value to be slightly out of bounds.
 * Note: the computation is based on the logarithm function (ln):
 *  - at 1, ln(x) is 0
 *  - above 1, ln(x) keeps increasing but at a much slower pace than x
 * The final result is clamped to prevent getting too far away from bounds.
 * @param {number} resolution Resolution.
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @return {number} Smoothed resolution.
 */
function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
    var result = Math.min(resolution, maxResolution);
    var ratio = 50;
    result *=
        Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio +
            1;
    if (minResolution) {
        result = Math.max(result, minResolution);
        result /=
            Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) /
                ratio +
                1;
    }
    return clamp(result, minResolution / 2, maxResolution * 2);
}
/**
 * @param {Array<number>} resolutions Resolutions.
 * @param {boolean=} opt_smooth If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent=} opt_maxExtent Maximum allowed extent.
 * @param {boolean=} opt_showFullExtent If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
function createSnapToResolutions(resolutions, opt_smooth, opt_maxExtent, opt_showFullExtent) {
    return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
        if (resolution !== undefined) {
            var maxResolution = resolutions[0];
            var minResolution = resolutions[resolutions.length - 1];
            var cappedMaxRes = opt_maxExtent
                ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent)
                : maxResolution;
            // during interacting or animating, allow intermediary values
            if (opt_isMoving) {
                var smooth = opt_smooth !== undefined ? opt_smooth : true;
                if (!smooth) {
                    return clamp(resolution, minResolution, cappedMaxRes);
                }
                return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
            }
            var capped = Math.min(cappedMaxRes, resolution);
            var z = Math.floor(linearFindNearest(resolutions, capped, direction));
            if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) {
                return resolutions[z + 1];
            }
            return resolutions[z];
        }
        else {
            return undefined;
        }
    });
}
/**
 * @param {number} power Power.
 * @param {number} maxResolution Maximum resolution.
 * @param {number=} opt_minResolution Minimum resolution.
 * @param {boolean=} opt_smooth If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent=} opt_maxExtent Maximum allowed extent.
 * @param {boolean=} opt_showFullExtent If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
function createSnapToPower(power, maxResolution, opt_minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
    return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
        if (resolution !== undefined) {
            var cappedMaxRes = opt_maxExtent
                ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent)
                : maxResolution;
            var minResolution = opt_minResolution !== undefined ? opt_minResolution : 0;
            // during interacting or animating, allow intermediary values
            if (opt_isMoving) {
                var smooth = opt_smooth !== undefined ? opt_smooth : true;
                if (!smooth) {
                    return clamp(resolution, minResolution, cappedMaxRes);
                }
                return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
            }
            var tolerance = 1e-9;
            var minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
            var offset = -direction * (0.5 - tolerance) + 0.5;
            var capped = Math.min(cappedMaxRes, resolution);
            var cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset);
            var zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
            var newResolution = maxResolution / Math.pow(power, zoomLevel);
            return clamp(newResolution, minResolution, cappedMaxRes);
        }
        else {
            return undefined;
        }
    });
}
/**
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @param {boolean=} opt_smooth If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent=} opt_maxExtent Maximum allowed extent.
 * @param {boolean=} opt_showFullExtent If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
function createMinMaxResolution(maxResolution, minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
    return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */
    function (resolution, direction, size, opt_isMoving) {
        if (resolution !== undefined) {
            var cappedMaxRes = opt_maxExtent
                ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent)
                : maxResolution;
            var smooth = opt_smooth !== undefined ? opt_smooth : true;
            if (!smooth || !opt_isMoving) {
                return clamp(resolution, minResolution, cappedMaxRes);
            }
            return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }
        else {
            return undefined;
        }
    });
}

/**
 * @module ol/rotationconstraint
 */
/**
 * @typedef {function((number|undefined), boolean=): (number|undefined)} Type
 */
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */
function disable(rotation) {
    if (rotation !== undefined) {
        return 0;
    }
    else {
        return undefined;
    }
}
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */
function none(rotation) {
    if (rotation !== undefined) {
        return rotation;
    }
    else {
        return undefined;
    }
}
/**
 * @param {number} n N.
 * @return {Type} Rotation constraint.
 */
function createSnapToN(n) {
    var theta = (2 * Math.PI) / n;
    return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function (rotation, opt_isMoving) {
        if (opt_isMoving) {
            return rotation;
        }
        if (rotation !== undefined) {
            rotation = Math.floor(rotation / theta + 0.5) * theta;
            return rotation;
        }
        else {
            return undefined;
        }
    });
}
/**
 * @param {number=} opt_tolerance Tolerance.
 * @return {Type} Rotation constraint.
 */
function createSnapToZero(opt_tolerance) {
    var tolerance = opt_tolerance || toRadians(5);
    return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean=} opt_isMoving True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function (rotation, opt_isMoving) {
        if (opt_isMoving) {
            return rotation;
        }
        if (rotation !== undefined) {
            if (Math.abs(rotation) <= tolerance) {
                return 0;
            }
            else {
                return rotation;
            }
        }
        else {
            return undefined;
        }
    });
}

var __extends$j = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * An animation configuration
 *
 * @typedef {Object} Animation
 * @property {import("./coordinate.js").Coordinate} [sourceCenter]
 * @property {import("./coordinate.js").Coordinate} [targetCenter]
 * @property {number} [sourceResolution]
 * @property {number} [targetResolution]
 * @property {number} [sourceRotation]
 * @property {number} [targetRotation]
 * @property {import("./coordinate.js").Coordinate} [anchor]
 * @property {number} start
 * @property {number} duration
 * @property {boolean} complete
 * @property {function(number):number} easing
 * @property {function(boolean):void} callback
 */
/**
 * @typedef {Object} Constraints
 * @property {import("./centerconstraint.js").Type} center
 * @property {import("./resolutionconstraint.js").Type} resolution
 * @property {import("./rotationconstraint.js").Type} rotation
 */
/**
 * @typedef {Object} FitOptions
 * @property {import("./size.js").Size} [size] The size in pixels of the box to fit
 * the extent into. Default is the current size of the first map in the DOM that
 * uses this view, or `[100, 100]` if no such map is found.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in pixels) to be
 * cleared inside the view. Values in the array are top, right, bottom and left
 * padding.
 * @property {boolean} [nearest=false] If the view `constrainResolution` option is `true`,
 * get the nearest extent instead of the closest that actually fits the view.
 * @property {number} [minResolution=0] Minimum resolution that we zoom to.
 * @property {number} [maxZoom] Maximum zoom level that we zoom to. If
 * `minResolution` is given, this property is ignored.
 * @property {number} [duration] The duration of the animation in milliseconds.
 * By default, there is no animation to the target extent.
 * @property {function(number):number} [easing] The easing function used during
 * the animation (defaults to {@link module:ol/easing~inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 * @property {function(boolean):void} [callback] Function called when the view is in
 * its final position. The callback will be called with `true` if the animation
 * series completed on its own or `false` if it was cancelled.
 */
/**
 * @typedef {Object} ViewOptions
 * @property {import("./coordinate.js").Coordinate} [center] The initial center for
 * the view. If a user projection is not set, the coordinate system for the center is
 * specified with the `projection` option. Layer sources will not be fetched if this
 * is not set, but the center can be set later with {@link #setCenter}.
 * @property {boolean|number} [constrainRotation=true] Rotation constraint.
 * `false` means no constraint. `true` means no constraint, but snap to zero
 * near zero. A number constrains the rotation to that number of values. For
 * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
 * @property {boolean} [enableRotation=true] Enable rotation.
 * If `false`, a rotation constraint that always sets the rotation to zero is
 * used. The `constrainRotation` option has no effect if `enableRotation` is
 * `false`.
 * @property {import("./extent.js").Extent} [extent] The extent that constrains the
 * view, in other words, nothing outside of this extent can be visible on the map.
 * @property {boolean} [constrainOnlyCenter=false] If true, the extent
 * constraint will only apply to the view center and not the whole extent.
 * @property {boolean} [smoothExtentConstraint=true] If true, the extent
 * constraint will be applied smoothly, i.e. allow the view to go slightly outside
 * of the given `extent`.
 * @property {number} [maxResolution] The maximum resolution used to determine
 * the resolution constraint. It is used together with `minResolution` (or
 * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
 * that the projection's validity extent fits in a 256x256 px tile. If the
 * projection is Spherical Mercator (the default) then `maxResolution` defaults
 * to `40075016.68557849 / 256 = 156543.03392804097`.
 * @property {number} [minResolution] The minimum resolution used to determine
 * the resolution constraint.  It is used together with `maxResolution` (or
 * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
 * zoom levels (with a factor of 2). If the projection is Spherical Mercator
 * (the default) then `minResolution` defaults to
 * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
 * @property {number} [maxZoom=28] The maximum zoom level used to determine the
 * resolution constraint. It is used together with `minZoom` (or
 * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
 * provided, it is given precedence over `maxZoom`.
 * @property {number} [minZoom=0] The minimum zoom level used to determine the
 * resolution constraint. It is used together with `maxZoom` (or
 * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
 * provided, it is given precedence over `minZoom`.
 * @property {boolean} [multiWorld=false] If `false` the view is constrained so
 * only one world is visible, and you cannot pan off the edge.  If `true` the map
 * may show multiple worlds at low zoom levels.  Only used if the `projection` is
 * global.  Note that if `extent` is also provided it is given precedence.
 * @property {boolean} [constrainResolution=false] If true, the view will always
 * animate to the closest zoom level after an interaction; false means
 * intermediary zoom levels are allowed.
 * @property {boolean} [smoothResolutionConstraint=true] If true, the resolution
 * min/max values will be applied smoothly, i. e. allow the view to exceed slightly
 * the given resolution or zoom bounds.
 * @property {boolean} [showFullExtent=false] Allow the view to be zoomed out to
 * show the full configured extent. By default, when a view is configured with an
 * extent, users will not be able to zoom out so the viewport exceeds the extent in
 * either dimension. This means the full extent may not be visible if the viewport
 * is taller or wider than the aspect ratio of the configured extent. If
 * showFullExtent is true, the user will be able to zoom out so that the viewport
 * exceeds the height or width of the configured extent, but not both, allowing the
 * full extent to be shown.
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857'] The
 * projection. The default is Spherical Mercator.
 * @property {number} [resolution] The initial resolution for the view. The
 * units are `projection` units per pixel (e.g. meters per pixel). An
 * alternative to setting this is to set `zoom`. Layer sources will not be
 * fetched if neither this nor `zoom` are defined, but they can be set later
 * with {@link #setZoom} or {@link #setResolution}.
 * @property {Array<number>} [resolutions] Resolutions to determine the
 * resolution constraint. If set the `maxResolution`, `minResolution`,
 * `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
 * @property {number} [rotation=0] The initial rotation for the view in radians
 * (positive rotation clockwise, 0 means North).
 * @property {number} [zoom] Only used if `resolution` is not defined. Zoom
 * level used to calculate the initial resolution for the view.
 * @property {number} [zoomFactor=2] The zoom factor used to compute the
 * corresponding resolution.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in css pixels).
 * If the map viewport is partially covered with other content (overlays) along
 * its edges, this setting allows to shift the center of the viewport away from
 * that content. The order of the values is top, right, bottom, left.
 */
/**
 * @typedef {Object} AnimationOptions
 * @property {import("./coordinate.js").Coordinate} [center] The center of the view at the end of
 * the animation.
 * @property {number} [zoom] The zoom level of the view at the end of the
 * animation. This takes precedence over `resolution`.
 * @property {number} [resolution] The resolution of the view at the end
 * of the animation.  If `zoom` is also provided, this option will be ignored.
 * @property {number} [rotation] The rotation of the view at the end of
 * the animation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Optional anchor to remain fixed
 * during a rotation or resolution animation.
 * @property {number} [duration=1000] The duration of the animation in milliseconds.
 * @property {function(number):number} [easing] The easing function used
 * during the animation (defaults to {@link module:ol/easing~inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 */
/**
 * @typedef {Object} State
 * @property {import("./coordinate.js").Coordinate} center
 * @property {import("./proj/Projection.js").default} projection
 * @property {number} resolution
 * @property {number} rotation
 * @property {number} zoom
 */
/**
 * Default min zoom level for the map view.
 * @type {number}
 */
var DEFAULT_MIN_ZOOM = 0;
/**
 * @classdesc
 * A View object represents a simple 2D view of the map.
 *
 * This is the object to act upon to change the center, resolution,
 * and rotation of the map.
 *
 * A View has a `projection`. The projection determines the
 * coordinate system of the center, and its units determine the units of the
 * resolution (projection units per pixel). The default projection is
 * Spherical Mercator (EPSG:3857).
 *
 * ### The view states
 *
 * A View is determined by three states: `center`, `resolution`,
 * and `rotation`. Each state has a corresponding getter and setter, e.g.
 * `getCenter` and `setCenter` for the `center` state.
 *
 * The `zoom` state is actually not saved on the view: all computations
 * internally use the `resolution` state. Still, the `setZoom` and `getZoom`
 * methods are available, as well as `getResolutionForZoom` and
 * `getZoomForResolution` to switch from one system to the other.
 *
 * ### The constraints
 *
 * `setCenter`, `setResolution` and `setRotation` can be used to change the
 * states of the view, but any constraint defined in the constructor will
 * be applied along the way.
 *
 * A View object can have a *resolution constraint*, a *rotation constraint*
 * and a *center constraint*.
 *
 * The *resolution constraint* typically restricts min/max values and
 * snaps to specific resolutions. It is determined by the following
 * options: `resolutions`, `maxResolution`, `maxZoom` and `zoomFactor`.
 * If `resolutions` is set, the other three options are ignored. See
 * documentation for each option for more information. By default, the view
 * only has a min/max restriction and allow intermediary zoom levels when
 * pinch-zooming for example.
 *
 * The *rotation constraint* snaps to specific angles. It is determined
 * by the following options: `enableRotation` and `constrainRotation`.
 * By default rotation is allowed and its value is snapped to zero when approaching the
 * horizontal.
 *
 * The *center constraint* is determined by the `extent` option. By
 * default the view center is not constrained at all.
 *
 * ### Changing the view state
 *
 * It is important to note that `setZoom`, `setResolution`, `setCenter` and
 * `setRotation` are subject to the above mentioned constraints. As such, it
 * may sometimes not be possible to know in advance the resulting state of the
 * View. For example, calling `setResolution(10)` does not guarantee that
 * `getResolution()` will return `10`.
 *
 * A consequence of this is that, when applying a delta on the view state, one
 * should use `adjustCenter`, `adjustRotation`, `adjustZoom` and `adjustResolution`
 * rather than the corresponding setters. This will let view do its internal
 * computations. Besides, the `adjust*` methods also take an `opt_anchor`
 * argument which allows specifying an origin for the transformation.
 *
 * ### Interacting with the view
 *
 * View constraints are usually only applied when the view is *at rest*, meaning that
 * no interaction or animation is ongoing. As such, if the user puts the view in a
 * state that is not equivalent to a constrained one (e.g. rotating the view when
 * the snap angle is 0), an animation will be triggered at the interaction end to
 * put back the view to a stable state;
 *
 * @api
 */
var View = /** @class */ (function (_super) {
    __extends$j(View, _super);
    /**
     * @param {ViewOptions=} opt_options View options.
     */
    function View(opt_options) {
        var _this = _super.call(this) || this;
        var options = assign({}, opt_options);
        /**
         * @private
         * @type {Array<number>}
         */
        _this.hints_ = [0, 0];
        /**
         * @private
         * @type {Array<Array<Animation>>}
         */
        _this.animations_ = [];
        /**
         * @private
         * @type {number|undefined}
         */
        _this.updateAnimationKey_;
        /**
         * @private
         * @const
         * @type {import("./proj/Projection.js").default}
         */
        _this.projection_ = createProjection(options.projection, 'EPSG:3857');
        /**
         * @private
         * @type {import("./size.js").Size}
         */
        _this.viewportSize_ = [100, 100];
        /**
         * @private
         * @type {import("./coordinate.js").Coordinate|undefined}
         */
        _this.targetCenter_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.targetResolution_;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.targetRotation_;
        /**
         * @private
         * @type {import("./coordinate.js").Coordinate|undefined}
         */
        _this.cancelAnchor_ = undefined;
        if (options.center) {
            options.center = fromUserCoordinate(options.center, _this.projection_);
        }
        if (options.extent) {
            options.extent = fromUserExtent(options.extent, _this.projection_);
        }
        _this.applyOptions_(options);
        return _this;
    }
    /**
     * Set up the view with the given options.
     * @param {ViewOptions} options View options.
     */
    View.prototype.applyOptions_ = function (options) {
        /**
         * @type {Object<string, *>}
         */
        var properties = {};
        var resolutionConstraintInfo = createResolutionConstraint(options);
        /**
         * @private
         * @type {number}
         */
        this.maxResolution_ = resolutionConstraintInfo.maxResolution;
        /**
         * @private
         * @type {number}
         */
        this.minResolution_ = resolutionConstraintInfo.minResolution;
        /**
         * @private
         * @type {number}
         */
        this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
        /**
         * @private
         * @type {Array<number>|undefined}
         */
        this.resolutions_ = options.resolutions;
        /**
         * Padding (in css pixels).
         * If the map viewport is partially covered with other content (overlays) along
         * its edges, this setting allows to shift the center of the viewport away from that
         * content. The order of the values in the array is top, right, bottom, left.
         * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
         * @type {Array<number>|undefined}
         * @api
         */
        this.padding = options.padding;
        /**
         * @private
         * @type {number}
         */
        this.minZoom_ = resolutionConstraintInfo.minZoom;
        var centerConstraint = createCenterConstraint(options);
        var resolutionConstraint = resolutionConstraintInfo.constraint;
        var rotationConstraint = createRotationConstraint(options);
        /**
         * @private
         * @type {Constraints}
         */
        this.constraints_ = {
            center: centerConstraint,
            resolution: resolutionConstraint,
            rotation: rotationConstraint,
        };
        this.setRotation(options.rotation !== undefined ? options.rotation : 0);
        this.setCenterInternal(options.center !== undefined ? options.center : null);
        if (options.resolution !== undefined) {
            this.setResolution(options.resolution);
        }
        else if (options.zoom !== undefined) {
            this.setZoom(options.zoom);
        }
        this.setProperties(properties);
        /**
         * @private
         * @type {ViewOptions}
         */
        this.options_ = options;
    };
    /**
     * Get an updated version of the view options used to construct the view.  The
     * current resolution (or zoom), center, and rotation are applied to any stored
     * options.  The provided options can be used to apply new min/max zoom or
     * resolution limits.
     * @param {ViewOptions} newOptions New options to be applied.
     * @return {ViewOptions} New options updated with the current view state.
     */
    View.prototype.getUpdatedOptions_ = function (newOptions) {
        var options = assign({}, this.options_);
        // preserve resolution (or zoom)
        if (options.resolution !== undefined) {
            options.resolution = this.getResolution();
        }
        else {
            options.zoom = this.getZoom();
        }
        // preserve center
        options.center = this.getCenterInternal();
        // preserve rotation
        options.rotation = this.getRotation();
        return assign({}, options, newOptions);
    };
    /**
     * Animate the view.  The view's center, zoom (or resolution), and rotation
     * can be animated for smooth transitions between view states.  For example,
     * to animate the view to a new zoom level:
     *
     *     view.animate({zoom: view.getZoom() + 1});
     *
     * By default, the animation lasts one second and uses in-and-out easing.  You
     * can customize this behavior by including `duration` (in milliseconds) and
     * `easing` options (see {@link module:ol/easing}).
     *
     * To chain together multiple animations, call the method with multiple
     * animation objects.  For example, to first zoom and then pan:
     *
     *     view.animate({zoom: 10}, {center: [0, 0]});
     *
     * If you provide a function as the last argument to the animate method, it
     * will get called at the end of an animation series.  The callback will be
     * called with `true` if the animation series completed on its own or `false`
     * if it was cancelled.
     *
     * Animations are cancelled by user interactions (e.g. dragging the map) or by
     * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
     * (or another method that calls one of these).
     *
     * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
     *     options.  Multiple animations can be run in series by passing multiple
     *     options objects.  To run multiple animations in parallel, call the method
     *     multiple times.  An optional callback can be provided as a final
     *     argument.  The callback will be called with a boolean indicating whether
     *     the animation completed without being cancelled.
     * @api
     */
    View.prototype.animate = function (var_args) {
        if (this.isDef() && !this.getAnimating()) {
            this.resolveConstraints(0);
        }
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i) {
            var options = arguments[i];
            if (options.center) {
                options = assign({}, options);
                options.center = fromUserCoordinate(options.center, this.getProjection());
            }
            if (options.anchor) {
                options = assign({}, options);
                options.anchor = fromUserCoordinate(options.anchor, this.getProjection());
            }
            args[i] = options;
        }
        this.animateInternal.apply(this, args);
    };
    /**
     * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
     */
    View.prototype.animateInternal = function (var_args) {
        var animationCount = arguments.length;
        var callback;
        if (animationCount > 1 &&
            typeof arguments[animationCount - 1] === 'function') {
            callback = arguments[animationCount - 1];
            --animationCount;
        }
        if (!this.isDef()) {
            // if view properties are not yet set, shortcut to the final state
            var state = arguments[animationCount - 1];
            if (state.center) {
                this.setCenterInternal(state.center);
            }
            if (state.zoom !== undefined) {
                this.setZoom(state.zoom);
            }
            if (state.rotation !== undefined) {
                this.setRotation(state.rotation);
            }
            if (callback) {
                animationCallback(callback, true);
            }
            return;
        }
        var start = Date.now();
        var center = this.targetCenter_.slice();
        var resolution = this.targetResolution_;
        var rotation = this.targetRotation_;
        var series = [];
        for (var i = 0; i < animationCount; ++i) {
            var options = /** @type {AnimationOptions} */ (arguments[i]);
            var animation = {
                start: start,
                complete: false,
                anchor: options.anchor,
                duration: options.duration !== undefined ? options.duration : 1000,
                easing: options.easing || inAndOut,
                callback: callback,
            };
            if (options.center) {
                animation.sourceCenter = center;
                animation.targetCenter = options.center.slice();
                center = animation.targetCenter;
            }
            if (options.zoom !== undefined) {
                animation.sourceResolution = resolution;
                animation.targetResolution = this.getResolutionForZoom(options.zoom);
                resolution = animation.targetResolution;
            }
            else if (options.resolution) {
                animation.sourceResolution = resolution;
                animation.targetResolution = options.resolution;
                resolution = animation.targetResolution;
            }
            if (options.rotation !== undefined) {
                animation.sourceRotation = rotation;
                var delta = modulo(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
                animation.targetRotation = rotation + delta;
                rotation = animation.targetRotation;
            }
            // check if animation is a no-op
            if (isNoopAnimation(animation)) {
                animation.complete = true;
                // we still push it onto the series for callback handling
            }
            else {
                start += animation.duration;
            }
            series.push(animation);
        }
        this.animations_.push(series);
        this.setHint(ViewHint.ANIMATING, 1);
        this.updateAnimations_();
    };
    /**
     * Determine if the view is being animated.
     * @return {boolean} The view is being animated.
     * @api
     */
    View.prototype.getAnimating = function () {
        return this.hints_[ViewHint.ANIMATING] > 0;
    };
    /**
     * Determine if the user is interacting with the view, such as panning or zooming.
     * @return {boolean} The view is being interacted with.
     * @api
     */
    View.prototype.getInteracting = function () {
        return this.hints_[ViewHint.INTERACTING] > 0;
    };
    /**
     * Cancel any ongoing animations.
     * @api
     */
    View.prototype.cancelAnimations = function () {
        this.setHint(ViewHint.ANIMATING, -this.hints_[ViewHint.ANIMATING]);
        var anchor;
        for (var i = 0, ii = this.animations_.length; i < ii; ++i) {
            var series = this.animations_[i];
            if (series[0].callback) {
                animationCallback(series[0].callback, false);
            }
            if (!anchor) {
                for (var j = 0, jj = series.length; j < jj; ++j) {
                    var animation = series[j];
                    if (!animation.complete) {
                        anchor = animation.anchor;
                        break;
                    }
                }
            }
        }
        this.animations_.length = 0;
        this.cancelAnchor_ = anchor;
    };
    /**
     * Update all animations.
     */
    View.prototype.updateAnimations_ = function () {
        if (this.updateAnimationKey_ !== undefined) {
            cancelAnimationFrame(this.updateAnimationKey_);
            this.updateAnimationKey_ = undefined;
        }
        if (!this.getAnimating()) {
            return;
        }
        var now = Date.now();
        var more = false;
        for (var i = this.animations_.length - 1; i >= 0; --i) {
            var series = this.animations_[i];
            var seriesComplete = true;
            for (var j = 0, jj = series.length; j < jj; ++j) {
                var animation = series[j];
                if (animation.complete) {
                    continue;
                }
                var elapsed = now - animation.start;
                var fraction = animation.duration > 0 ? elapsed / animation.duration : 1;
                if (fraction >= 1) {
                    animation.complete = true;
                    fraction = 1;
                }
                else {
                    seriesComplete = false;
                }
                var progress = animation.easing(fraction);
                if (animation.sourceCenter) {
                    var x0 = animation.sourceCenter[0];
                    var y0 = animation.sourceCenter[1];
                    var x1 = animation.targetCenter[0];
                    var y1 = animation.targetCenter[1];
                    var x = x0 + progress * (x1 - x0);
                    var y = y0 + progress * (y1 - y0);
                    this.targetCenter_ = [x, y];
                }
                if (animation.sourceResolution && animation.targetResolution) {
                    var resolution = progress === 1
                        ? animation.targetResolution
                        : animation.sourceResolution +
                            progress *
                                (animation.targetResolution - animation.sourceResolution);
                    if (animation.anchor) {
                        var size = this.getViewportSize_(this.getRotation());
                        var constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
                        this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
                    }
                    this.targetResolution_ = resolution;
                    this.applyTargetState_(true);
                }
                if (animation.sourceRotation !== undefined &&
                    animation.targetRotation !== undefined) {
                    var rotation = progress === 1
                        ? modulo(animation.targetRotation + Math.PI, 2 * Math.PI) -
                            Math.PI
                        : animation.sourceRotation +
                            progress *
                                (animation.targetRotation - animation.sourceRotation);
                    if (animation.anchor) {
                        var constrainedRotation = this.constraints_.rotation(rotation, true);
                        this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
                    }
                    this.targetRotation_ = rotation;
                }
                this.applyTargetState_(true);
                more = true;
                if (!animation.complete) {
                    break;
                }
            }
            if (seriesComplete) {
                this.animations_[i] = null;
                this.setHint(ViewHint.ANIMATING, -1);
                var callback = series[0].callback;
                if (callback) {
                    animationCallback(callback, true);
                }
            }
        }
        // prune completed series
        this.animations_ = this.animations_.filter(Boolean);
        if (more && this.updateAnimationKey_ === undefined) {
            this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
        }
    };
    /**
     * @param {number} rotation Target rotation.
     * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
     * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
     */
    View.prototype.calculateCenterRotate = function (rotation, anchor) {
        var center;
        var currentCenter = this.getCenterInternal();
        if (currentCenter !== undefined) {
            center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
            rotate$1(center, rotation - this.getRotation());
            add(center, anchor);
        }
        return center;
    };
    /**
     * @param {number} resolution Target resolution.
     * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
     * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
     */
    View.prototype.calculateCenterZoom = function (resolution, anchor) {
        var center;
        var currentCenter = this.getCenterInternal();
        var currentResolution = this.getResolution();
        if (currentCenter !== undefined && currentResolution !== undefined) {
            var x = anchor[0] -
                (resolution * (anchor[0] - currentCenter[0])) / currentResolution;
            var y = anchor[1] -
                (resolution * (anchor[1] - currentCenter[1])) / currentResolution;
            center = [x, y];
        }
        return center;
    };
    /**
     * Returns the current viewport size.
     * @private
     * @param {number=} opt_rotation Take into account the rotation of the viewport when giving the size
     * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
     */
    View.prototype.getViewportSize_ = function (opt_rotation) {
        var size = this.viewportSize_;
        if (opt_rotation) {
            var w = size[0];
            var h = size[1];
            return [
                Math.abs(w * Math.cos(opt_rotation)) +
                    Math.abs(h * Math.sin(opt_rotation)),
                Math.abs(w * Math.sin(opt_rotation)) +
                    Math.abs(h * Math.cos(opt_rotation)),
            ];
        }
        else {
            return size;
        }
    };
    /**
     * Stores the viewport size on the view. The viewport size is not read every time from the DOM
     * to avoid performance hit and layout reflow.
     * This should be done on map size change.
     * Note: the constraints are not resolved during an animation to avoid stopping it
     * @param {import("./size.js").Size=} opt_size Viewport size; if undefined, [100, 100] is assumed
     */
    View.prototype.setViewportSize = function (opt_size) {
        this.viewportSize_ = Array.isArray(opt_size)
            ? opt_size.slice()
            : [100, 100];
        if (!this.getAnimating()) {
            this.resolveConstraints(0);
        }
    };
    /**
     * Get the view center.
     * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
     * @observable
     * @api
     */
    View.prototype.getCenter = function () {
        var center = this.getCenterInternal();
        if (!center) {
            return center;
        }
        return toUserCoordinate(center, this.getProjection());
    };
    /**
     * Get the view center without transforming to user projection.
     * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
     */
    View.prototype.getCenterInternal = function () {
        return /** @type {import("./coordinate.js").Coordinate|undefined} */ (this.get(ViewProperty.CENTER));
    };
    /**
     * @return {Constraints} Constraints.
     */
    View.prototype.getConstraints = function () {
        return this.constraints_;
    };
    /**
     * @return {boolean} Resolution constraint is set
     */
    View.prototype.getConstrainResolution = function () {
        return this.options_.constrainResolution;
    };
    /**
     * @param {Array<number>=} opt_hints Destination array.
     * @return {Array<number>} Hint.
     */
    View.prototype.getHints = function (opt_hints) {
        if (opt_hints !== undefined) {
            opt_hints[0] = this.hints_[0];
            opt_hints[1] = this.hints_[1];
            return opt_hints;
        }
        else {
            return this.hints_.slice();
        }
    };
    /**
     * Calculate the extent for the current view state and the passed size.
     * The size is the pixel dimensions of the box into which the calculated extent
     * should fit. In most cases you want to get the extent of the entire map,
     * that is `map.getSize()`.
     * @param {import("./size.js").Size=} opt_size Box pixel size. If not provided, the size
     * of the map that uses this view will be used.
     * @return {import("./extent.js").Extent} Extent.
     * @api
     */
    View.prototype.calculateExtent = function (opt_size) {
        var extent = this.calculateExtentInternal(opt_size);
        return toUserExtent(extent, this.getProjection());
    };
    /**
     * @param {import("./size.js").Size=} opt_size Box pixel size. If not provided,
     * the map's last known viewport size will be used.
     * @return {import("./extent.js").Extent} Extent.
     */
    View.prototype.calculateExtentInternal = function (opt_size) {
        var size = opt_size || this.getViewportSize_();
        var center = /** @type {!import("./coordinate.js").Coordinate} */ (this.getCenterInternal());
        assert(center, 1); // The view center is not defined
        var resolution = /** @type {!number} */ (this.getResolution());
        assert(resolution !== undefined, 2); // The view resolution is not defined
        var rotation = /** @type {!number} */ (this.getRotation());
        assert(rotation !== undefined, 3); // The view rotation is not defined
        return getForViewAndSize(center, resolution, rotation, size);
    };
    /**
     * Get the maximum resolution of the view.
     * @return {number} The maximum resolution of the view.
     * @api
     */
    View.prototype.getMaxResolution = function () {
        return this.maxResolution_;
    };
    /**
     * Get the minimum resolution of the view.
     * @return {number} The minimum resolution of the view.
     * @api
     */
    View.prototype.getMinResolution = function () {
        return this.minResolution_;
    };
    /**
     * Get the maximum zoom level for the view.
     * @return {number} The maximum zoom level.
     * @api
     */
    View.prototype.getMaxZoom = function () {
        return /** @type {number} */ (this.getZoomForResolution(this.minResolution_));
    };
    /**
     * Set a new maximum zoom level for the view.
     * @param {number} zoom The maximum zoom level.
     * @api
     */
    View.prototype.setMaxZoom = function (zoom) {
        this.applyOptions_(this.getUpdatedOptions_({ maxZoom: zoom }));
    };
    /**
     * Get the minimum zoom level for the view.
     * @return {number} The minimum zoom level.
     * @api
     */
    View.prototype.getMinZoom = function () {
        return /** @type {number} */ (this.getZoomForResolution(this.maxResolution_));
    };
    /**
     * Set a new minimum zoom level for the view.
     * @param {number} zoom The minimum zoom level.
     * @api
     */
    View.prototype.setMinZoom = function (zoom) {
        this.applyOptions_(this.getUpdatedOptions_({ minZoom: zoom }));
    };
    /**
     * Set whether the view shoud allow intermediary zoom levels.
     * @param {boolean} enabled Whether the resolution is constrained.
     * @api
     */
    View.prototype.setConstrainResolution = function (enabled) {
        this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: enabled }));
    };
    /**
     * Get the view projection.
     * @return {import("./proj/Projection.js").default} The projection of the view.
     * @api
     */
    View.prototype.getProjection = function () {
        return this.projection_;
    };
    /**
     * Get the view resolution.
     * @return {number|undefined} The resolution of the view.
     * @observable
     * @api
     */
    View.prototype.getResolution = function () {
        return /** @type {number|undefined} */ (this.get(ViewProperty.RESOLUTION));
    };
    /**
     * Get the resolutions for the view. This returns the array of resolutions
     * passed to the constructor of the View, or undefined if none were given.
     * @return {Array<number>|undefined} The resolutions of the view.
     * @api
     */
    View.prototype.getResolutions = function () {
        return this.resolutions_;
    };
    /**
     * Get the resolution for a provided extent (in map units) and size (in pixels).
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {import("./size.js").Size=} opt_size Box pixel size.
     * @return {number} The resolution at which the provided extent will render at
     *     the given size.
     * @api
     */
    View.prototype.getResolutionForExtent = function (extent, opt_size) {
        return this.getResolutionForExtentInternal(fromUserExtent(extent, this.getProjection()), opt_size);
    };
    /**
     * Get the resolution for a provided extent (in map units) and size (in pixels).
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {import("./size.js").Size=} opt_size Box pixel size.
     * @return {number} The resolution at which the provided extent will render at
     *     the given size.
     */
    View.prototype.getResolutionForExtentInternal = function (extent, opt_size) {
        var size = opt_size || this.getViewportSize_();
        var xResolution = getWidth(extent) / size[0];
        var yResolution = getHeight(extent) / size[1];
        return Math.max(xResolution, yResolution);
    };
    /**
     * Return a function that returns a value between 0 and 1 for a
     * resolution. Exponential scaling is assumed.
     * @param {number=} opt_power Power.
     * @return {function(number): number} Resolution for value function.
     */
    View.prototype.getResolutionForValueFunction = function (opt_power) {
        var power = opt_power || 2;
        var maxResolution = this.getConstrainedResolution(this.maxResolution_);
        var minResolution = this.minResolution_;
        var max = Math.log(maxResolution / minResolution) / Math.log(power);
        return (
        /**
         * @param {number} value Value.
         * @return {number} Resolution.
         */
        function (value) {
            var resolution = maxResolution / Math.pow(power, value * max);
            return resolution;
        });
    };
    /**
     * Get the view rotation.
     * @return {number} The rotation of the view in radians.
     * @observable
     * @api
     */
    View.prototype.getRotation = function () {
        return /** @type {number} */ (this.get(ViewProperty.ROTATION));
    };
    /**
     * Return a function that returns a resolution for a value between
     * 0 and 1. Exponential scaling is assumed.
     * @param {number=} opt_power Power.
     * @return {function(number): number} Value for resolution function.
     */
    View.prototype.getValueForResolutionFunction = function (opt_power) {
        var logPower = Math.log(opt_power || 2);
        var maxResolution = this.getConstrainedResolution(this.maxResolution_);
        var minResolution = this.minResolution_;
        var max = Math.log(maxResolution / minResolution) / logPower;
        return (
        /**
         * @param {number} resolution Resolution.
         * @return {number} Value.
         */
        function (resolution) {
            var value = Math.log(maxResolution / resolution) / logPower / max;
            return value;
        });
    };
    /**
     * Returns the size of the viewport minus padding.
     * @private
     * @param {number=} opt_rotation Take into account the rotation of the viewport when giving the size
     * @return {import("./size.js").Size} Viewport size reduced by the padding.
     */
    View.prototype.getViewportSizeMinusPadding_ = function (opt_rotation) {
        var size = this.getViewportSize_(opt_rotation);
        var padding = this.padding;
        if (padding) {
            size = [
                size[0] - padding[1] - padding[3],
                size[1] - padding[0] - padding[2],
            ];
        }
        return size;
    };
    /**
     * @return {State} View state.
     */
    View.prototype.getState = function () {
        var projection = this.getProjection();
        var resolution = /** @type {number} */ (this.getResolution());
        var rotation = this.getRotation();
        var center = /** @type {import("./coordinate.js").Coordinate} */ (this.getCenterInternal());
        var padding = this.padding;
        if (padding) {
            var reducedSize = this.getViewportSizeMinusPadding_();
            center = calculateCenterOn(center, this.getViewportSize_(), [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
        }
        return {
            center: center.slice(0),
            projection: projection !== undefined ? projection : null,
            resolution: resolution,
            rotation: rotation,
            zoom: this.getZoom(),
        };
    };
    /**
     * Get the current zoom level. This method may return non-integer zoom levels
     * if the view does not constrain the resolution, or if an interaction or
     * animation is underway.
     * @return {number|undefined} Zoom.
     * @api
     */
    View.prototype.getZoom = function () {
        var zoom;
        var resolution = this.getResolution();
        if (resolution !== undefined) {
            zoom = this.getZoomForResolution(resolution);
        }
        return zoom;
    };
    /**
     * Get the zoom level for a resolution.
     * @param {number} resolution The resolution.
     * @return {number|undefined} The zoom level for the provided resolution.
     * @api
     */
    View.prototype.getZoomForResolution = function (resolution) {
        var offset = this.minZoom_ || 0;
        var max, zoomFactor;
        if (this.resolutions_) {
            var nearest = linearFindNearest(this.resolutions_, resolution, 1);
            offset = nearest;
            max = this.resolutions_[nearest];
            if (nearest == this.resolutions_.length - 1) {
                zoomFactor = 2;
            }
            else {
                zoomFactor = max / this.resolutions_[nearest + 1];
            }
        }
        else {
            max = this.maxResolution_;
            zoomFactor = this.zoomFactor_;
        }
        return offset + Math.log(max / resolution) / Math.log(zoomFactor);
    };
    /**
     * Get the resolution for a zoom level.
     * @param {number} zoom Zoom level.
     * @return {number} The view resolution for the provided zoom level.
     * @api
     */
    View.prototype.getResolutionForZoom = function (zoom) {
        if (this.resolutions_) {
            if (this.resolutions_.length <= 1) {
                return 0;
            }
            var baseLevel = clamp(Math.floor(zoom), 0, this.resolutions_.length - 2);
            var zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
            return (this.resolutions_[baseLevel] /
                Math.pow(zoomFactor, clamp(zoom - baseLevel, 0, 1)));
        }
        else {
            return (this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_));
        }
    };
    /**
     * Fit the given geometry or extent based on the given map size and border.
     * The size is pixel dimensions of the box to fit the extent into.
     * In most cases you will want to use the map size, that is `map.getSize()`.
     * Takes care of the map angle.
     * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
     *     extent to fit the view to.
     * @param {FitOptions=} opt_options Options.
     * @api
     */
    View.prototype.fit = function (geometryOrExtent, opt_options) {
        /** @type {import("./geom/SimpleGeometry.js").default} */
        var geometry;
        assert(Array.isArray(geometryOrExtent) ||
            typeof ( /** @type {?} */(geometryOrExtent).getSimplifiedGeometry) ===
                'function', 24); // Invalid extent or geometry provided as `geometry`
        if (Array.isArray(geometryOrExtent)) {
            assert(!isEmpty(geometryOrExtent), 25); // Cannot fit empty extent provided as `geometry`
            var extent = fromUserExtent(geometryOrExtent, this.getProjection());
            geometry = fromExtent(extent);
        }
        else if (geometryOrExtent.getType() === GeometryType.CIRCLE) {
            var extent = fromUserExtent(geometryOrExtent.getExtent(), this.getProjection());
            geometry = fromExtent(extent);
            geometry.rotate(this.getRotation(), getCenter(extent));
        }
        else {
            var userProjection = getUserProjection();
            if (userProjection) {
                geometry = /** @type {import("./geom/SimpleGeometry.js").default} */ (geometryOrExtent
                    .clone()
                    .transform(userProjection, this.getProjection()));
            }
            else {
                geometry = geometryOrExtent;
            }
        }
        this.fitInternal(geometry, opt_options);
    };
    /**
     * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
     * @param {FitOptions=} opt_options Options.
     */
    View.prototype.fitInternal = function (geometry, opt_options) {
        var options = opt_options || {};
        var size = options.size;
        if (!size) {
            size = this.getViewportSizeMinusPadding_();
        }
        var padding = options.padding !== undefined ? options.padding : [0, 0, 0, 0];
        var nearest = options.nearest !== undefined ? options.nearest : false;
        var minResolution;
        if (options.minResolution !== undefined) {
            minResolution = options.minResolution;
        }
        else if (options.maxZoom !== undefined) {
            minResolution = this.getResolutionForZoom(options.maxZoom);
        }
        else {
            minResolution = 0;
        }
        var coords = geometry.getFlatCoordinates();
        // calculate rotated extent
        var rotation = this.getRotation();
        var cosAngle = Math.cos(-rotation);
        var sinAngle = Math.sin(-rotation);
        var minRotX = +Infinity;
        var minRotY = +Infinity;
        var maxRotX = -Infinity;
        var maxRotY = -Infinity;
        var stride = geometry.getStride();
        for (var i = 0, ii = coords.length; i < ii; i += stride) {
            var rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
            var rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
            minRotX = Math.min(minRotX, rotX);
            minRotY = Math.min(minRotY, rotY);
            maxRotX = Math.max(maxRotX, rotX);
            maxRotY = Math.max(maxRotY, rotY);
        }
        // calculate resolution
        var resolution = this.getResolutionForExtentInternal([minRotX, minRotY, maxRotX, maxRotY], [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]]);
        resolution = isNaN(resolution)
            ? minResolution
            : Math.max(resolution, minResolution);
        resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1);
        // calculate center
        sinAngle = -sinAngle; // go back to original rotation
        var centerRotX = (minRotX + maxRotX) / 2;
        var centerRotY = (minRotY + maxRotY) / 2;
        centerRotX += ((padding[1] - padding[3]) / 2) * resolution;
        centerRotY += ((padding[0] - padding[2]) / 2) * resolution;
        var centerX = centerRotX * cosAngle - centerRotY * sinAngle;
        var centerY = centerRotY * cosAngle + centerRotX * sinAngle;
        var center = this.getConstrainedCenter([centerX, centerY], resolution);
        var callback = options.callback ? options.callback : VOID;
        if (options.duration !== undefined) {
            this.animateInternal({
                resolution: resolution,
                center: center,
                duration: options.duration,
                easing: options.easing,
            }, callback);
        }
        else {
            this.targetResolution_ = resolution;
            this.targetCenter_ = center;
            this.applyTargetState_(false, true);
            animationCallback(callback, true);
        }
    };
    /**
     * Center on coordinate and view position.
     * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("./size.js").Size} size Box pixel size.
     * @param {import("./pixel.js").Pixel} position Position on the view to center on.
     * @api
     */
    View.prototype.centerOn = function (coordinate, size, position) {
        this.centerOnInternal(fromUserCoordinate(coordinate, this.getProjection()), size, position);
    };
    /**
     * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("./size.js").Size} size Box pixel size.
     * @param {import("./pixel.js").Pixel} position Position on the view to center on.
     */
    View.prototype.centerOnInternal = function (coordinate, size, position) {
        this.setCenterInternal(calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
    };
    /**
     * Calculates the shift between map and viewport center.
     * @param {import("./coordinate.js").Coordinate} center Center.
     * @param {number} resolution Resolution.
     * @param {number} rotation Rotation.
     * @param {import("./size.js").Size} size Size.
     * @return {Array<number>|undefined} Center shift.
     */
    View.prototype.calculateCenterShift = function (center, resolution, rotation, size) {
        var centerShift;
        var padding = this.padding;
        if (padding && center) {
            var reducedSize = this.getViewportSizeMinusPadding_(-rotation);
            var shiftedCenter = calculateCenterOn(center, size, [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
            centerShift = [
                center[0] - shiftedCenter[0],
                center[1] - shiftedCenter[1],
            ];
        }
        return centerShift;
    };
    /**
     * @return {boolean} Is defined.
     */
    View.prototype.isDef = function () {
        return !!this.getCenterInternal() && this.getResolution() !== undefined;
    };
    /**
     * Adds relative coordinates to the center of the view. Any extent constraint will apply.
     * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
     * @api
     */
    View.prototype.adjustCenter = function (deltaCoordinates) {
        var center = toUserCoordinate(this.targetCenter_, this.getProjection());
        this.setCenter([
            center[0] + deltaCoordinates[0],
            center[1] + deltaCoordinates[1],
        ]);
    };
    /**
     * Adds relative coordinates to the center of the view. Any extent constraint will apply.
     * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
     */
    View.prototype.adjustCenterInternal = function (deltaCoordinates) {
        var center = this.targetCenter_;
        this.setCenterInternal([
            center[0] + deltaCoordinates[0],
            center[1] + deltaCoordinates[1],
        ]);
    };
    /**
     * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
     * constraint will apply.
     * @param {number} ratio The ratio to apply on the view resolution.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The origin of the transformation.
     * @api
     */
    View.prototype.adjustResolution = function (ratio, opt_anchor) {
        var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
        this.adjustResolutionInternal(ratio, anchor);
    };
    /**
     * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
     * constraint will apply.
     * @param {number} ratio The ratio to apply on the view resolution.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The origin of the transformation.
     */
    View.prototype.adjustResolutionInternal = function (ratio, opt_anchor) {
        var isMoving = this.getAnimating() || this.getInteracting();
        var size = this.getViewportSize_(this.getRotation());
        var newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);
        if (opt_anchor) {
            this.targetCenter_ = this.calculateCenterZoom(newResolution, opt_anchor);
        }
        this.targetResolution_ *= ratio;
        this.applyTargetState_();
    };
    /**
     * Adds a value to the view zoom level, optionally using an anchor. Any resolution
     * constraint will apply.
     * @param {number} delta Relative value to add to the zoom level.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The origin of the transformation.
     * @api
     */
    View.prototype.adjustZoom = function (delta, opt_anchor) {
        this.adjustResolution(Math.pow(this.zoomFactor_, -delta), opt_anchor);
    };
    /**
     * Adds a value to the view rotation, optionally using an anchor. Any rotation
     * constraint will apply.
     * @param {number} delta Relative value to add to the zoom rotation, in radians.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The rotation center.
     * @api
     */
    View.prototype.adjustRotation = function (delta, opt_anchor) {
        if (opt_anchor) {
            opt_anchor = fromUserCoordinate(opt_anchor, this.getProjection());
        }
        this.adjustRotationInternal(delta, opt_anchor);
    };
    /**
     * @param {number} delta Relative value to add to the zoom rotation, in radians.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The rotation center.
     */
    View.prototype.adjustRotationInternal = function (delta, opt_anchor) {
        var isMoving = this.getAnimating() || this.getInteracting();
        var newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);
        if (opt_anchor) {
            this.targetCenter_ = this.calculateCenterRotate(newRotation, opt_anchor);
        }
        this.targetRotation_ += delta;
        this.applyTargetState_();
    };
    /**
     * Set the center of the current view. Any extent constraint will apply.
     * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
     * @observable
     * @api
     */
    View.prototype.setCenter = function (center) {
        this.setCenterInternal(fromUserCoordinate(center, this.getProjection()));
    };
    /**
     * Set the center using the view projection (not the user projection).
     * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
     */
    View.prototype.setCenterInternal = function (center) {
        this.targetCenter_ = center;
        this.applyTargetState_();
    };
    /**
     * @param {import("./ViewHint.js").default} hint Hint.
     * @param {number} delta Delta.
     * @return {number} New value.
     */
    View.prototype.setHint = function (hint, delta) {
        this.hints_[hint] += delta;
        this.changed();
        return this.hints_[hint];
    };
    /**
     * Set the resolution for this view. Any resolution constraint will apply.
     * @param {number|undefined} resolution The resolution of the view.
     * @observable
     * @api
     */
    View.prototype.setResolution = function (resolution) {
        this.targetResolution_ = resolution;
        this.applyTargetState_();
    };
    /**
     * Set the rotation for this view. Any rotation constraint will apply.
     * @param {number} rotation The rotation of the view in radians.
     * @observable
     * @api
     */
    View.prototype.setRotation = function (rotation) {
        this.targetRotation_ = rotation;
        this.applyTargetState_();
    };
    /**
     * Zoom to a specific zoom level. Any resolution constrain will apply.
     * @param {number} zoom Zoom level.
     * @api
     */
    View.prototype.setZoom = function (zoom) {
        this.setResolution(this.getResolutionForZoom(zoom));
    };
    /**
     * Recompute rotation/resolution/center based on target values.
     * Note: we have to compute rotation first, then resolution and center considering that
     * parameters can influence one another in case a view extent constraint is present.
     * @param {boolean=} opt_doNotCancelAnims Do not cancel animations.
     * @param {boolean=} opt_forceMoving Apply constraints as if the view is moving.
     * @private
     */
    View.prototype.applyTargetState_ = function (opt_doNotCancelAnims, opt_forceMoving) {
        var isMoving = this.getAnimating() || this.getInteracting() || opt_forceMoving;
        // compute rotation
        var newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
        var size = this.getViewportSize_(newRotation);
        var newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
        var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
        if (this.get(ViewProperty.ROTATION) !== newRotation) {
            this.set(ViewProperty.ROTATION, newRotation);
        }
        if (this.get(ViewProperty.RESOLUTION) !== newResolution) {
            this.set(ViewProperty.RESOLUTION, newResolution);
        }
        if (!this.get(ViewProperty.CENTER) ||
            !equals(this.get(ViewProperty.CENTER), newCenter)) {
            this.set(ViewProperty.CENTER, newCenter);
        }
        if (this.getAnimating() && !opt_doNotCancelAnims) {
            this.cancelAnimations();
        }
        this.cancelAnchor_ = undefined;
    };
    /**
     * If any constraints need to be applied, an animation will be triggered.
     * This is typically done on interaction end.
     * Note: calling this with a duration of 0 will apply the constrained values straight away,
     * without animation.
     * @param {number=} opt_duration The animation duration in ms.
     * @param {number=} opt_resolutionDirection Which direction to zoom.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The origin of the transformation.
     */
    View.prototype.resolveConstraints = function (opt_duration, opt_resolutionDirection, opt_anchor) {
        var duration = opt_duration !== undefined ? opt_duration : 200;
        var direction = opt_resolutionDirection || 0;
        var newRotation = this.constraints_.rotation(this.targetRotation_);
        var size = this.getViewportSize_(newRotation);
        var newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
        var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
        if (duration === 0 && !this.cancelAnchor_) {
            this.targetResolution_ = newResolution;
            this.targetRotation_ = newRotation;
            this.targetCenter_ = newCenter;
            this.applyTargetState_();
            return;
        }
        var anchor = opt_anchor || (duration === 0 ? this.cancelAnchor_ : undefined);
        this.cancelAnchor_ = undefined;
        if (this.getResolution() !== newResolution ||
            this.getRotation() !== newRotation ||
            !this.getCenterInternal() ||
            !equals(this.getCenterInternal(), newCenter)) {
            if (this.getAnimating()) {
                this.cancelAnimations();
            }
            this.animateInternal({
                rotation: newRotation,
                center: newCenter,
                resolution: newResolution,
                duration: duration,
                easing: easeOut,
                anchor: anchor,
            });
        }
    };
    /**
     * Notify the View that an interaction has started.
     * The view state will be resolved to a stable one if needed
     * (depending on its constraints).
     * @api
     */
    View.prototype.beginInteraction = function () {
        this.resolveConstraints(0);
        this.setHint(ViewHint.INTERACTING, 1);
    };
    /**
     * Notify the View that an interaction has ended. The view state will be resolved
     * to a stable one if needed (depending on its constraints).
     * @param {number=} opt_duration Animation duration in ms.
     * @param {number=} opt_resolutionDirection Which direction to zoom.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The origin of the transformation.
     * @api
     */
    View.prototype.endInteraction = function (opt_duration, opt_resolutionDirection, opt_anchor) {
        var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
        this.endInteractionInternal(opt_duration, opt_resolutionDirection, anchor);
    };
    /**
     * Notify the View that an interaction has ended. The view state will be resolved
     * to a stable one if needed (depending on its constraints).
     * @param {number=} opt_duration Animation duration in ms.
     * @param {number=} opt_resolutionDirection Which direction to zoom.
     * @param {import("./coordinate.js").Coordinate=} opt_anchor The origin of the transformation.
     */
    View.prototype.endInteractionInternal = function (opt_duration, opt_resolutionDirection, opt_anchor) {
        this.setHint(ViewHint.INTERACTING, -1);
        this.resolveConstraints(opt_duration, opt_resolutionDirection, opt_anchor);
    };
    /**
     * Get a valid position for the view center according to the current constraints.
     * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
     * @param {number=} opt_targetResolution Target resolution. If not supplied, the current one will be used.
     * This is useful to guess a valid center position at a different zoom level.
     * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
     */
    View.prototype.getConstrainedCenter = function (targetCenter, opt_targetResolution) {
        var size = this.getViewportSize_(this.getRotation());
        return this.constraints_.center(targetCenter, opt_targetResolution || this.getResolution(), size);
    };
    /**
     * Get a valid zoom level according to the current view constraints.
     * @param {number|undefined} targetZoom Target zoom.
     * @param {number=} [opt_direction=0] Indicate which resolution should be used
     * by a renderer if the view resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @return {number|undefined} Valid zoom level.
     */
    View.prototype.getConstrainedZoom = function (targetZoom, opt_direction) {
        var targetRes = this.getResolutionForZoom(targetZoom);
        return this.getZoomForResolution(this.getConstrainedResolution(targetRes, opt_direction));
    };
    /**
     * Get a valid resolution according to the current view constraints.
     * @param {number|undefined} targetResolution Target resolution.
     * @param {number=} [opt_direction=0] Indicate which resolution should be used
     * by a renderer if the view resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @return {number|undefined} Valid resolution.
     */
    View.prototype.getConstrainedResolution = function (targetResolution, opt_direction) {
        var direction = opt_direction || 0;
        var size = this.getViewportSize_(this.getRotation());
        return this.constraints_.resolution(targetResolution, direction, size);
    };
    return View;
}(BaseObject));
/**
 * @param {Function} callback Callback.
 * @param {*} returnValue Return value.
 */
function animationCallback(callback, returnValue) {
    setTimeout(function () {
        callback(returnValue);
    }, 0);
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./centerconstraint.js").Type} The constraint.
 */
function createCenterConstraint(options) {
    if (options.extent !== undefined) {
        var smooth = options.smoothExtentConstraint !== undefined
            ? options.smoothExtentConstraint
            : true;
        return createExtent(options.extent, options.constrainOnlyCenter, smooth);
    }
    var projection = createProjection(options.projection, 'EPSG:3857');
    if (options.multiWorld !== true && projection.isGlobal()) {
        var extent = projection.getExtent().slice();
        extent[0] = -Infinity;
        extent[2] = Infinity;
        return createExtent(extent, false, false);
    }
    return none$1;
}
/**
 * @param {ViewOptions} options View options.
 * @return {{constraint: import("./resolutionconstraint.js").Type, maxResolution: number,
 *     minResolution: number, minZoom: number, zoomFactor: number}} The constraint.
 */
function createResolutionConstraint(options) {
    var resolutionConstraint;
    var maxResolution;
    var minResolution;
    // TODO: move these to be ol constants
    // see https://github.com/openlayers/openlayers/issues/2076
    var defaultMaxZoom = 28;
    var defaultZoomFactor = 2;
    var minZoom = options.minZoom !== undefined ? options.minZoom : DEFAULT_MIN_ZOOM;
    var maxZoom = options.maxZoom !== undefined ? options.maxZoom : defaultMaxZoom;
    var zoomFactor = options.zoomFactor !== undefined ? options.zoomFactor : defaultZoomFactor;
    var multiWorld = options.multiWorld !== undefined ? options.multiWorld : false;
    var smooth = options.smoothResolutionConstraint !== undefined
        ? options.smoothResolutionConstraint
        : true;
    var showFullExtent = options.showFullExtent !== undefined ? options.showFullExtent : false;
    var projection = createProjection(options.projection, 'EPSG:3857');
    var projExtent = projection.getExtent();
    var constrainOnlyCenter = options.constrainOnlyCenter;
    var extent = options.extent;
    if (!multiWorld && !extent && projection.isGlobal()) {
        constrainOnlyCenter = false;
        extent = projExtent;
    }
    if (options.resolutions !== undefined) {
        var resolutions = options.resolutions;
        maxResolution = resolutions[minZoom];
        minResolution =
            resolutions[maxZoom] !== undefined
                ? resolutions[maxZoom]
                : resolutions[resolutions.length - 1];
        if (options.constrainResolution) {
            resolutionConstraint = createSnapToResolutions(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
        }
        else {
            resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
        }
    }
    else {
        // calculate the default min and max resolution
        var size = !projExtent
            ? // use an extent that can fit the whole world if need be
                (360 * METERS_PER_UNIT$1[Units.DEGREES]) / projection.getMetersPerUnit()
            : Math.max(getWidth(projExtent), getHeight(projExtent));
        var defaultMaxResolution = size / DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
        var defaultMinResolution = defaultMaxResolution /
            Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM);
        // user provided maxResolution takes precedence
        maxResolution = options.maxResolution;
        if (maxResolution !== undefined) {
            minZoom = 0;
        }
        else {
            maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
        }
        // user provided minResolution takes precedence
        minResolution = options.minResolution;
        if (minResolution === undefined) {
            if (options.maxZoom !== undefined) {
                if (options.maxResolution !== undefined) {
                    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
                }
                else {
                    minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
                }
            }
            else {
                minResolution = defaultMinResolution;
            }
        }
        // given discrete zoom levels, minResolution may be different than provided
        maxZoom =
            minZoom +
                Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
        minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
        if (options.constrainResolution) {
            resolutionConstraint = createSnapToPower(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
        }
        else {
            resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
        }
    }
    return {
        constraint: resolutionConstraint,
        maxResolution: maxResolution,
        minResolution: minResolution,
        minZoom: minZoom,
        zoomFactor: zoomFactor,
    };
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./rotationconstraint.js").Type} Rotation constraint.
 */
function createRotationConstraint(options) {
    var enableRotation = options.enableRotation !== undefined ? options.enableRotation : true;
    if (enableRotation) {
        var constrainRotation = options.constrainRotation;
        if (constrainRotation === undefined || constrainRotation === true) {
            return createSnapToZero();
        }
        else if (constrainRotation === false) {
            return none;
        }
        else if (typeof constrainRotation === 'number') {
            return createSnapToN(constrainRotation);
        }
        else {
            return none;
        }
    }
    else {
        return disable;
    }
}
/**
 * Determine if an animation involves no view change.
 * @param {Animation} animation The animation.
 * @return {boolean} The animation involves no view change.
 */
function isNoopAnimation(animation) {
    if (animation.sourceCenter && animation.targetCenter) {
        if (!equals(animation.sourceCenter, animation.targetCenter)) {
            return false;
        }
    }
    if (animation.sourceResolution !== animation.targetResolution) {
        return false;
    }
    if (animation.sourceRotation !== animation.targetRotation) {
        return false;
    }
    return true;
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {import("./size.js").Size} size Box pixel size.
 * @param {import("./pixel.js").Pixel} position Position on the view to center on.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @return {import("./coordinate.js").Coordinate} Shifted center.
 */
function calculateCenterOn(coordinate, size, position, resolution, rotation) {
    // calculate rotated position
    var cosAngle = Math.cos(-rotation);
    var sinAngle = Math.sin(-rotation);
    var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    rotX += (size[0] / 2 - position[0]) * resolution;
    rotY += (position[1] - size[1] / 2) * resolution;
    // go back to original angle
    sinAngle = -sinAngle; // go back to original rotation
    var centerX = rotX * cosAngle - rotY * sinAngle;
    var centerY = rotY * cosAngle + rotX * sinAngle;
    return [centerX, centerY];
}

var __extends$i = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * State of the current frame. Only `pixelRatio`, `time` and `viewState` should
 * be used in applications.
 * @typedef {Object} FrameState
 * @property {number} pixelRatio The pixel ratio of the frame.
 * @property {number} time The time when rendering of the frame was requested.
 * @property {import("./View.js").State} viewState The state of the current view.
 * @property {boolean} animate
 * @property {import("./transform.js").Transform} coordinateToPixelTransform
 * @property {import("rbush").default} declutterTree
 * @property {null|import("./extent.js").Extent} extent
 * @property {number} index
 * @property {Array<import("./layer/Layer.js").State>} layerStatesArray
 * @property {number} layerIndex
 * @property {import("./transform.js").Transform} pixelToCoordinateTransform
 * @property {Array<PostRenderFunction>} postRenderFunctions
 * @property {import("./size.js").Size} size
 * @property {TileQueue} tileQueue
 * @property {!Object<string, Object<string, boolean>>} usedTiles
 * @property {Array<number>} viewHints
 * @property {!Object<string, Object<string, boolean>>} wantedTiles
 */
/**
 * @typedef {function(PluggableMap, ?FrameState): any} PostRenderFunction
 */
/**
 * @typedef {Object} AtPixelOptions
 * @property {undefined|function(import("./layer/Layer.js").default): boolean} [layerFilter] Layer filter
 * function. The filter function will receive one argument, the
 * {@link module:ol/layer/Layer layer-candidate} and it should return a boolean value.
 * Only layers which are visible and for which this function returns `true`
 * will be tested for features. By default, all visible layers will be tested.
 * @property {number} [hitTolerance=0] Hit-detection tolerance in css pixels. Pixels
 * inside the radius around the given position will be checked for features.
 * @property {boolean} [checkWrapped=true] Check-Wrapped Will check for for wrapped geometries inside the range of
 *   +/- 1 world width. Works only if a projection is used that can be wrapped.
 */
/**
 * @typedef {Object} MapOptionsInternal
 * @property {Collection<import("./control/Control.js").default>} [controls]
 * @property {Collection<import("./interaction/Interaction.js").default>} [interactions]
 * @property {HTMLElement|Document} keyboardEventTarget
 * @property {Collection<import("./Overlay.js").default>} overlays
 * @property {Object<string, *>} values
 */
/**
 * Object literal with config options for the map.
 * @typedef {Object} MapOptions
 * @property {Collection<import("./control/Control.js").default>|Array<import("./control/Control.js").default>} [controls]
 * Controls initially added to the map. If not specified,
 * {@link module:ol/control~defaults} is used.
 * @property {number} [pixelRatio=window.devicePixelRatio] The ratio between
 * physical pixels and device-independent pixels (dips) on the device.
 * @property {Collection<import("./interaction/Interaction.js").default>|Array<import("./interaction/Interaction.js").default>} [interactions]
 * Interactions that are initially added to the map. If not specified,
 * {@link module:ol/interaction~defaults} is used.
 * @property {HTMLElement|Document|string} [keyboardEventTarget] The element to
 * listen to keyboard events on. This determines when the `KeyboardPan` and
 * `KeyboardZoom` interactions trigger. For example, if this option is set to
 * `document` the keyboard interactions will always trigger. If this option is
 * not specified, the element the library listens to keyboard events on is the
 * map target (i.e. the user-provided div for the map). If this is not
 * `document`, the target element needs to be focused for key events to be
 * emitted, requiring that the target element has a `tabindex` attribute.
 * @property {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>|LayerGroup} [layers]
 * Layers. If this is not defined, a map with no layers will be rendered. Note
 * that layers are rendered in the order supplied, so if you want, for example,
 * a vector layer to appear on top of a tile layer, it must come after the tile
 * layer.
 * @property {number} [maxTilesLoading=16] Maximum number tiles to load
 * simultaneously.
 * @property {number} [moveTolerance=1] The minimum distance in pixels the
 * cursor must move to be detected as a map move event instead of a click.
 * Increasing this value can make it easier to click on the map.
 * @property {Collection<import("./Overlay.js").default>|Array<import("./Overlay.js").default>} [overlays]
 * Overlays initially added to the map. By default, no overlays are added.
 * @property {HTMLElement|string} [target] The container for the map, either the
 * element itself or the `id` of the element. If not specified at construction
 * time, {@link module:ol/Map~Map#setTarget} must be called for the map to be
 * rendered. If passed by element, the container can be in a secondary document.
 * @property {View} [view] The map's view.  No layer sources will be
 * fetched unless this is specified at construction time or through
 * {@link module:ol/Map~Map#setView}.
 */
/**
 * @fires import("./MapBrowserEvent.js").MapBrowserEvent
 * @fires import("./MapEvent.js").MapEvent
 * @fires import("./render/Event.js").default#precompose
 * @fires import("./render/Event.js").default#postcompose
 * @fires import("./render/Event.js").default#rendercomplete
 * @api
 */
var PluggableMap = /** @class */ (function (_super) {
    __extends$i(PluggableMap, _super);
    /**
     * @param {MapOptions} options Map options.
     */
    function PluggableMap(options) {
        var _this = _super.call(this) || this;
        var optionsInternal = createOptionsInternal(options);
        /** @private */
        _this.boundHandleBrowserEvent_ = _this.handleBrowserEvent.bind(_this);
        /**
         * @type {number}
         * @private
         */
        _this.maxTilesLoading_ =
            options.maxTilesLoading !== undefined ? options.maxTilesLoading : 16;
        /**
         * @private
         * @type {number}
         */
        _this.pixelRatio_ =
            options.pixelRatio !== undefined
                ? options.pixelRatio
                : DEVICE_PIXEL_RATIO;
        /**
         * @private
         * @type {*}
         */
        _this.postRenderTimeoutHandle_;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.animationDelayKey_;
        /**
         * @private
         */
        _this.animationDelay_ = /** @this {PluggableMap} */ function () {
            this.animationDelayKey_ = undefined;
            this.renderFrame_(Date.now());
        }.bind(_this);
        /**
         * @private
         * @type {import("./transform.js").Transform}
         */
        _this.coordinateToPixelTransform_ = create();
        /**
         * @private
         * @type {import("./transform.js").Transform}
         */
        _this.pixelToCoordinateTransform_ = create();
        /**
         * @private
         * @type {number}
         */
        _this.frameIndex_ = 0;
        /**
         * @private
         * @type {?FrameState}
         */
        _this.frameState_ = null;
        /**
         * The extent at the previous 'moveend' event.
         * @private
         * @type {import("./extent.js").Extent}
         */
        _this.previousExtent_ = null;
        /**
         * @private
         * @type {?import("./events.js").EventsKey}
         */
        _this.viewPropertyListenerKey_ = null;
        /**
         * @private
         * @type {?import("./events.js").EventsKey}
         */
        _this.viewChangeListenerKey_ = null;
        /**
         * @private
         * @type {?Array<import("./events.js").EventsKey>}
         */
        _this.layerGroupPropertyListenerKeys_ = null;
        /**
         * @private
         * @type {!HTMLElement}
         */
        _this.viewport_ = document.createElement('div');
        _this.viewport_.className =
            'ol-viewport' + ('ontouchstart' in window ? ' ol-touch' : '');
        _this.viewport_.style.position = 'relative';
        _this.viewport_.style.overflow = 'hidden';
        _this.viewport_.style.width = '100%';
        _this.viewport_.style.height = '100%';
        /**
         * @private
         * @type {!HTMLElement}
         */
        _this.overlayContainer_ = document.createElement('div');
        _this.overlayContainer_.style.position = 'absolute';
        _this.overlayContainer_.style.zIndex = '0';
        _this.overlayContainer_.style.width = '100%';
        _this.overlayContainer_.style.height = '100%';
        _this.overlayContainer_.style.pointerEvents = 'none';
        _this.overlayContainer_.className = 'ol-overlaycontainer';
        _this.viewport_.appendChild(_this.overlayContainer_);
        /**
         * @private
         * @type {!HTMLElement}
         */
        _this.overlayContainerStopEvent_ = document.createElement('div');
        _this.overlayContainerStopEvent_.style.position = 'absolute';
        _this.overlayContainerStopEvent_.style.zIndex = '0';
        _this.overlayContainerStopEvent_.style.width = '100%';
        _this.overlayContainerStopEvent_.style.height = '100%';
        _this.overlayContainerStopEvent_.style.pointerEvents = 'none';
        _this.overlayContainerStopEvent_.className = 'ol-overlaycontainer-stopevent';
        _this.viewport_.appendChild(_this.overlayContainerStopEvent_);
        /**
         * @private
         * @type {MapBrowserEventHandler}
         */
        _this.mapBrowserEventHandler_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.moveTolerance_ = options.moveTolerance;
        /**
         * @private
         * @type {HTMLElement|Document}
         */
        _this.keyboardEventTarget_ = optionsInternal.keyboardEventTarget;
        /**
         * @private
         * @type {?Array<import("./events.js").EventsKey>}
         */
        _this.keyHandlerKeys_ = null;
        /**
         * @type {Collection<import("./control/Control.js").default>}
         * @protected
         */
        _this.controls = optionsInternal.controls || new Collection();
        /**
         * @type {Collection<import("./interaction/Interaction.js").default>}
         * @protected
         */
        _this.interactions = optionsInternal.interactions || new Collection();
        /**
         * @type {Collection<import("./Overlay.js").default>}
         * @private
         */
        _this.overlays_ = optionsInternal.overlays;
        /**
         * A lookup of overlays by id.
         * @private
         * @type {Object<string, import("./Overlay.js").default>}
         */
        _this.overlayIdIndex_ = {};
        /**
         * @type {import("./renderer/Map.js").default}
         * @private
         */
        _this.renderer_ = null;
        /**
         * @type {undefined|function(Event): void}
         * @private
         */
        _this.handleResize_;
        /**
         * @private
         * @type {!Array<PostRenderFunction>}
         */
        _this.postRenderFunctions_ = [];
        /**
         * @private
         * @type {TileQueue}
         */
        _this.tileQueue_ = new TileQueue(_this.getTilePriority.bind(_this), _this.handleTileChange_.bind(_this));
        _this.addEventListener(getChangeEventType(MapProperty.LAYERGROUP), _this.handleLayerGroupChanged_);
        _this.addEventListener(getChangeEventType(MapProperty.VIEW), _this.handleViewChanged_);
        _this.addEventListener(getChangeEventType(MapProperty.SIZE), _this.handleSizeChanged_);
        _this.addEventListener(getChangeEventType(MapProperty.TARGET), _this.handleTargetChanged_);
        // setProperties will trigger the rendering of the map if the map
        // is "defined" already.
        _this.setProperties(optionsInternal.values);
        _this.controls.forEach(
        /**
         * @param {import("./control/Control.js").default} control Control.
         * @this {PluggableMap}
         */
        function (control) {
            control.setMap(this);
        }.bind(_this));
        _this.controls.addEventListener(CollectionEventType.ADD, 
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function (event) {
            event.element.setMap(this);
        }.bind(_this));
        _this.controls.addEventListener(CollectionEventType.REMOVE, 
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function (event) {
            event.element.setMap(null);
        }.bind(_this));
        _this.interactions.forEach(
        /**
         * @param {import("./interaction/Interaction.js").default} interaction Interaction.
         * @this {PluggableMap}
         */
        function (interaction) {
            interaction.setMap(this);
        }.bind(_this));
        _this.interactions.addEventListener(CollectionEventType.ADD, 
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function (event) {
            event.element.setMap(this);
        }.bind(_this));
        _this.interactions.addEventListener(CollectionEventType.REMOVE, 
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function (event) {
            event.element.setMap(null);
        }.bind(_this));
        _this.overlays_.forEach(_this.addOverlayInternal_.bind(_this));
        _this.overlays_.addEventListener(CollectionEventType.ADD, 
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function (event) {
            this.addOverlayInternal_(
            /** @type {import("./Overlay.js").default} */ (event.element));
        }.bind(_this));
        _this.overlays_.addEventListener(CollectionEventType.REMOVE, 
        /**
         * @param {import("./Collection.js").CollectionEvent} event CollectionEvent.
         */
        function (event) {
            var overlay = /** @type {import("./Overlay.js").default} */ (event.element);
            var id = overlay.getId();
            if (id !== undefined) {
                delete this.overlayIdIndex_[id.toString()];
            }
            event.element.setMap(null);
        }.bind(_this));
        return _this;
    }
    /**
     * @abstract
     * @return {import("./renderer/Map.js").default} The map renderer
     */
    PluggableMap.prototype.createRenderer = function () {
        throw new Error('Use a map type that has a createRenderer method');
    };
    /**
     * Add the given control to the map.
     * @param {import("./control/Control.js").default} control Control.
     * @api
     */
    PluggableMap.prototype.addControl = function (control) {
        this.getControls().push(control);
    };
    /**
     * Add the given interaction to the map. If you want to add an interaction
     * at another point of the collection use `getInteraction()` and the methods
     * available on {@link module:ol/Collection~Collection}. This can be used to
     * stop the event propagation from the handleEvent function. The interactions
     * get to handle the events in the reverse order of this collection.
     * @param {import("./interaction/Interaction.js").default} interaction Interaction to add.
     * @api
     */
    PluggableMap.prototype.addInteraction = function (interaction) {
        this.getInteractions().push(interaction);
    };
    /**
     * Adds the given layer to the top of this map. If you want to add a layer
     * elsewhere in the stack, use `getLayers()` and the methods available on
     * {@link module:ol/Collection~Collection}.
     * @param {import("./layer/Base.js").default} layer Layer.
     * @api
     */
    PluggableMap.prototype.addLayer = function (layer) {
        var layers = this.getLayerGroup().getLayers();
        layers.push(layer);
    };
    /**
     * Add the given overlay to the map.
     * @param {import("./Overlay.js").default} overlay Overlay.
     * @api
     */
    PluggableMap.prototype.addOverlay = function (overlay) {
        this.getOverlays().push(overlay);
    };
    /**
     * This deals with map's overlay collection changes.
     * @param {import("./Overlay.js").default} overlay Overlay.
     * @private
     */
    PluggableMap.prototype.addOverlayInternal_ = function (overlay) {
        var id = overlay.getId();
        if (id !== undefined) {
            this.overlayIdIndex_[id.toString()] = overlay;
        }
        overlay.setMap(this);
    };
    /**
     *
     * Clean up.
     */
    PluggableMap.prototype.disposeInternal = function () {
        this.setTarget(null);
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Detect features that intersect a pixel on the viewport, and execute a
     * callback with each intersecting feature. Layers included in the detection can
     * be configured through the `layerFilter` option in `opt_options`.
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {function(import("./Feature.js").FeatureLike, import("./layer/Layer.js").default, import("./geom/SimpleGeometry.js").default): T} callback Feature callback. The callback will be
     *     called with two arguments. The first argument is one
     *     {@link module:ol/Feature feature} or
     *     {@link module:ol/render/Feature render feature} at the pixel, the second is
     *     the {@link module:ol/layer/Layer layer} of the feature and will be null for
     *     unmanaged layers. To stop detection, callback functions can return a
     *     truthy value.
     * @param {AtPixelOptions=} opt_options Optional options.
     * @return {T|undefined} Callback result, i.e. the return value of last
     * callback execution, or the first truthy callback return value.
     * @template S,T
     * @api
     */
    PluggableMap.prototype.forEachFeatureAtPixel = function (pixel, callback, opt_options) {
        if (!this.frameState_) {
            return;
        }
        var coordinate = this.getCoordinateFromPixelInternal(pixel);
        opt_options = opt_options !== undefined ? opt_options : {};
        var hitTolerance = opt_options.hitTolerance !== undefined ? opt_options.hitTolerance : 0;
        var layerFilter = opt_options.layerFilter !== undefined ? opt_options.layerFilter : TRUE;
        var checkWrapped = opt_options.checkWrapped !== false;
        return this.renderer_.forEachFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, callback, null, layerFilter, null);
    };
    /**
     * Get all features that intersect a pixel on the viewport.
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {AtPixelOptions=} opt_options Optional options.
     * @return {Array<import("./Feature.js").FeatureLike>} The detected features or
     * an empty array if none were found.
     * @api
     */
    PluggableMap.prototype.getFeaturesAtPixel = function (pixel, opt_options) {
        var features = [];
        this.forEachFeatureAtPixel(pixel, function (feature) {
            features.push(feature);
        }, opt_options);
        return features;
    };
    /**
     * Detect layers that have a color value at a pixel on the viewport, and
     * execute a callback with each matching layer. Layers included in the
     * detection can be configured through `opt_layerFilter`.
     *
     * Note: this may give false positives unless the map layers have had different `className`
     * properties assigned to them.
     *
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {function(this: S, import("./layer/Layer.js").default, (Uint8ClampedArray|Uint8Array)): T} callback
     *     Layer callback. This callback will receive two arguments: first is the
     *     {@link module:ol/layer/Layer layer}, second argument is an array representing
     *     [R, G, B, A] pixel values (0 - 255) and will be `null` for layer types
     *     that do not currently support this argument. To stop detection, callback
     *     functions can return a truthy value.
     * @param {AtPixelOptions=} opt_options Configuration options.
     * @return {T|undefined} Callback result, i.e. the return value of last
     * callback execution, or the first truthy callback return value.
     * @template S,T
     * @api
     */
    PluggableMap.prototype.forEachLayerAtPixel = function (pixel, callback, opt_options) {
        if (!this.frameState_) {
            return;
        }
        var options = opt_options || {};
        var hitTolerance = options.hitTolerance !== undefined ? options.hitTolerance : 0;
        var layerFilter = options.layerFilter || TRUE;
        return this.renderer_.forEachLayerAtPixel(pixel, this.frameState_, hitTolerance, callback, layerFilter);
    };
    /**
     * Detect if features intersect a pixel on the viewport. Layers included in the
     * detection can be configured through `opt_layerFilter`.
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {AtPixelOptions=} opt_options Optional options.
     * @return {boolean} Is there a feature at the given pixel?
     * @api
     */
    PluggableMap.prototype.hasFeatureAtPixel = function (pixel, opt_options) {
        if (!this.frameState_) {
            return false;
        }
        var coordinate = this.getCoordinateFromPixelInternal(pixel);
        opt_options = opt_options !== undefined ? opt_options : {};
        var layerFilter = opt_options.layerFilter !== undefined ? opt_options.layerFilter : TRUE;
        var hitTolerance = opt_options.hitTolerance !== undefined ? opt_options.hitTolerance : 0;
        var checkWrapped = opt_options.checkWrapped !== false;
        return this.renderer_.hasFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, layerFilter, null);
    };
    /**
     * Returns the coordinate in user projection for a browser event.
     * @param {MouseEvent} event Event.
     * @return {import("./coordinate.js").Coordinate} Coordinate.
     * @api
     */
    PluggableMap.prototype.getEventCoordinate = function (event) {
        return this.getCoordinateFromPixel(this.getEventPixel(event));
    };
    /**
     * Returns the coordinate in view projection for a browser event.
     * @param {MouseEvent} event Event.
     * @return {import("./coordinate.js").Coordinate} Coordinate.
     */
    PluggableMap.prototype.getEventCoordinateInternal = function (event) {
        return this.getCoordinateFromPixelInternal(this.getEventPixel(event));
    };
    /**
     * Returns the map pixel position for a browser event relative to the viewport.
     * @param {UIEvent} event Event.
     * @return {import("./pixel.js").Pixel} Pixel.
     * @api
     */
    PluggableMap.prototype.getEventPixel = function (event) {
        var viewportPosition = this.viewport_.getBoundingClientRect();
        var eventPosition = 
        //FIXME Are we really calling this with a TouchEvent anywhere?
        'changedTouches' in event
            ? /** @type {TouchEvent} */ (event).changedTouches[0]
            : /** @type {MouseEvent} */ (event);
        return [
            eventPosition.clientX - viewportPosition.left,
            eventPosition.clientY - viewportPosition.top,
        ];
    };
    /**
     * Get the target in which this map is rendered.
     * Note that this returns what is entered as an option or in setTarget:
     * if that was an element, it returns an element; if a string, it returns that.
     * @return {HTMLElement|string|undefined} The Element or id of the Element that the
     *     map is rendered in.
     * @observable
     * @api
     */
    PluggableMap.prototype.getTarget = function () {
        return /** @type {HTMLElement|string|undefined} */ (this.get(MapProperty.TARGET));
    };
    /**
     * Get the DOM element into which this map is rendered. In contrast to
     * `getTarget` this method always return an `Element`, or `null` if the
     * map has no target.
     * @return {HTMLElement} The element that the map is rendered in.
     * @api
     */
    PluggableMap.prototype.getTargetElement = function () {
        var target = this.getTarget();
        if (target !== undefined) {
            return typeof target === 'string'
                ? document.getElementById(target)
                : target;
        }
        else {
            return null;
        }
    };
    /**
     * Get the coordinate for a given pixel.  This returns a coordinate in the
     * user projection.
     * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
     * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
     * @api
     */
    PluggableMap.prototype.getCoordinateFromPixel = function (pixel) {
        return toUserCoordinate(this.getCoordinateFromPixelInternal(pixel), this.getView().getProjection());
    };
    /**
     * Get the coordinate for a given pixel.  This returns a coordinate in the
     * map view projection.
     * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
     * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
     */
    PluggableMap.prototype.getCoordinateFromPixelInternal = function (pixel) {
        var frameState = this.frameState_;
        if (!frameState) {
            return null;
        }
        else {
            return apply(frameState.pixelToCoordinateTransform, pixel.slice());
        }
    };
    /**
     * Get the map controls. Modifying this collection changes the controls
     * associated with the map.
     * @return {Collection<import("./control/Control.js").default>} Controls.
     * @api
     */
    PluggableMap.prototype.getControls = function () {
        return this.controls;
    };
    /**
     * Get the map overlays. Modifying this collection changes the overlays
     * associated with the map.
     * @return {Collection<import("./Overlay.js").default>} Overlays.
     * @api
     */
    PluggableMap.prototype.getOverlays = function () {
        return this.overlays_;
    };
    /**
     * Get an overlay by its identifier (the value returned by overlay.getId()).
     * Note that the index treats string and numeric identifiers as the same. So
     * `map.getOverlayById(2)` will return an overlay with id `'2'` or `2`.
     * @param {string|number} id Overlay identifier.
     * @return {import("./Overlay.js").default} Overlay.
     * @api
     */
    PluggableMap.prototype.getOverlayById = function (id) {
        var overlay = this.overlayIdIndex_[id.toString()];
        return overlay !== undefined ? overlay : null;
    };
    /**
     * Get the map interactions. Modifying this collection changes the interactions
     * associated with the map.
     *
     * Interactions are used for e.g. pan, zoom and rotate.
     * @return {Collection<import("./interaction/Interaction.js").default>} Interactions.
     * @api
     */
    PluggableMap.prototype.getInteractions = function () {
        return this.interactions;
    };
    /**
     * Get the layergroup associated with this map.
     * @return {LayerGroup} A layer group containing the layers in this map.
     * @observable
     * @api
     */
    PluggableMap.prototype.getLayerGroup = function () {
        return /** @type {LayerGroup} */ (this.get(MapProperty.LAYERGROUP));
    };
    /**
     * Get the collection of layers associated with this map.
     * @return {!Collection<import("./layer/Base.js").default>} Layers.
     * @api
     */
    PluggableMap.prototype.getLayers = function () {
        var layers = this.getLayerGroup().getLayers();
        return layers;
    };
    /**
     * @return {boolean} Layers have sources that are still loading.
     */
    PluggableMap.prototype.getLoading = function () {
        var layerStatesArray = this.getLayerGroup().getLayerStatesArray();
        for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
            var layer = layerStatesArray[i].layer;
            var source = /** @type {import("./layer/Layer.js").default} */ (layer).getSource();
            if (source && source.loading) {
                return true;
            }
        }
        return false;
    };
    /**
     * Get the pixel for a coordinate.  This takes a coordinate in the user
     * projection and returns the corresponding pixel.
     * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
     * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
     * @api
     */
    PluggableMap.prototype.getPixelFromCoordinate = function (coordinate) {
        var viewCoordinate = fromUserCoordinate(coordinate, this.getView().getProjection());
        return this.getPixelFromCoordinateInternal(viewCoordinate);
    };
    /**
     * Get the pixel for a coordinate.  This takes a coordinate in the map view
     * projection and returns the corresponding pixel.
     * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
     * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
     */
    PluggableMap.prototype.getPixelFromCoordinateInternal = function (coordinate) {
        var frameState = this.frameState_;
        if (!frameState) {
            return null;
        }
        else {
            return apply(frameState.coordinateToPixelTransform, coordinate.slice(0, 2));
        }
    };
    /**
     * Get the map renderer.
     * @return {import("./renderer/Map.js").default} Renderer
     */
    PluggableMap.prototype.getRenderer = function () {
        return this.renderer_;
    };
    /**
     * Get the size of this map.
     * @return {import("./size.js").Size|undefined} The size in pixels of the map in the DOM.
     * @observable
     * @api
     */
    PluggableMap.prototype.getSize = function () {
        return /** @type {import("./size.js").Size|undefined} */ (this.get(MapProperty.SIZE));
    };
    /**
     * Get the view associated with this map. A view manages properties such as
     * center and resolution.
     * @return {View} The view that controls this map.
     * @observable
     * @api
     */
    PluggableMap.prototype.getView = function () {
        return /** @type {View} */ (this.get(MapProperty.VIEW));
    };
    /**
     * Get the element that serves as the map viewport.
     * @return {HTMLElement} Viewport.
     * @api
     */
    PluggableMap.prototype.getViewport = function () {
        return this.viewport_;
    };
    /**
     * Get the element that serves as the container for overlays.  Elements added to
     * this container will let mousedown and touchstart events through to the map,
     * so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
     * events.
     * @return {!HTMLElement} The map's overlay container.
     */
    PluggableMap.prototype.getOverlayContainer = function () {
        return this.overlayContainer_;
    };
    /**
     * Get the element that serves as a container for overlays that don't allow
     * event propagation. Elements added to this container won't let mousedown and
     * touchstart events through to the map, so clicks and gestures on an overlay
     * don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     * @return {!HTMLElement} The map's overlay container that stops events.
     */
    PluggableMap.prototype.getOverlayContainerStopEvent = function () {
        return this.overlayContainerStopEvent_;
    };
    /**
     * @return {!Document} The document where the map is displayed.
     */
    PluggableMap.prototype.getOwnerDocument = function () {
        return this.getTargetElement()
            ? this.getTargetElement().ownerDocument
            : document;
    };
    /**
     * @param {import("./Tile.js").default} tile Tile.
     * @param {string} tileSourceKey Tile source key.
     * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
     * @param {number} tileResolution Tile resolution.
     * @return {number} Tile priority.
     */
    PluggableMap.prototype.getTilePriority = function (tile, tileSourceKey, tileCenter, tileResolution) {
        return getTilePriority(this.frameState_, tile, tileSourceKey, tileCenter, tileResolution);
    };
    /**
     * @param {UIEvent} browserEvent Browser event.
     * @param {string=} opt_type Type.
     */
    PluggableMap.prototype.handleBrowserEvent = function (browserEvent, opt_type) {
        var type = opt_type || browserEvent.type;
        var mapBrowserEvent = new MapBrowserEvent(type, this, browserEvent);
        this.handleMapBrowserEvent(mapBrowserEvent);
    };
    /**
     * @param {MapBrowserEvent} mapBrowserEvent The event to handle.
     */
    PluggableMap.prototype.handleMapBrowserEvent = function (mapBrowserEvent) {
        if (!this.frameState_) {
            // With no view defined, we cannot translate pixels into geographical
            // coordinates so interactions cannot be used.
            return;
        }
        var originalEvent = /** @type {PointerEvent} */ (mapBrowserEvent.originalEvent);
        var eventType = originalEvent.type;
        if (eventType === PointerEventType.POINTERDOWN ||
            eventType === EventType.WHEEL ||
            eventType === EventType.KEYDOWN) {
            var doc = this.getOwnerDocument();
            var rootNode = this.viewport_.getRootNode
                ? this.viewport_.getRootNode()
                : doc;
            var target = 'host' in rootNode // ShadowRoot
                ? /** @type {ShadowRoot} */ (rootNode).elementFromPoint(originalEvent.clientX, originalEvent.clientY)
                : /** @type {Node} */ (originalEvent.target);
            if (
            // Abort if the target is a child of the container for elements whose events are not meant
            // to be handled by map interactions.
            this.overlayContainerStopEvent_.contains(target) ||
                // Abort if the event target is a child of the container that is no longer in the page.
                // It's possible for the target to no longer be in the page if it has been removed in an
                // event listener, this might happen in a Control that recreates it's content based on
                // user interaction either manually or via a render in something like https://reactjs.org/
                !(rootNode === doc ? doc.documentElement : rootNode).contains(target)) {
                return;
            }
        }
        mapBrowserEvent.frameState = this.frameState_;
        if (this.dispatchEvent(mapBrowserEvent) !== false) {
            var interactionsArray = this.getInteractions().getArray().slice();
            for (var i = interactionsArray.length - 1; i >= 0; i--) {
                var interaction = interactionsArray[i];
                if (interaction.getMap() !== this ||
                    !interaction.getActive() ||
                    !this.getTargetElement()) {
                    continue;
                }
                var cont = interaction.handleEvent(mapBrowserEvent);
                if (!cont || mapBrowserEvent.propagationStopped) {
                    break;
                }
            }
        }
    };
    /**
     * @protected
     */
    PluggableMap.prototype.handlePostRender = function () {
        var frameState = this.frameState_;
        // Manage the tile queue
        // Image loads are expensive and a limited resource, so try to use them
        // efficiently:
        // * When the view is static we allow a large number of parallel tile loads
        //   to complete the frame as quickly as possible.
        // * When animating or interacting, image loads can cause janks, so we reduce
        //   the maximum number of loads per frame and limit the number of parallel
        //   tile loads to remain reactive to view changes and to reduce the chance of
        //   loading tiles that will quickly disappear from view.
        var tileQueue = this.tileQueue_;
        if (!tileQueue.isEmpty()) {
            var maxTotalLoading = this.maxTilesLoading_;
            var maxNewLoads = maxTotalLoading;
            if (frameState) {
                var hints = frameState.viewHints;
                if (hints[ViewHint.ANIMATING] || hints[ViewHint.INTERACTING]) {
                    var lowOnFrameBudget = !IMAGE_DECODE && Date.now() - frameState.time > 8;
                    maxTotalLoading = lowOnFrameBudget ? 0 : 8;
                    maxNewLoads = lowOnFrameBudget ? 0 : 2;
                }
            }
            if (tileQueue.getTilesLoading() < maxTotalLoading) {
                tileQueue.reprioritize(); // FIXME only call if view has changed
                tileQueue.loadMoreTiles(maxTotalLoading, maxNewLoads);
            }
        }
        if (frameState &&
            this.hasListener(RenderEventType.RENDERCOMPLETE) &&
            !frameState.animate &&
            !this.tileQueue_.getTilesLoading() &&
            !this.getLoading()) {
            this.renderer_.dispatchRenderEvent(RenderEventType.RENDERCOMPLETE, frameState);
        }
        var postRenderFunctions = this.postRenderFunctions_;
        for (var i = 0, ii = postRenderFunctions.length; i < ii; ++i) {
            postRenderFunctions[i](this, frameState);
        }
        postRenderFunctions.length = 0;
    };
    /**
     * @private
     */
    PluggableMap.prototype.handleSizeChanged_ = function () {
        if (this.getView() && !this.getView().getAnimating()) {
            this.getView().resolveConstraints(0);
        }
        this.render();
    };
    /**
     * @private
     */
    PluggableMap.prototype.handleTargetChanged_ = function () {
        // target may be undefined, null, a string or an Element.
        // If it's a string we convert it to an Element before proceeding.
        // If it's not now an Element we remove the viewport from the DOM.
        // If it's an Element we append the viewport element to it.
        var targetElement;
        if (this.getTarget()) {
            targetElement = this.getTargetElement();
        }
        if (this.mapBrowserEventHandler_) {
            for (var i = 0, ii = this.keyHandlerKeys_.length; i < ii; ++i) {
                unlistenByKey(this.keyHandlerKeys_[i]);
            }
            this.keyHandlerKeys_ = null;
            this.viewport_.removeEventListener(EventType.CONTEXTMENU, this.boundHandleBrowserEvent_);
            this.viewport_.removeEventListener(EventType.WHEEL, this.boundHandleBrowserEvent_);
            if (this.handleResize_ !== undefined) {
                removeEventListener(EventType.RESIZE, this.handleResize_, false);
                this.handleResize_ = undefined;
            }
            this.mapBrowserEventHandler_.dispose();
            this.mapBrowserEventHandler_ = null;
            removeNode(this.viewport_);
        }
        if (!targetElement) {
            if (this.renderer_) {
                clearTimeout(this.postRenderTimeoutHandle_);
                this.postRenderTimeoutHandle_ = undefined;
                this.postRenderFunctions_.length = 0;
                this.renderer_.dispose();
                this.renderer_ = null;
            }
            if (this.animationDelayKey_) {
                cancelAnimationFrame(this.animationDelayKey_);
                this.animationDelayKey_ = undefined;
            }
        }
        else {
            targetElement.appendChild(this.viewport_);
            if (!this.renderer_) {
                this.renderer_ = this.createRenderer();
            }
            this.mapBrowserEventHandler_ = new MapBrowserEventHandler(this, this.moveTolerance_);
            for (var key in MapBrowserEventType) {
                this.mapBrowserEventHandler_.addEventListener(MapBrowserEventType[key], this.handleMapBrowserEvent.bind(this));
            }
            this.viewport_.addEventListener(EventType.CONTEXTMENU, this.boundHandleBrowserEvent_, false);
            this.viewport_.addEventListener(EventType.WHEEL, this.boundHandleBrowserEvent_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
            var keyboardEventTarget = !this.keyboardEventTarget_
                ? targetElement
                : this.keyboardEventTarget_;
            this.keyHandlerKeys_ = [
                listen(keyboardEventTarget, EventType.KEYDOWN, this.handleBrowserEvent, this),
                listen(keyboardEventTarget, EventType.KEYPRESS, this.handleBrowserEvent, this),
            ];
            if (!this.handleResize_) {
                this.handleResize_ = this.updateSize.bind(this);
                window.addEventListener(EventType.RESIZE, this.handleResize_, false);
            }
        }
        this.updateSize();
        // updateSize calls setSize, so no need to call this.render
        // ourselves here.
    };
    /**
     * @private
     */
    PluggableMap.prototype.handleTileChange_ = function () {
        this.render();
    };
    /**
     * @private
     */
    PluggableMap.prototype.handleViewPropertyChanged_ = function () {
        this.render();
    };
    /**
     * @private
     */
    PluggableMap.prototype.handleViewChanged_ = function () {
        if (this.viewPropertyListenerKey_) {
            unlistenByKey(this.viewPropertyListenerKey_);
            this.viewPropertyListenerKey_ = null;
        }
        if (this.viewChangeListenerKey_) {
            unlistenByKey(this.viewChangeListenerKey_);
            this.viewChangeListenerKey_ = null;
        }
        var view = this.getView();
        if (view) {
            this.updateViewportSize_();
            this.viewPropertyListenerKey_ = listen(view, ObjectEventType.PROPERTYCHANGE, this.handleViewPropertyChanged_, this);
            this.viewChangeListenerKey_ = listen(view, EventType.CHANGE, this.handleViewPropertyChanged_, this);
            view.resolveConstraints(0);
        }
        this.render();
    };
    /**
     * @private
     */
    PluggableMap.prototype.handleLayerGroupChanged_ = function () {
        if (this.layerGroupPropertyListenerKeys_) {
            this.layerGroupPropertyListenerKeys_.forEach(unlistenByKey);
            this.layerGroupPropertyListenerKeys_ = null;
        }
        var layerGroup = this.getLayerGroup();
        if (layerGroup) {
            this.layerGroupPropertyListenerKeys_ = [
                listen(layerGroup, ObjectEventType.PROPERTYCHANGE, this.render, this),
                listen(layerGroup, EventType.CHANGE, this.render, this),
            ];
        }
        this.render();
    };
    /**
     * @return {boolean} Is rendered.
     */
    PluggableMap.prototype.isRendered = function () {
        return !!this.frameState_;
    };
    /**
     * Requests an immediate render in a synchronous manner.
     * @api
     */
    PluggableMap.prototype.renderSync = function () {
        if (this.animationDelayKey_) {
            cancelAnimationFrame(this.animationDelayKey_);
        }
        this.animationDelay_();
    };
    /**
     * Redraws all text after new fonts have loaded
     */
    PluggableMap.prototype.redrawText = function () {
        var layerStates = this.getLayerGroup().getLayerStatesArray();
        for (var i = 0, ii = layerStates.length; i < ii; ++i) {
            var layer = layerStates[i].layer;
            if (layer.hasRenderer()) {
                layer.getRenderer().handleFontsChanged();
            }
        }
    };
    /**
     * Request a map rendering (at the next animation frame).
     * @api
     */
    PluggableMap.prototype.render = function () {
        if (this.renderer_ && this.animationDelayKey_ === undefined) {
            this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_);
        }
    };
    /**
     * Remove the given control from the map.
     * @param {import("./control/Control.js").default} control Control.
     * @return {import("./control/Control.js").default|undefined} The removed control (or undefined
     *     if the control was not found).
     * @api
     */
    PluggableMap.prototype.removeControl = function (control) {
        return this.getControls().remove(control);
    };
    /**
     * Remove the given interaction from the map.
     * @param {import("./interaction/Interaction.js").default} interaction Interaction to remove.
     * @return {import("./interaction/Interaction.js").default|undefined} The removed interaction (or
     *     undefined if the interaction was not found).
     * @api
     */
    PluggableMap.prototype.removeInteraction = function (interaction) {
        return this.getInteractions().remove(interaction);
    };
    /**
     * Removes the given layer from the map.
     * @param {import("./layer/Base.js").default} layer Layer.
     * @return {import("./layer/Base.js").default|undefined} The removed layer (or undefined if the
     *     layer was not found).
     * @api
     */
    PluggableMap.prototype.removeLayer = function (layer) {
        var layers = this.getLayerGroup().getLayers();
        return layers.remove(layer);
    };
    /**
     * Remove the given overlay from the map.
     * @param {import("./Overlay.js").default} overlay Overlay.
     * @return {import("./Overlay.js").default|undefined} The removed overlay (or undefined
     *     if the overlay was not found).
     * @api
     */
    PluggableMap.prototype.removeOverlay = function (overlay) {
        return this.getOverlays().remove(overlay);
    };
    /**
     * @param {number} time Time.
     * @private
     */
    PluggableMap.prototype.renderFrame_ = function (time) {
        var _this = this;
        var size = this.getSize();
        var view = this.getView();
        var previousFrameState = this.frameState_;
        /** @type {?FrameState} */
        var frameState = null;
        if (size !== undefined && hasArea(size) && view && view.isDef()) {
            var viewHints = view.getHints(this.frameState_ ? this.frameState_.viewHints : undefined);
            var viewState = view.getState();
            frameState = {
                animate: false,
                coordinateToPixelTransform: this.coordinateToPixelTransform_,
                declutterTree: null,
                extent: getForViewAndSize(viewState.center, viewState.resolution, viewState.rotation, size),
                index: this.frameIndex_++,
                layerIndex: 0,
                layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
                pixelRatio: this.pixelRatio_,
                pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
                postRenderFunctions: [],
                size: size,
                tileQueue: this.tileQueue_,
                time: time,
                usedTiles: {},
                viewState: viewState,
                viewHints: viewHints,
                wantedTiles: {},
            };
        }
        this.frameState_ = frameState;
        this.renderer_.renderFrame(frameState);
        if (frameState) {
            if (frameState.animate) {
                this.render();
            }
            Array.prototype.push.apply(this.postRenderFunctions_, frameState.postRenderFunctions);
            if (previousFrameState) {
                var moveStart = !this.previousExtent_ ||
                    (!isEmpty(this.previousExtent_) &&
                        !equals$1(frameState.extent, this.previousExtent_));
                if (moveStart) {
                    this.dispatchEvent(new MapEvent(MapEventType.MOVESTART, this, previousFrameState));
                    this.previousExtent_ = createOrUpdateEmpty(this.previousExtent_);
                }
            }
            var idle = this.previousExtent_ &&
                !frameState.viewHints[ViewHint.ANIMATING] &&
                !frameState.viewHints[ViewHint.INTERACTING] &&
                !equals$1(frameState.extent, this.previousExtent_);
            if (idle) {
                this.dispatchEvent(new MapEvent(MapEventType.MOVEEND, this, frameState));
                clone(frameState.extent, this.previousExtent_);
            }
        }
        this.dispatchEvent(new MapEvent(MapEventType.POSTRENDER, this, frameState));
        if (!this.postRenderTimeoutHandle_) {
            this.postRenderTimeoutHandle_ = setTimeout(function () {
                _this.postRenderTimeoutHandle_ = undefined;
                _this.handlePostRender();
            }, 0);
        }
    };
    /**
     * Sets the layergroup of this map.
     * @param {LayerGroup} layerGroup A layer group containing the layers in this map.
     * @observable
     * @api
     */
    PluggableMap.prototype.setLayerGroup = function (layerGroup) {
        this.set(MapProperty.LAYERGROUP, layerGroup);
    };
    /**
     * Set the size of this map.
     * @param {import("./size.js").Size|undefined} size The size in pixels of the map in the DOM.
     * @observable
     * @api
     */
    PluggableMap.prototype.setSize = function (size) {
        this.set(MapProperty.SIZE, size);
    };
    /**
     * Set the target element to render this map into.
     * @param {HTMLElement|string|undefined} target The Element or id of the Element
     *     that the map is rendered in.
     * @observable
     * @api
     */
    PluggableMap.prototype.setTarget = function (target) {
        this.set(MapProperty.TARGET, target);
    };
    /**
     * Set the view for this map.
     * @param {View} view The view that controls this map.
     * @observable
     * @api
     */
    PluggableMap.prototype.setView = function (view) {
        this.set(MapProperty.VIEW, view);
    };
    /**
     * Force a recalculation of the map viewport size.  This should be called when
     * third-party code changes the size of the map viewport.
     * @api
     */
    PluggableMap.prototype.updateSize = function () {
        var targetElement = this.getTargetElement();
        if (!targetElement) {
            this.setSize(undefined);
        }
        else {
            var computedStyle = getComputedStyle(targetElement);
            this.setSize([
                targetElement.offsetWidth -
                    parseFloat(computedStyle['borderLeftWidth']) -
                    parseFloat(computedStyle['paddingLeft']) -
                    parseFloat(computedStyle['paddingRight']) -
                    parseFloat(computedStyle['borderRightWidth']),
                targetElement.offsetHeight -
                    parseFloat(computedStyle['borderTopWidth']) -
                    parseFloat(computedStyle['paddingTop']) -
                    parseFloat(computedStyle['paddingBottom']) -
                    parseFloat(computedStyle['borderBottomWidth']),
            ]);
        }
        this.updateViewportSize_();
    };
    /**
     * Recomputes the viewport size and save it on the view object (if any)
     * @private
     */
    PluggableMap.prototype.updateViewportSize_ = function () {
        var view = this.getView();
        if (view) {
            var size = undefined;
            var computedStyle = getComputedStyle(this.viewport_);
            if (computedStyle.width && computedStyle.height) {
                size = [
                    parseInt(computedStyle.width, 10),
                    parseInt(computedStyle.height, 10),
                ];
            }
            view.setViewportSize(size);
        }
    };
    return PluggableMap;
}(BaseObject));
/**
 * @param {MapOptions} options Map options.
 * @return {MapOptionsInternal} Internal map options.
 */
function createOptionsInternal(options) {
    /**
     * @type {HTMLElement|Document}
     */
    var keyboardEventTarget = null;
    if (options.keyboardEventTarget !== undefined) {
        keyboardEventTarget =
            typeof options.keyboardEventTarget === 'string'
                ? document.getElementById(options.keyboardEventTarget)
                : options.keyboardEventTarget;
    }
    /**
     * @type {Object<string, *>}
     */
    var values = {};
    var layerGroup = options.layers &&
        typeof ( /** @type {?} */(options.layers).getLayers) === 'function'
        ? /** @type {LayerGroup} */ (options.layers)
        : new LayerGroup({ layers: /** @type {Collection} */ (options.layers) });
    values[MapProperty.LAYERGROUP] = layerGroup;
    values[MapProperty.TARGET] = options.target;
    values[MapProperty.VIEW] =
        options.view !== undefined ? options.view : new View();
    var controls;
    if (options.controls !== undefined) {
        if (Array.isArray(options.controls)) {
            controls = new Collection(options.controls.slice());
        }
        else {
            assert(typeof ( /** @type {?} */(options.controls).getArray) === 'function', 47); // Expected `controls` to be an array or an `import("./Collection.js").Collection`
            controls = /** @type {Collection} */ (options.controls);
        }
    }
    var interactions;
    if (options.interactions !== undefined) {
        if (Array.isArray(options.interactions)) {
            interactions = new Collection(options.interactions.slice());
        }
        else {
            assert(typeof ( /** @type {?} */(options.interactions).getArray) ===
                'function', 48); // Expected `interactions` to be an array or an `import("./Collection.js").Collection`
            interactions = /** @type {Collection} */ (options.interactions);
        }
    }
    var overlays;
    if (options.overlays !== undefined) {
        if (Array.isArray(options.overlays)) {
            overlays = new Collection(options.overlays.slice());
        }
        else {
            assert(typeof ( /** @type {?} */(options.overlays).getArray) === 'function', 49); // Expected `overlays` to be an array or an `import("./Collection.js").Collection`
            overlays = options.overlays;
        }
    }
    else {
        overlays = new Collection();
    }
    return {
        controls: controls,
        interactions: interactions,
        keyboardEventTarget: keyboardEventTarget,
        overlays: overlays,
        values: values,
    };
}

var __extends$h = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {HTMLElement} [element] The element is the control's
 * container element. This only needs to be specified if you're developing
 * a custom control.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want
 * the control to be rendered outside of the map's viewport.
 */
/**
 * @classdesc
 * A control is a visible widget with a DOM element in a fixed position on the
 * screen. They can involve user input (buttons), or be informational only;
 * the position is determined using CSS. By default these are placed in the
 * container with CSS class name `ol-overlaycontainer-stopevent`, but can use
 * any outside DOM element.
 *
 * This is the base class for controls. You can use it for simple custom
 * controls by creating the element with listeners, creating an instance:
 * ```js
 * var myControl = new Control({element: myElement});
 * ```
 * and then adding this to the map.
 *
 * The main advantage of having this as a control rather than a simple separate
 * DOM element is that preventing propagation is handled for you. Controls
 * will also be objects in a {@link module:ol/Collection~Collection}, so you can use their methods.
 *
 * You can also extend this base for your own control class. See
 * examples/custom-controls for an example of how to do this.
 *
 * @api
 */
var Control = /** @class */ (function (_super) {
    __extends$h(Control, _super);
    /**
     * @param {Options} options Control options.
     */
    function Control(options) {
        var _this = _super.call(this) || this;
        var element = options.element;
        if (element && !options.target && !element.style.pointerEvents) {
            element.style.pointerEvents = 'auto';
        }
        /**
         * @protected
         * @type {HTMLElement}
         */
        _this.element = element ? element : null;
        /**
         * @private
         * @type {HTMLElement}
         */
        _this.target_ = null;
        /**
         * @private
         * @type {import("../PluggableMap.js").default}
         */
        _this.map_ = null;
        /**
         * @protected
         * @type {!Array<import("../events.js").EventsKey>}
         */
        _this.listenerKeys = [];
        if (options.render) {
            _this.render = options.render;
        }
        if (options.target) {
            _this.setTarget(options.target);
        }
        return _this;
    }
    /**
     * Clean up.
     */
    Control.prototype.disposeInternal = function () {
        removeNode(this.element);
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Get the map associated with this control.
     * @return {import("../PluggableMap.js").default} Map.
     * @api
     */
    Control.prototype.getMap = function () {
        return this.map_;
    };
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     * @api
     */
    Control.prototype.setMap = function (map) {
        if (this.map_) {
            removeNode(this.element);
        }
        for (var i = 0, ii = this.listenerKeys.length; i < ii; ++i) {
            unlistenByKey(this.listenerKeys[i]);
        }
        this.listenerKeys.length = 0;
        this.map_ = map;
        if (this.map_) {
            var target = this.target_
                ? this.target_
                : map.getOverlayContainerStopEvent();
            target.appendChild(this.element);
            if (this.render !== VOID) {
                this.listenerKeys.push(listen(map, MapEventType.POSTRENDER, this.render, this));
            }
            map.render();
        }
    };
    /**
     * Renders the control.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @api
     */
    Control.prototype.render = function (mapEvent) { };
    /**
     * This function is used to set a target element for the control. It has no
     * effect if it is called after the control has been added to the map (i.e.
     * after `setMap` is called on the control). If no `target` is set in the
     * options passed to the control constructor and if `setTarget` is not called
     * then the control is added to the map's overlay container.
     * @param {HTMLElement|string} target Target.
     * @api
     */
    Control.prototype.setTarget = function (target) {
        this.target_ =
            typeof target === 'string' ? document.getElementById(target) : target;
    };
    return Control;
}(BaseObject));

var __extends$g = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-attribution'] CSS class name.
 * @property {HTMLElement|string} [target] Specify a target if you
 * want the control to be rendered outside of the map's
 * viewport.
 * @property {boolean} [collapsible] Specify if attributions can
 * be collapsed. If not specified, sources control this behavior with their
 * `attributionsCollapsible` setting.
 * @property {boolean} [collapsed=true] Specify if attributions should
 * be collapsed at startup.
 * @property {string} [tipLabel='Attributions'] Text label to use for the button tip.
 * @property {string} [label='i'] Text label to use for the
 * collapsed attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [expandClassName=className + '-expand'] CSS class name for the
 * collapsed attributions button.
 * @property {string|HTMLElement} [collapseLabel='»'] Text label to use
 * for the expanded attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [collapseClassName=className + '-collapse'] CSS class name for the
 * expanded attributions button.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 */
/**
 * @classdesc
 * Control to show all the attributions associated with the layer sources
 * in the map. This control is one of the default controls included in maps.
 * By default it will show in the bottom right portion of the map, but this can
 * be changed by using a css selector for `.ol-attribution`.
 *
 * @api
 */
var Attribution = /** @class */ (function (_super) {
    __extends$g(Attribution, _super);
    /**
     * @param {Options=} opt_options Attribution options.
     */
    function Attribution(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            render: options.render,
            target: options.target,
        }) || this;
        /**
         * @private
         * @type {HTMLElement}
         */
        _this.ulElement_ = document.createElement('ul');
        /**
         * @private
         * @type {boolean}
         */
        _this.collapsed_ =
            options.collapsed !== undefined ? options.collapsed : true;
        /**
         * @private
         * @type {boolean}
         */
        _this.userCollapsed_ = _this.collapsed_;
        /**
         * @private
         * @type {boolean}
         */
        _this.overrideCollapsible_ = options.collapsible !== undefined;
        /**
         * @private
         * @type {boolean}
         */
        _this.collapsible_ =
            options.collapsible !== undefined ? options.collapsible : true;
        if (!_this.collapsible_) {
            _this.collapsed_ = false;
        }
        var className = options.className !== undefined ? options.className : 'ol-attribution';
        var tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Attributions';
        var expandClassName = options.expandClassName !== undefined
            ? options.expandClassName
            : className + '-expand';
        var collapseLabel = options.collapseLabel !== undefined ? options.collapseLabel : '\u00BB';
        var collapseClassName = options.collapseClassName !== undefined
            ? options.collapseClassName
            : className + '-collpase';
        if (typeof collapseLabel === 'string') {
            /**
             * @private
             * @type {HTMLElement}
             */
            _this.collapseLabel_ = document.createElement('span');
            _this.collapseLabel_.textContent = collapseLabel;
            _this.collapseLabel_.className = collapseClassName;
        }
        else {
            _this.collapseLabel_ = collapseLabel;
        }
        var label = options.label !== undefined ? options.label : 'i';
        if (typeof label === 'string') {
            /**
             * @private
             * @type {HTMLElement}
             */
            _this.label_ = document.createElement('span');
            _this.label_.textContent = label;
            _this.label_.className = expandClassName;
        }
        else {
            _this.label_ = label;
        }
        var activeLabel = _this.collapsible_ && !_this.collapsed_ ? _this.collapseLabel_ : _this.label_;
        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.title = tipLabel;
        button.appendChild(activeLabel);
        button.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this), false);
        var cssClasses = className +
            ' ' +
            CLASS_UNSELECTABLE +
            ' ' +
            CLASS_CONTROL +
            (_this.collapsed_ && _this.collapsible_ ? ' ' + CLASS_COLLAPSED : '') +
            (_this.collapsible_ ? '' : ' ol-uncollapsible');
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(_this.ulElement_);
        element.appendChild(button);
        /**
         * A list of currently rendered resolutions.
         * @type {Array<string>}
         * @private
         */
        _this.renderedAttributions_ = [];
        /**
         * @private
         * @type {boolean}
         */
        _this.renderedVisible_ = true;
        return _this;
    }
    /**
     * Collect a list of visible attributions and set the collapsible state.
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @return {Array<string>} Attributions.
     * @private
     */
    Attribution.prototype.collectSourceAttributions_ = function (frameState) {
        /**
         * Used to determine if an attribution already exists.
         * @type {!Object<string, boolean>}
         */
        var lookup = {};
        /**
         * A list of visible attributions.
         * @type {Array<string>}
         */
        var visibleAttributions = [];
        var collapsible = true;
        var layerStatesArray = frameState.layerStatesArray;
        for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
            var layerState = layerStatesArray[i];
            if (!inView(layerState, frameState.viewState)) {
                continue;
            }
            var source = /** @type {import("../layer/Layer.js").default} */ (layerState.layer).getSource();
            if (!source) {
                continue;
            }
            var attributionGetter = source.getAttributions();
            if (!attributionGetter) {
                continue;
            }
            var attributions = attributionGetter(frameState);
            if (!attributions) {
                continue;
            }
            collapsible =
                collapsible && source.getAttributionsCollapsible() !== false;
            if (Array.isArray(attributions)) {
                for (var j = 0, jj = attributions.length; j < jj; ++j) {
                    if (!(attributions[j] in lookup)) {
                        visibleAttributions.push(attributions[j]);
                        lookup[attributions[j]] = true;
                    }
                }
            }
            else {
                if (!(attributions in lookup)) {
                    visibleAttributions.push(attributions);
                    lookup[attributions] = true;
                }
            }
        }
        if (!this.overrideCollapsible_) {
            this.setCollapsible(collapsible);
        }
        return visibleAttributions;
    };
    /**
     * @private
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    Attribution.prototype.updateElement_ = function (frameState) {
        if (!frameState) {
            if (this.renderedVisible_) {
                this.element.style.display = 'none';
                this.renderedVisible_ = false;
            }
            return;
        }
        var attributions = this.collectSourceAttributions_(frameState);
        var visible = attributions.length > 0;
        if (this.renderedVisible_ != visible) {
            this.element.style.display = visible ? '' : 'none';
            this.renderedVisible_ = visible;
        }
        if (equals$2(attributions, this.renderedAttributions_)) {
            return;
        }
        removeChildren(this.ulElement_);
        // append the attributions
        for (var i = 0, ii = attributions.length; i < ii; ++i) {
            var element = document.createElement('li');
            element.innerHTML = attributions[i];
            this.ulElement_.appendChild(element);
        }
        this.renderedAttributions_ = attributions;
    };
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    Attribution.prototype.handleClick_ = function (event) {
        event.preventDefault();
        this.handleToggle_();
        this.userCollapsed_ = this.collapsed_;
    };
    /**
     * @private
     */
    Attribution.prototype.handleToggle_ = function () {
        this.element.classList.toggle(CLASS_COLLAPSED);
        if (this.collapsed_) {
            replaceNode(this.collapseLabel_, this.label_);
        }
        else {
            replaceNode(this.label_, this.collapseLabel_);
        }
        this.collapsed_ = !this.collapsed_;
    };
    /**
     * Return `true` if the attribution is collapsible, `false` otherwise.
     * @return {boolean} True if the widget is collapsible.
     * @api
     */
    Attribution.prototype.getCollapsible = function () {
        return this.collapsible_;
    };
    /**
     * Set whether the attribution should be collapsible.
     * @param {boolean} collapsible True if the widget is collapsible.
     * @api
     */
    Attribution.prototype.setCollapsible = function (collapsible) {
        if (this.collapsible_ === collapsible) {
            return;
        }
        this.collapsible_ = collapsible;
        this.element.classList.toggle('ol-uncollapsible');
        if (this.userCollapsed_) {
            this.handleToggle_();
        }
    };
    /**
     * Collapse or expand the attribution according to the passed parameter. Will
     * not do anything if the attribution isn't collapsible or if the current
     * collapsed state is already the one requested.
     * @param {boolean} collapsed True if the widget is collapsed.
     * @api
     */
    Attribution.prototype.setCollapsed = function (collapsed) {
        this.userCollapsed_ = collapsed;
        if (!this.collapsible_ || this.collapsed_ === collapsed) {
            return;
        }
        this.handleToggle_();
    };
    /**
     * Return `true` when the attribution is currently collapsed or `false`
     * otherwise.
     * @return {boolean} True if the widget is collapsed.
     * @api
     */
    Attribution.prototype.getCollapsed = function () {
        return this.collapsed_;
    };
    /**
     * Update the attribution element.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @override
     */
    Attribution.prototype.render = function (mapEvent) {
        this.updateElement_(mapEvent.frameState);
    };
    return Attribution;
}(Control));

var __extends$f = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-rotate'] CSS class name.
 * @property {string|HTMLElement} [label='⇧'] Text label to use for the rotate button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Reset rotation'] Text label to use for the rotate tip.
 * @property {string} [compassClassName='ol-compass'] CSS class name for the compass.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {boolean} [autoHide=true] Hide the control when rotation is 0.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control should
 * be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {function():void} [resetNorth] Function called when the control is clicked.
 * This will override the default `resetNorth`.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */
/**
 * @classdesc
 * A button control to reset rotation to 0.
 * To style this control use css selector `.ol-rotate`. A `.ol-hidden` css
 * selector is added to the button when the rotation is 0.
 *
 * @api
 */
var Rotate = /** @class */ (function (_super) {
    __extends$f(Rotate, _super);
    /**
     * @param {Options=} opt_options Rotate options.
     */
    function Rotate(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            render: options.render,
            target: options.target,
        }) || this;
        var className = options.className !== undefined ? options.className : 'ol-rotate';
        var label = options.label !== undefined ? options.label : '\u21E7';
        var compassClassName = options.compassClassName !== undefined
            ? options.compassClassName
            : 'ol-compass';
        /**
         * @type {HTMLElement}
         * @private
         */
        _this.label_ = null;
        if (typeof label === 'string') {
            _this.label_ = document.createElement('span');
            _this.label_.className = compassClassName;
            _this.label_.textContent = label;
        }
        else {
            _this.label_ = label;
            _this.label_.classList.add(compassClassName);
        }
        var tipLabel = options.tipLabel ? options.tipLabel : 'Reset rotation';
        var button = document.createElement('button');
        button.className = className + '-reset';
        button.setAttribute('type', 'button');
        button.title = tipLabel;
        button.appendChild(_this.label_);
        button.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this), false);
        var cssClasses = className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(button);
        _this.callResetNorth_ = options.resetNorth ? options.resetNorth : undefined;
        /**
         * @type {number}
         * @private
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        /**
         * @type {boolean}
         * @private
         */
        _this.autoHide_ = options.autoHide !== undefined ? options.autoHide : true;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.rotation_ = undefined;
        if (_this.autoHide_) {
            _this.element.classList.add(CLASS_HIDDEN);
        }
        return _this;
    }
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    Rotate.prototype.handleClick_ = function (event) {
        event.preventDefault();
        if (this.callResetNorth_ !== undefined) {
            this.callResetNorth_();
        }
        else {
            this.resetNorth_();
        }
    };
    /**
     * @private
     */
    Rotate.prototype.resetNorth_ = function () {
        var map = this.getMap();
        var view = map.getView();
        if (!view) {
            // the map does not have a view, so we can't act
            // upon it
            return;
        }
        var rotation = view.getRotation();
        if (rotation !== undefined) {
            if (this.duration_ > 0 && rotation % (2 * Math.PI) !== 0) {
                view.animate({
                    rotation: 0,
                    duration: this.duration_,
                    easing: easeOut,
                });
            }
            else {
                view.setRotation(0);
            }
        }
    };
    /**
     * Update the rotate control element.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @override
     */
    Rotate.prototype.render = function (mapEvent) {
        var frameState = mapEvent.frameState;
        if (!frameState) {
            return;
        }
        var rotation = frameState.viewState.rotation;
        if (rotation != this.rotation_) {
            var transform = 'rotate(' + rotation + 'rad)';
            if (this.autoHide_) {
                var contains = this.element.classList.contains(CLASS_HIDDEN);
                if (!contains && rotation === 0) {
                    this.element.classList.add(CLASS_HIDDEN);
                }
                else if (contains && rotation !== 0) {
                    this.element.classList.remove(CLASS_HIDDEN);
                }
            }
            this.label_.style.transform = transform;
        }
        this.rotation_ = rotation;
    };
    return Rotate;
}(Control));

var __extends$e = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {string} [className='ol-zoom'] CSS class name.
 * @property {string} [zoomInClassName=className + '-in'] CSS class name for the zoom-in button.
 * @property {string} [zoomOutClassName=className + '-out'] CSS class name for the zoom-out button.
 * @property {string|HTMLElement} [zoomInLabel='+'] Text label to use for the zoom-in
 * button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|HTMLElement} [zoomOutLabel='-'] Text label to use for the zoom-out button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [zoomInTipLabel='Zoom in'] Text label to use for the button tip.
 * @property {string} [zoomOutTipLabel='Zoom out'] Text label to use for the button tip.
 * @property {number} [delta=1] The zoom delta applied on each click.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */
/**
 * @classdesc
 * A control with 2 buttons, one for zoom in and one for zoom out.
 * This control is one of the default controls of a map. To style this control
 * use css selectors `.ol-zoom-in` and `.ol-zoom-out`.
 *
 * @api
 */
var Zoom = /** @class */ (function (_super) {
    __extends$e(Zoom, _super);
    /**
     * @param {Options=} opt_options Zoom options.
     */
    function Zoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            element: document.createElement('div'),
            target: options.target,
        }) || this;
        var className = options.className !== undefined ? options.className : 'ol-zoom';
        var delta = options.delta !== undefined ? options.delta : 1;
        var zoomInClassName = options.zoomInClassName !== undefined
            ? options.zoomInClassName
            : className + '-in';
        var zoomOutClassName = options.zoomOutClassName !== undefined
            ? options.zoomOutClassName
            : className + '-out';
        var zoomInLabel = options.zoomInLabel !== undefined ? options.zoomInLabel : '+';
        var zoomOutLabel = options.zoomOutLabel !== undefined ? options.zoomOutLabel : '\u2212';
        var zoomInTipLabel = options.zoomInTipLabel !== undefined ? options.zoomInTipLabel : 'Zoom in';
        var zoomOutTipLabel = options.zoomOutTipLabel !== undefined
            ? options.zoomOutTipLabel
            : 'Zoom out';
        var inElement = document.createElement('button');
        inElement.className = zoomInClassName;
        inElement.setAttribute('type', 'button');
        inElement.title = zoomInTipLabel;
        inElement.appendChild(typeof zoomInLabel === 'string'
            ? document.createTextNode(zoomInLabel)
            : zoomInLabel);
        inElement.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this, delta), false);
        var outElement = document.createElement('button');
        outElement.className = zoomOutClassName;
        outElement.setAttribute('type', 'button');
        outElement.title = zoomOutTipLabel;
        outElement.appendChild(typeof zoomOutLabel === 'string'
            ? document.createTextNode(zoomOutLabel)
            : zoomOutLabel);
        outElement.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this, -delta), false);
        var cssClasses = className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
        var element = _this.element;
        element.className = cssClasses;
        element.appendChild(inElement);
        element.appendChild(outElement);
        /**
         * @type {number}
         * @private
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        return _this;
    }
    /**
     * @param {number} delta Zoom delta.
     * @param {MouseEvent} event The event to handle
     * @private
     */
    Zoom.prototype.handleClick_ = function (delta, event) {
        event.preventDefault();
        this.zoomByDelta_(delta);
    };
    /**
     * @param {number} delta Zoom delta.
     * @private
     */
    Zoom.prototype.zoomByDelta_ = function (delta) {
        var map = this.getMap();
        var view = map.getView();
        if (!view) {
            // the map does not have a view, so we can't act
            // upon it
            return;
        }
        var currentZoom = view.getZoom();
        if (currentZoom !== undefined) {
            var newZoom = view.getConstrainedZoom(currentZoom + delta);
            if (this.duration_ > 0) {
                if (view.getAnimating()) {
                    view.cancelAnimations();
                }
                view.animate({
                    zoom: newZoom,
                    duration: this.duration_,
                    easing: easeOut,
                });
            }
            else {
                view.setZoom(newZoom);
            }
        }
    };
    return Zoom;
}(Control));

/**
 * @module ol/control
 */
/**
 * @typedef {Object} DefaultsOptions
 * @property {boolean} [attribution=true] Include
 * {@link module:ol/control/Attribution~Attribution}.
 * @property {import("./control/Attribution.js").Options} [attributionOptions]
 * Options for {@link module:ol/control/Attribution~Attribution}.
 * @property {boolean} [rotate=true] Include
 * {@link module:ol/control/Rotate~Rotate}.
 * @property {import("./control/Rotate.js").Options} [rotateOptions] Options
 * for {@link module:ol/control/Rotate~Rotate}.
 * @property {boolean} [zoom] Include {@link module:ol/control/Zoom~Zoom}.
 * @property {import("./control/Zoom.js").Options} [zoomOptions] Options for
 * {@link module:ol/control/Zoom~Zoom}.
 * @api
 */
/**
 * Set of controls included in maps by default. Unless configured otherwise,
 * this returns a collection containing an instance of each of the following
 * controls:
 * * {@link module:ol/control/Zoom~Zoom}
 * * {@link module:ol/control/Rotate~Rotate}
 * * {@link module:ol/control/Attribution~Attribution}
 *
 * @param {DefaultsOptions=} opt_options
 * Defaults options.
 * @return {Collection<import("./control/Control.js").default>}
 * Controls.
 * @api
 */
function defaults$1(opt_options) {
    var options = opt_options ? opt_options : {};
    var controls = new Collection();
    var zoomControl = options.zoom !== undefined ? options.zoom : true;
    if (zoomControl) {
        controls.push(new Zoom(options.zoomOptions));
    }
    var rotateControl = options.rotate !== undefined ? options.rotate : true;
    if (rotateControl) {
        controls.push(new Rotate(options.rotateOptions));
    }
    var attributionControl = options.attribution !== undefined ? options.attribution : true;
    if (attributionControl) {
        controls.push(new Attribution(options.attributionOptions));
    }
    return controls;
}

/**
 * @module ol/interaction/Property
 */
/**
 * @enum {string}
 */
var InteractionProperty = {
    ACTIVE: 'active',
};

var __extends$d = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Object literal with config options for interactions.
 * @typedef {Object} InteractionOptions
 * @property {function(import("../MapBrowserEvent.js").default):boolean} handleEvent
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. If the function returns a falsy value, propagation of
 * the event to other interactions in the map's interactions chain will be
 * prevented (this includes functions with no explicit return). The interactions
 * are traversed in reverse order of the interactions collection of the map.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * User actions that change the state of the map. Some are similar to controls,
 * but are not associated with a DOM element.
 * For example, {@link module:ol/interaction/KeyboardZoom~KeyboardZoom} is
 * functionally the same as {@link module:ol/control/Zoom~Zoom}, but triggered
 * by a keyboard event not a button element event.
 * Although interactions do not have a DOM element, some of them do render
 * vectors and so are visible on the screen.
 * @api
 */
var Interaction = /** @class */ (function (_super) {
    __extends$d(Interaction, _super);
    /**
     * @param {InteractionOptions=} opt_options Options.
     */
    function Interaction(opt_options) {
        var _this = _super.call(this) || this;
        if (opt_options && opt_options.handleEvent) {
            _this.handleEvent = opt_options.handleEvent;
        }
        /**
         * @private
         * @type {import("../PluggableMap.js").default}
         */
        _this.map_ = null;
        _this.setActive(true);
        return _this;
    }
    /**
     * Return whether the interaction is currently active.
     * @return {boolean} `true` if the interaction is active, `false` otherwise.
     * @observable
     * @api
     */
    Interaction.prototype.getActive = function () {
        return /** @type {boolean} */ (this.get(InteractionProperty.ACTIVE));
    };
    /**
     * Get the map associated with this interaction.
     * @return {import("../PluggableMap.js").default} Map.
     * @api
     */
    Interaction.prototype.getMap = function () {
        return this.map_;
    };
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event}.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @api
     */
    Interaction.prototype.handleEvent = function (mapBrowserEvent) {
        return true;
    };
    /**
     * Activate or deactivate the interaction.
     * @param {boolean} active Active.
     * @observable
     * @api
     */
    Interaction.prototype.setActive = function (active) {
        this.set(InteractionProperty.ACTIVE, active);
    };
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     */
    Interaction.prototype.setMap = function (map) {
        this.map_ = map;
    };
    return Interaction;
}(BaseObject));
/**
 * @param {import("../View.js").default} view View.
 * @param {import("../coordinate.js").Coordinate} delta Delta.
 * @param {number=} opt_duration Duration.
 */
function pan(view, delta, opt_duration) {
    var currentCenter = view.getCenterInternal();
    if (currentCenter) {
        var center = [currentCenter[0] + delta[0], currentCenter[1] + delta[1]];
        view.animateInternal({
            duration: opt_duration !== undefined ? opt_duration : 250,
            easing: linear,
            center: view.getConstrainedCenter(center),
        });
    }
}
/**
 * @param {import("../View.js").default} view View.
 * @param {number} delta Delta from previous zoom level.
 * @param {import("../coordinate.js").Coordinate=} opt_anchor Anchor coordinate in the user projection.
 * @param {number=} opt_duration Duration.
 */
function zoomByDelta(view, delta, opt_anchor, opt_duration) {
    var currentZoom = view.getZoom();
    if (currentZoom === undefined) {
        return;
    }
    var newZoom = view.getConstrainedZoom(currentZoom + delta);
    var newResolution = view.getResolutionForZoom(newZoom);
    if (view.getAnimating()) {
        view.cancelAnimations();
    }
    view.animate({
        resolution: newResolution,
        anchor: opt_anchor,
        duration: opt_duration !== undefined ? opt_duration : 250,
        easing: easeOut,
    });
}

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [delta=1] The zoom delta applied on each double click.
 */
/**
 * @classdesc
 * Allows the user to zoom by double-clicking on the map.
 * @api
 */
var DoubleClickZoom = /** @class */ (function (_super) {
    __extends$c(DoubleClickZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DoubleClickZoom(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @private
         * @type {number}
         */
        _this.delta_ = options.delta ? options.delta : 1;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        return _this;
    }
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a
     * doubleclick) and eventually zooms the map.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     */
    DoubleClickZoom.prototype.handleEvent = function (mapBrowserEvent) {
        var stopEvent = false;
        if (mapBrowserEvent.type == MapBrowserEventType.DBLCLICK) {
            var browserEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
            var map = mapBrowserEvent.map;
            var anchor = mapBrowserEvent.coordinate;
            var delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
            var view = map.getView();
            zoomByDelta(view, delta, anchor, this.duration_);
            browserEvent.preventDefault();
            stopEvent = true;
        }
        return !stopEvent;
    };
    return DoubleClickZoom;
}(Interaction));

var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleDownEvent]
 * Function handling "down" events. If the function returns `true` then a drag
 * sequence is started.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleDragEvent]
 * Function handling "drag" events. This function is called on "move" events
 * during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. The function may return `false` to prevent the
 * propagation of the event to other interactions in the map's interactions
 * chain.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleMoveEvent]
 * Function handling "move" events. This function is called on "move" events.
 * This functions is also called during a drag sequence, so during a drag
 * sequence both the `handleDragEvent` function and this function are called.
 * If `handleDownEvent` is defined and it returns true this function will not
 * be called during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleUpEvent]
 *  Function handling "up" events. If the function returns `false` then the
 * current drag sequence is stopped.
 * @property {function(boolean):boolean} [stopDown]
 * Should the down event be propagated to other interactions, or should be
 * stopped?
 */
/**
 * @classdesc
 * Base class that calls user-defined functions on `down`, `move` and `up`
 * events. This class also manages "drag sequences".
 *
 * When the `handleDownEvent` user function returns `true` a drag sequence is
 * started. During a drag sequence the `handleDragEvent` user function is
 * called on `move` events. The drag sequence ends when the `handleUpEvent`
 * user function is called and returns `false`.
 * @api
 */
var PointerInteraction = /** @class */ (function (_super) {
    __extends$b(PointerInteraction, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function PointerInteraction(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, 
        /** @type {import("./Interaction.js").InteractionOptions} */ (options)) || this;
        if (options.handleDownEvent) {
            _this.handleDownEvent = options.handleDownEvent;
        }
        if (options.handleDragEvent) {
            _this.handleDragEvent = options.handleDragEvent;
        }
        if (options.handleMoveEvent) {
            _this.handleMoveEvent = options.handleMoveEvent;
        }
        if (options.handleUpEvent) {
            _this.handleUpEvent = options.handleUpEvent;
        }
        if (options.stopDown) {
            _this.stopDown = options.stopDown;
        }
        /**
         * @type {boolean}
         * @protected
         */
        _this.handlingDownUpSequence = false;
        /**
         * @type {!Object<string, PointerEvent>}
         * @private
         */
        _this.trackedPointers_ = {};
        /**
         * @type {Array<PointerEvent>}
         * @protected
         */
        _this.targetPointers = [];
        return _this;
    }
    /**
     * Returns the current number of pointers involved in the interaction,
     * e.g. `2` when two fingers are used.
     * @return {number} The number of pointers.
     * @api
     */
    PointerInteraction.prototype.getPointerCount = function () {
        return this.targetPointers.length;
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     * @protected
     */
    PointerInteraction.prototype.handleDownEvent = function (mapBrowserEvent) {
        return false;
    };
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @protected
     */
    PointerInteraction.prototype.handleDragEvent = function (mapBrowserEvent) { };
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} and may call into
     * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
     * detected.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @api
     */
    PointerInteraction.prototype.handleEvent = function (mapBrowserEvent) {
        if (!mapBrowserEvent.originalEvent) {
            return true;
        }
        var stopEvent = false;
        this.updateTrackedPointers_(mapBrowserEvent);
        if (this.handlingDownUpSequence) {
            if (mapBrowserEvent.type == MapBrowserEventType.POINTERDRAG) {
                this.handleDragEvent(mapBrowserEvent);
                // prevent page scrolling during dragging
                mapBrowserEvent.originalEvent.preventDefault();
            }
            else if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
                var handledUp = this.handleUpEvent(mapBrowserEvent);
                this.handlingDownUpSequence =
                    handledUp && this.targetPointers.length > 0;
            }
        }
        else {
            if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
                var handled = this.handleDownEvent(mapBrowserEvent);
                this.handlingDownUpSequence = handled;
                stopEvent = this.stopDown(handled);
            }
            else if (mapBrowserEvent.type == MapBrowserEventType.POINTERMOVE) {
                this.handleMoveEvent(mapBrowserEvent);
            }
        }
        return !stopEvent;
    };
    /**
     * Handle pointer move events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @protected
     */
    PointerInteraction.prototype.handleMoveEvent = function (mapBrowserEvent) { };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     * @protected
     */
    PointerInteraction.prototype.handleUpEvent = function (mapBrowserEvent) {
        return false;
    };
    /**
     * This function is used to determine if "down" events should be propagated
     * to other interactions or should be stopped.
     * @param {boolean} handled Was the event handled by the interaction?
     * @return {boolean} Should the `down` event be stopped?
     */
    PointerInteraction.prototype.stopDown = function (handled) {
        return handled;
    };
    /**
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @private
     */
    PointerInteraction.prototype.updateTrackedPointers_ = function (mapBrowserEvent) {
        if (isPointerDraggingEvent(mapBrowserEvent)) {
            var event_1 = mapBrowserEvent.originalEvent;
            var id = event_1.pointerId.toString();
            if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
                delete this.trackedPointers_[id];
            }
            else if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
                this.trackedPointers_[id] = event_1;
            }
            else if (id in this.trackedPointers_) {
                // update only when there was a pointerdown event for this pointer
                this.trackedPointers_[id] = event_1;
            }
            this.targetPointers = getValues(this.trackedPointers_);
        }
    };
    return PointerInteraction;
}(Interaction));
/**
 * @param {Array<PointerEvent>} pointerEvents List of events.
 * @return {import("../pixel.js").Pixel} Centroid pixel.
 */
function centroid(pointerEvents) {
    var length = pointerEvents.length;
    var clientX = 0;
    var clientY = 0;
    for (var i = 0; i < length; i++) {
        clientX += pointerEvents[i].clientX;
        clientY += pointerEvents[i].clientY;
    }
    return [clientX / length, clientY / length];
}
/**
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
 * @return {boolean} Whether the event is a pointerdown, pointerdrag
 *     or pointerup event.
 */
function isPointerDraggingEvent(mapBrowserEvent) {
    var type = mapBrowserEvent.type;
    return (type === MapBrowserEventType.POINTERDOWN ||
        type === MapBrowserEventType.POINTERDRAG ||
        type === MapBrowserEventType.POINTERUP);
}

/**
 * @module ol/events/condition
 */
/**
 * A function that takes an {@link module:ol/MapBrowserEvent} and returns a
 * `{boolean}`. If the condition is met, true should be returned.
 *
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default): boolean} Condition
 */
/**
 * Creates a condition function that passes when all provided conditions pass.
 * @param {...Condition} var_args Conditions to check.
 * @return {Condition} Condition function.
 */
function all(var_args) {
    var conditions = arguments;
    /**
     * @param {import("../MapBrowserEvent.js").default} event Event.
     * @return {boolean} All conditions passed.
     */
    return function (event) {
        var pass = true;
        for (var i = 0, ii = conditions.length; i < ii; ++i) {
            pass = pass && conditions[i](event);
            if (!pass) {
                break;
            }
        }
        return pass;
    };
}
/**
 * Return `true` if only the alt-key and shift-key is pressed, `false` otherwise
 * (e.g. when additionally the platform-modifier-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the alt and shift keys are pressed.
 * @api
 */
var altShiftKeysOnly = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (originalEvent.altKey &&
        !(originalEvent.metaKey || originalEvent.ctrlKey) &&
        originalEvent.shiftKey);
};
/**
 * Return `true` if the map has the focus. This condition requires a map target
 * element with a `tabindex` attribute, e.g. `<div id="map" tabindex="1">`.
 *
 * @param {import("../MapBrowserEvent.js").default} event Map browser event.
 * @return {boolean} The map has the focus.
 * @api
 */
var focus = function (event) {
    return event.target.getTargetElement().contains(document.activeElement);
};
/**
 * Return `true` if the map has the focus or no 'tabindex' attribute set.
 *
 * @param {import("../MapBrowserEvent.js").default} event Map browser event.
 * @return {boolean} The map container has the focus or no 'tabindex' attribute.
 */
var focusWithTabindex = function (event) {
    return event.map.getTargetElement().hasAttribute('tabindex')
        ? focus(event)
        : true;
};
/**
 * Return always true.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True.
 * @api
 */
var always = TRUE;
/**
 * Return `true` if the event has an "action"-producing mouse button.
 *
 * By definition, this includes left-click on windows/linux, and left-click
 * without the ctrl key on Macs.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} The result.
 */
var mouseActionButton = function (mapBrowserEvent) {
    var originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
    return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
};
/**
 * Return `true` if no modifier key (alt-, shift- or platform-modifier-key) is
 * pressed.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True only if there no modifier keys are pressed.
 * @api
 */
var noModifierKeys = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (!originalEvent.altKey &&
        !(originalEvent.metaKey || originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
};
/**
 * Return `true` if only the shift-key is pressed, `false` otherwise (e.g. when
 * additionally the alt-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the shift key is pressed.
 * @api
 */
var shiftKeyOnly = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (!originalEvent.altKey &&
        !(originalEvent.metaKey || originalEvent.ctrlKey) &&
        originalEvent.shiftKey);
};
/**
 * Return `true` if the target element is not editable, i.e. not a `<input>`-,
 * `<select>`- or `<textarea>`-element, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True only if the target element is not editable.
 * @api
 */
var targetNotEditable = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    var tagName = /** @type {Element} */ (originalEvent.target).tagName;
    return tagName !== 'INPUT' && tagName !== 'SELECT' && tagName !== 'TEXTAREA';
};
/**
 * Return `true` if the event originates from a mouse device.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a mouse device.
 * @api
 */
var mouseOnly = function (mapBrowserEvent) {
    var pointerEvent = /** @type {import("../MapBrowserEvent").default} */ (mapBrowserEvent)
        .originalEvent;
    assert(pointerEvent !== undefined, 56); // mapBrowserEvent must originate from a pointer event
    // see http://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType
    return pointerEvent.pointerType == 'mouse';
};
/**
 * Return `true` if the event originates from a primary pointer in
 * contact with the surface or if the left mouse button is pressed.
 * See http://www.w3.org/TR/pointerevents/#button-states.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a primary pointer.
 * @api
 */
var primaryAction = function (mapBrowserEvent) {
    var pointerEvent = /** @type {import("../MapBrowserEvent").default} */ (mapBrowserEvent)
        .originalEvent;
    assert(pointerEvent !== undefined, 56); // mapBrowserEvent must originate from a pointer event
    return pointerEvent.isPrimary && pointerEvent.button === 0;
};

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~noModifierKeys} and {@link module:ol/events/condition~primaryAction}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {import("../Kinetic.js").default} [kinetic] Kinetic inertia to apply to the pan.
 */
/**
 * @classdesc
 * Allows the user to pan the map by dragging the map.
 * @api
 */
var DragPan = /** @class */ (function (_super) {
    __extends$a(DragPan, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragPan(opt_options) {
        var _this = _super.call(this, {
            stopDown: FALSE,
        }) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @private
         * @type {import("../Kinetic.js").default|undefined}
         */
        _this.kinetic_ = options.kinetic;
        /**
         * @type {import("../pixel.js").Pixel}
         */
        _this.lastCentroid = null;
        /**
         * @type {number}
         */
        _this.lastPointersCount_;
        /**
         * @type {boolean}
         */
        _this.panning_ = false;
        var condition = options.condition
            ? options.condition
            : all(noModifierKeys, primaryAction);
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.onFocusOnly
            ? all(focusWithTabindex, condition)
            : condition;
        /**
         * @private
         * @type {boolean}
         */
        _this.noKinetic_ = false;
        return _this;
    }
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    DragPan.prototype.handleDragEvent = function (mapBrowserEvent) {
        if (!this.panning_) {
            this.panning_ = true;
            this.getMap().getView().beginInteraction();
        }
        var targetPointers = this.targetPointers;
        var centroid$1 = centroid(targetPointers);
        if (targetPointers.length == this.lastPointersCount_) {
            if (this.kinetic_) {
                this.kinetic_.update(centroid$1[0], centroid$1[1]);
            }
            if (this.lastCentroid) {
                var delta = [
                    this.lastCentroid[0] - centroid$1[0],
                    centroid$1[1] - this.lastCentroid[1],
                ];
                var map = mapBrowserEvent.map;
                var view = map.getView();
                scale$1(delta, view.getResolution());
                rotate$1(delta, view.getRotation());
                view.adjustCenterInternal(delta);
            }
        }
        else if (this.kinetic_) {
            // reset so we don't overestimate the kinetic energy after
            // after one finger down, tiny drag, second finger down
            this.kinetic_.begin();
        }
        this.lastCentroid = centroid$1;
        this.lastPointersCount_ = targetPointers.length;
        mapBrowserEvent.originalEvent.preventDefault();
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragPan.prototype.handleUpEvent = function (mapBrowserEvent) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        if (this.targetPointers.length === 0) {
            if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
                var distance = this.kinetic_.getDistance();
                var angle = this.kinetic_.getAngle();
                var center = view.getCenterInternal();
                var centerpx = map.getPixelFromCoordinateInternal(center);
                var dest = map.getCoordinateFromPixelInternal([
                    centerpx[0] - distance * Math.cos(angle),
                    centerpx[1] - distance * Math.sin(angle),
                ]);
                view.animateInternal({
                    center: view.getConstrainedCenter(dest),
                    duration: 500,
                    easing: easeOut,
                });
            }
            if (this.panning_) {
                this.panning_ = false;
                view.endInteraction();
            }
            return false;
        }
        else {
            if (this.kinetic_) {
                // reset so we don't overestimate the kinetic energy after
                // after one finger up, tiny drag, second finger up
                this.kinetic_.begin();
            }
            this.lastCentroid = null;
            return true;
        }
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragPan.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length > 0 && this.condition_(mapBrowserEvent)) {
            var map = mapBrowserEvent.map;
            var view = map.getView();
            this.lastCentroid = null;
            // stop any current animation
            if (view.getAnimating()) {
                view.cancelAnimations();
            }
            if (this.kinetic_) {
                this.kinetic_.begin();
            }
            // No kinetic as soon as more than one pointer on the screen is
            // detected. This is to prevent nasty pans after pinch.
            this.noKinetic_ = this.targetPointers.length > 1;
            return true;
        }
        else {
            return false;
        }
    };
    return DragPan;
}(PointerInteraction));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an
 * {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~altShiftKeysOnly}.
 * @property {number} [duration=250] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to rotate the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the alt and shift keys are held down.
 *
 * This interaction is only supported for mouse devices.
 * @api
 */
var DragRotate = /** @class */ (function (_super) {
    __extends$9(DragRotate, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragRotate(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            stopDown: FALSE,
        }) || this;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : altShiftKeysOnly;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastAngle_ = undefined;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        return _this;
    }
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    DragRotate.prototype.handleDragEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return;
        }
        var map = mapBrowserEvent.map;
        var view = map.getView();
        if (view.getConstraints().rotation === disable) {
            return;
        }
        var size = map.getSize();
        var offset = mapBrowserEvent.pixel;
        var theta = Math.atan2(size[1] / 2 - offset[1], offset[0] - size[0] / 2);
        if (this.lastAngle_ !== undefined) {
            var delta = theta - this.lastAngle_;
            view.adjustRotationInternal(-delta);
        }
        this.lastAngle_ = theta;
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragRotate.prototype.handleUpEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return true;
        }
        var map = mapBrowserEvent.map;
        var view = map.getView();
        view.endInteraction(this.duration_);
        return false;
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragRotate.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return false;
        }
        if (mouseActionButton(mapBrowserEvent) &&
            this.condition_(mapBrowserEvent)) {
            var map = mapBrowserEvent.map;
            map.getView().beginInteraction();
            this.lastAngle_ = undefined;
            return true;
        }
        else {
            return false;
        }
    };
    return DragRotate;
}(PointerInteraction));

/**
 * @module ol/render/Box
 */
var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RenderBox = /** @class */ (function (_super) {
    __extends$8(RenderBox, _super);
    /**
     * @param {string} className CSS class name.
     */
    function RenderBox(className) {
        var _this = _super.call(this) || this;
        /**
         * @type {import("../geom/Polygon.js").default}
         * @private
         */
        _this.geometry_ = null;
        /**
         * @type {HTMLDivElement}
         * @private
         */
        _this.element_ = document.createElement('div');
        _this.element_.style.position = 'absolute';
        _this.element_.style.pointerEvents = 'auto';
        _this.element_.className = 'ol-box ' + className;
        /**
         * @private
         * @type {import("../PluggableMap.js").default}
         */
        _this.map_ = null;
        /**
         * @private
         * @type {import("../pixel.js").Pixel}
         */
        _this.startPixel_ = null;
        /**
         * @private
         * @type {import("../pixel.js").Pixel}
         */
        _this.endPixel_ = null;
        return _this;
    }
    /**
     * Clean up.
     */
    RenderBox.prototype.disposeInternal = function () {
        this.setMap(null);
    };
    /**
     * @private
     */
    RenderBox.prototype.render_ = function () {
        var startPixel = this.startPixel_;
        var endPixel = this.endPixel_;
        var px = 'px';
        var style = this.element_.style;
        style.left = Math.min(startPixel[0], endPixel[0]) + px;
        style.top = Math.min(startPixel[1], endPixel[1]) + px;
        style.width = Math.abs(endPixel[0] - startPixel[0]) + px;
        style.height = Math.abs(endPixel[1] - startPixel[1]) + px;
    };
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     */
    RenderBox.prototype.setMap = function (map) {
        if (this.map_) {
            this.map_.getOverlayContainer().removeChild(this.element_);
            var style = this.element_.style;
            style.left = 'inherit';
            style.top = 'inherit';
            style.width = 'inherit';
            style.height = 'inherit';
        }
        this.map_ = map;
        if (this.map_) {
            this.map_.getOverlayContainer().appendChild(this.element_);
        }
    };
    /**
     * @param {import("../pixel.js").Pixel} startPixel Start pixel.
     * @param {import("../pixel.js").Pixel} endPixel End pixel.
     */
    RenderBox.prototype.setPixels = function (startPixel, endPixel) {
        this.startPixel_ = startPixel;
        this.endPixel_ = endPixel;
        this.createOrUpdateGeometry();
        this.render_();
    };
    /**
     * Creates or updates the cached geometry.
     */
    RenderBox.prototype.createOrUpdateGeometry = function () {
        var startPixel = this.startPixel_;
        var endPixel = this.endPixel_;
        var pixels = [
            startPixel,
            [startPixel[0], endPixel[1]],
            endPixel,
            [endPixel[0], startPixel[1]],
        ];
        var coordinates = pixels.map(this.map_.getCoordinateFromPixelInternal, this.map_);
        // close the polygon
        coordinates[4] = coordinates[0].slice();
        if (!this.geometry_) {
            this.geometry_ = new Polygon([coordinates]);
        }
        else {
            this.geometry_.setCoordinates([coordinates]);
        }
    };
    /**
     * @return {import("../geom/Polygon.js").default} Geometry.
     */
    RenderBox.prototype.getGeometry = function () {
        return this.geometry_;
    };
    return RenderBox;
}(Disposable));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A function that takes a {@link module:ol/MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s and returns a `{boolean}`. If the condition is met,
 * true should be returned.
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default, import("../pixel.js").Pixel, import("../pixel.js").Pixel):boolean} EndCondition
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragbox'] CSS class name for styling the box.
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link ol/events/condition~mouseActionButton}.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the default
 * `boxEndCondition` function.
 * @property {EndCondition} [boxEndCondition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s to indicate whether a `boxend` event should be fired.
 * Default is `true` if the area of the box is bigger than the `minArea` option.
 * @property {function(this:DragBox, import("../MapBrowserEvent.js").default):void} [onBoxEnd] Code to execute just
 * before `boxend` is fired.
 */
/**
 * @enum {string}
 */
var DragBoxEventType = {
    /**
     * Triggered upon drag box start.
     * @event DragBoxEvent#boxstart
     * @api
     */
    BOXSTART: 'boxstart',
    /**
     * Triggered on drag when box is active.
     * @event DragBoxEvent#boxdrag
     * @api
     */
    BOXDRAG: 'boxdrag',
    /**
     * Triggered upon drag box end.
     * @event DragBoxEvent#boxend
     * @api
     */
    BOXEND: 'boxend',
    /**
     * Triggered upon drag box canceled.
     * @event DragBoxEvent#boxcancel
     * @api
     */
    BOXCANCEL: 'boxcancel',
};
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragBox~DragBox} instances are instances of
 * this type.
 */
var DragBoxEvent = /** @class */ (function (_super) {
    __extends$7(DragBoxEvent, _super);
    /**
     * @param {string} type The event type.
     * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
     */
    function DragBoxEvent(type, coordinate, mapBrowserEvent) {
        var _this = _super.call(this, type) || this;
        /**
         * The coordinate of the drag event.
         * @const
         * @type {import("../coordinate.js").Coordinate}
         * @api
         */
        _this.coordinate = coordinate;
        /**
         * @const
         * @type {import("../MapBrowserEvent.js").default}
         * @api
         */
        _this.mapBrowserEvent = mapBrowserEvent;
        return _this;
    }
    return DragBoxEvent;
}(BaseEvent));
/**
 * @classdesc
 * Allows the user to draw a vector box by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the shift or other key is held down. This is used, for example,
 * for zooming to a specific area of the map
 * (see {@link module:ol/interaction/DragZoom~DragZoom} and
 * {@link module:ol/interaction/DragRotateAndZoom}).
 *
 * @fires DragBoxEvent
 * @api
 */
var DragBox = /** @class */ (function (_super) {
    __extends$7(DragBox, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragBox(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @type {import("../render/Box.js").default}
         * @private
         */
        _this.box_ = new RenderBox(options.className || 'ol-dragbox');
        /**
         * @type {number}
         * @private
         */
        _this.minArea_ = options.minArea !== undefined ? options.minArea : 64;
        if (options.onBoxEnd) {
            _this.onBoxEnd = options.onBoxEnd;
        }
        /**
         * @type {import("../pixel.js").Pixel}
         * @private
         */
        _this.startPixel_ = null;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : mouseActionButton;
        /**
         * @private
         * @type {EndCondition}
         */
        _this.boxEndCondition_ = options.boxEndCondition
            ? options.boxEndCondition
            : _this.defaultBoxEndCondition;
        return _this;
    }
    /**
     * The default condition for determining whether the boxend event
     * should fire.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
     *     leading to the box end.
     * @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
     * @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
     * @return {boolean} Whether or not the boxend condition should be fired.
     */
    DragBox.prototype.defaultBoxEndCondition = function (mapBrowserEvent, startPixel, endPixel) {
        var width = endPixel[0] - startPixel[0];
        var height = endPixel[1] - startPixel[1];
        return width * width + height * height >= this.minArea_;
    };
    /**
     * Returns geometry of last drawn box.
     * @return {import("../geom/Polygon.js").default} Geometry.
     * @api
     */
    DragBox.prototype.getGeometry = function () {
        return this.box_.getGeometry();
    };
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    DragBox.prototype.handleDragEvent = function (mapBrowserEvent) {
        this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);
        this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG, mapBrowserEvent.coordinate, mapBrowserEvent));
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragBox.prototype.handleUpEvent = function (mapBrowserEvent) {
        this.box_.setMap(null);
        var completeBox = this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel);
        if (completeBox) {
            this.onBoxEnd(mapBrowserEvent);
        }
        this.dispatchEvent(new DragBoxEvent(completeBox ? DragBoxEventType.BOXEND : DragBoxEventType.BOXCANCEL, mapBrowserEvent.coordinate, mapBrowserEvent));
        return false;
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragBox.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (this.condition_(mapBrowserEvent)) {
            this.startPixel_ = mapBrowserEvent.pixel;
            this.box_.setMap(mapBrowserEvent.map);
            this.box_.setPixels(this.startPixel_, this.startPixel_);
            this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART, mapBrowserEvent.coordinate, mapBrowserEvent));
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to execute just before `onboxend` is fired
     * @param {import("../MapBrowserEvent.js").default} event Event.
     */
    DragBox.prototype.onBoxEnd = function (event) { };
    return DragBox;
}(PointerInteraction));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragzoom'] CSS class name for styling the
 * box.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~shiftKeyOnly}.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {boolean} [out=false] Use interaction for zooming out.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the parent default
 * `boxEndCondition` function.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when a key, shift by default, is held down.
 *
 * To change the style of the box, use CSS and the `.ol-dragzoom` selector, or
 * your custom one configured with `className`.
 * @api
 */
var DragZoom = /** @class */ (function (_super) {
    __extends$6(DragZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragZoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var condition = options.condition ? options.condition : shiftKeyOnly;
        _this = _super.call(this, {
            condition: condition,
            className: options.className || 'ol-dragzoom',
            minArea: options.minArea,
        }) || this;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 200;
        /**
         * @private
         * @type {boolean}
         */
        _this.out_ = options.out !== undefined ? options.out : false;
        return _this;
    }
    /**
     * Function to execute just before `onboxend` is fired
     * @param {import("../MapBrowserEvent.js").default} event Event.
     */
    DragZoom.prototype.onBoxEnd = function (event) {
        var map = this.getMap();
        var view = /** @type {!import("../View.js").default} */ (map.getView());
        var size = /** @type {!import("../size.js").Size} */ (map.getSize());
        var extent = this.getGeometry().getExtent();
        if (this.out_) {
            var mapExtent = view.calculateExtentInternal(size);
            var boxPixelExtent = createOrUpdateFromCoordinates([
                map.getPixelFromCoordinateInternal(getBottomLeft(extent)),
                map.getPixelFromCoordinateInternal(getTopRight(extent)),
            ]);
            var factor = view.getResolutionForExtentInternal(boxPixelExtent, size);
            scaleFromCenter(mapExtent, 1 / factor);
            extent = mapExtent;
        }
        var resolution = view.getConstrainedResolution(view.getResolutionForExtentInternal(extent, size));
        var center = view.getConstrainedCenter(getCenter(extent), resolution);
        view.animateInternal({
            resolution: resolution,
            center: center,
            duration: this.duration_,
            easing: easeOut,
        });
    };
    return DragZoom;
}(DragBox));

/**
 * @module ol/events/KeyCode
 */
/**
 * @enum {number}
 * @const
 */
var KeyCode = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
};

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition~noModifierKeys} and
 * {@link module:ol/events/condition~targetNotEditable}.
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {number} [pixelDelta=128] The amount of pixels to pan on each key
 * press.
 */
/**
 * @classdesc
 * Allows the user to pan the map using keyboard arrows.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}.
 * @api
 */
var KeyboardPan = /** @class */ (function (_super) {
    __extends$5(KeyboardPan, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function KeyboardPan(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options || {};
        /**
         * @private
         * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
         * @return {boolean} Combined condition result.
         */
        _this.defaultCondition_ = function (mapBrowserEvent) {
            return (noModifierKeys(mapBrowserEvent) && targetNotEditable(mapBrowserEvent));
        };
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ =
            options.condition !== undefined
                ? options.condition
                : _this.defaultCondition_;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 100;
        /**
         * @private
         * @type {number}
         */
        _this.pixelDelta_ =
            options.pixelDelta !== undefined ? options.pixelDelta : 128;
        return _this;
    }
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} if it was a
     * `KeyEvent`, and decides the direction to pan to (if an arrow key was
     * pressed).
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @this {KeyboardPan}
     */
    KeyboardPan.prototype.handleEvent = function (mapBrowserEvent) {
        var stopEvent = false;
        if (mapBrowserEvent.type == EventType.KEYDOWN) {
            var keyEvent = /** @type {KeyboardEvent} */ (mapBrowserEvent.originalEvent);
            var keyCode = keyEvent.keyCode;
            if (this.condition_(mapBrowserEvent) &&
                (keyCode == KeyCode.DOWN ||
                    keyCode == KeyCode.LEFT ||
                    keyCode == KeyCode.RIGHT ||
                    keyCode == KeyCode.UP)) {
                var map = mapBrowserEvent.map;
                var view = map.getView();
                var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
                var deltaX = 0, deltaY = 0;
                if (keyCode == KeyCode.DOWN) {
                    deltaY = -mapUnitsDelta;
                }
                else if (keyCode == KeyCode.LEFT) {
                    deltaX = -mapUnitsDelta;
                }
                else if (keyCode == KeyCode.RIGHT) {
                    deltaX = mapUnitsDelta;
                }
                else {
                    deltaY = mapUnitsDelta;
                }
                var delta = [deltaX, deltaY];
                rotate$1(delta, view.getRotation());
                pan(view, delta, this.duration_);
                keyEvent.preventDefault();
                stopEvent = true;
            }
        }
        return !stopEvent;
    };
    return KeyboardPan;
}(Interaction));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition~targetNotEditable}.
 * @property {number} [delta=1] The zoom level delta on each key press.
 */
/**
 * @classdesc
 * Allows the user to zoom the map using keyboard + and -.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardPan~KeyboardPan}.
 * @api
 */
var KeyboardZoom = /** @class */ (function (_super) {
    __extends$4(KeyboardZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function KeyboardZoom(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : targetNotEditable;
        /**
         * @private
         * @type {number}
         */
        _this.delta_ = options.delta ? options.delta : 1;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 100;
        return _this;
    }
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} if it was a
     * `KeyEvent`, and decides whether to zoom in or out (depending on whether the
     * key pressed was '+' or '-').
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @this {KeyboardZoom}
     */
    KeyboardZoom.prototype.handleEvent = function (mapBrowserEvent) {
        var stopEvent = false;
        if (mapBrowserEvent.type == EventType.KEYDOWN ||
            mapBrowserEvent.type == EventType.KEYPRESS) {
            var keyEvent = /** @type {KeyboardEvent} */ (mapBrowserEvent.originalEvent);
            var charCode = keyEvent.charCode;
            if (this.condition_(mapBrowserEvent) &&
                (charCode == '+'.charCodeAt(0) || charCode == '-'.charCodeAt(0))) {
                var map = mapBrowserEvent.map;
                var delta = charCode == '+'.charCodeAt(0) ? this.delta_ : -this.delta_;
                var view = map.getView();
                zoomByDelta(view, delta, undefined, this.duration_);
                keyEvent.preventDefault();
                stopEvent = true;
            }
        }
        return !stopEvent;
    };
    return KeyboardZoom;
}(Interaction));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @enum {string}
 */
var Mode = {
    TRACKPAD: 'trackpad',
    WHEEL: 'wheel',
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition~always}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {number} [maxDelta=1] Maximum mouse wheel delta.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [timeout=80] Mouse wheel timeout duration in milliseconds.
 * @property {boolean} [useAnchor=true] Enable zooming using the mouse's
 * location as the anchor. When set to `false`, zooming in and out will zoom to
 * the center of the screen instead of zooming on the mouse's location.
 * @property {boolean} [constrainResolution=false] If true, the mouse wheel zoom
 * event will always animate to the closest zoom level after an interaction;
 * false means intermediary zoom levels are allowed.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @api
 */
var MouseWheelZoom = /** @class */ (function (_super) {
    __extends$3(MouseWheelZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function MouseWheelZoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, 
        /** @type {import("./Interaction.js").InteractionOptions} */ (options)) || this;
        /**
         * @private
         * @type {number}
         */
        _this.totalDelta_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.lastDelta_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.maxDelta_ = options.maxDelta !== undefined ? options.maxDelta : 1;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        /**
         * @private
         * @type {number}
         */
        _this.timeout_ = options.timeout !== undefined ? options.timeout : 80;
        /**
         * @private
         * @type {boolean}
         */
        _this.useAnchor_ =
            options.useAnchor !== undefined ? options.useAnchor : true;
        /**
         * @private
         * @type {boolean}
         */
        _this.constrainResolution_ =
            options.constrainResolution !== undefined
                ? options.constrainResolution
                : false;
        var condition = options.condition ? options.condition : always;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.onFocusOnly
            ? all(focusWithTabindex, condition)
            : condition;
        /**
         * @private
         * @type {?import("../coordinate.js").Coordinate}
         */
        _this.lastAnchor_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.startTime_ = undefined;
        /**
         * @private
         * @type {?}
         */
        _this.timeoutId_;
        /**
         * @private
         * @type {Mode|undefined}
         */
        _this.mode_ = undefined;
        /**
         * Trackpad events separated by this delay will be considered separate
         * interactions.
         * @type {number}
         */
        _this.trackpadEventGap_ = 400;
        /**
         * @type {?}
         */
        _this.trackpadTimeoutId_;
        /**
         * The number of delta values per zoom level
         * @private
         * @type {number}
         */
        _this.deltaPerZoom_ = 300;
        return _this;
    }
    /**
     * @private
     */
    MouseWheelZoom.prototype.endInteraction_ = function () {
        this.trackpadTimeoutId_ = undefined;
        var view = this.getMap().getView();
        view.endInteraction(undefined, this.lastDelta_ ? (this.lastDelta_ > 0 ? 1 : -1) : 0, this.lastAnchor_);
    };
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
     * zooms the map.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     */
    MouseWheelZoom.prototype.handleEvent = function (mapBrowserEvent) {
        if (!this.condition_(mapBrowserEvent)) {
            return true;
        }
        var type = mapBrowserEvent.type;
        if (type !== EventType.WHEEL) {
            return true;
        }
        var map = mapBrowserEvent.map;
        var wheelEvent = /** @type {WheelEvent} */ (mapBrowserEvent.originalEvent);
        wheelEvent.preventDefault();
        if (this.useAnchor_) {
            this.lastAnchor_ = mapBrowserEvent.coordinate;
        }
        // Delta normalisation inspired by
        // https://github.com/mapbox/mapbox-gl-js/blob/001c7b9/js/ui/handler/scroll_zoom.js
        var delta;
        if (mapBrowserEvent.type == EventType.WHEEL) {
            delta = wheelEvent.deltaY;
            if (FIREFOX && wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
                delta /= DEVICE_PIXEL_RATIO;
            }
            if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_LINE) {
                delta *= 40;
            }
        }
        if (delta === 0) {
            return false;
        }
        else {
            this.lastDelta_ = delta;
        }
        var now = Date.now();
        if (this.startTime_ === undefined) {
            this.startTime_ = now;
        }
        if (!this.mode_ || now - this.startTime_ > this.trackpadEventGap_) {
            this.mode_ = Math.abs(delta) < 4 ? Mode.TRACKPAD : Mode.WHEEL;
        }
        var view = map.getView();
        if (this.mode_ === Mode.TRACKPAD &&
            !(view.getConstrainResolution() || this.constrainResolution_)) {
            if (this.trackpadTimeoutId_) {
                clearTimeout(this.trackpadTimeoutId_);
            }
            else {
                if (view.getAnimating()) {
                    view.cancelAnimations();
                }
                view.beginInteraction();
            }
            this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_);
            view.adjustZoom(-delta / this.deltaPerZoom_, this.lastAnchor_);
            this.startTime_ = now;
            return false;
        }
        this.totalDelta_ += delta;
        var timeLeft = Math.max(this.timeout_ - (now - this.startTime_), 0);
        clearTimeout(this.timeoutId_);
        this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, map), timeLeft);
        return false;
    };
    /**
     * @private
     * @param {import("../PluggableMap.js").default} map Map.
     */
    MouseWheelZoom.prototype.handleWheelZoom_ = function (map) {
        var view = map.getView();
        if (view.getAnimating()) {
            view.cancelAnimations();
        }
        var delta = -clamp(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;
        if (view.getConstrainResolution() || this.constrainResolution_) {
            // view has a zoom constraint, zoom by 1
            delta = delta ? (delta > 0 ? 1 : -1) : 0;
        }
        zoomByDelta(view, delta, this.lastAnchor_, this.duration_);
        this.mode_ = undefined;
        this.totalDelta_ = 0;
        this.lastAnchor_ = null;
        this.startTime_ = undefined;
        this.timeoutId_ = undefined;
    };
    /**
     * Enable or disable using the mouse's location as an anchor when zooming
     * @param {boolean} useAnchor true to zoom to the mouse's location, false
     * to zoom to the center of the map
     * @api
     */
    MouseWheelZoom.prototype.setMouseAnchor = function (useAnchor) {
        this.useAnchor_ = useAnchor;
        if (!useAnchor) {
            this.lastAnchor_ = null;
        }
    };
    return MouseWheelZoom;
}(Interaction));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] The duration of the animation in
 * milliseconds.
 * @property {number} [threshold=0.3] Minimal angle in radians to start a rotation.
 */
/**
 * @classdesc
 * Allows the user to rotate the map by twisting with two fingers
 * on a touch screen.
 * @api
 */
var PinchRotate = /** @class */ (function (_super) {
    __extends$2(PinchRotate, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function PinchRotate(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var pointerOptions = /** @type {import("./Pointer.js").Options} */ (options);
        if (!pointerOptions.stopDown) {
            pointerOptions.stopDown = FALSE;
        }
        _this = _super.call(this, pointerOptions) || this;
        /**
         * @private
         * @type {import("../coordinate.js").Coordinate}
         */
        _this.anchor_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastAngle_ = undefined;
        /**
         * @private
         * @type {boolean}
         */
        _this.rotating_ = false;
        /**
         * @private
         * @type {number}
         */
        _this.rotationDelta_ = 0.0;
        /**
         * @private
         * @type {number}
         */
        _this.threshold_ = options.threshold !== undefined ? options.threshold : 0.3;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        return _this;
    }
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    PinchRotate.prototype.handleDragEvent = function (mapBrowserEvent) {
        var rotationDelta = 0.0;
        var touch0 = this.targetPointers[0];
        var touch1 = this.targetPointers[1];
        // angle between touches
        var angle = Math.atan2(touch1.clientY - touch0.clientY, touch1.clientX - touch0.clientX);
        if (this.lastAngle_ !== undefined) {
            var delta = angle - this.lastAngle_;
            this.rotationDelta_ += delta;
            if (!this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_) {
                this.rotating_ = true;
            }
            rotationDelta = delta;
        }
        this.lastAngle_ = angle;
        var map = mapBrowserEvent.map;
        var view = map.getView();
        if (view.getConstraints().rotation === disable) {
            return;
        }
        // rotate anchor point.
        // FIXME: should be the intersection point between the lines:
        //     touch0,touch1 and previousTouch0,previousTouch1
        var viewportPosition = map.getViewport().getBoundingClientRect();
        var centroid$1 = centroid(this.targetPointers);
        centroid$1[0] -= viewportPosition.left;
        centroid$1[1] -= viewportPosition.top;
        this.anchor_ = map.getCoordinateFromPixelInternal(centroid$1);
        // rotate
        if (this.rotating_) {
            map.render();
            view.adjustRotationInternal(rotationDelta, this.anchor_);
        }
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    PinchRotate.prototype.handleUpEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length < 2) {
            var map = mapBrowserEvent.map;
            var view = map.getView();
            view.endInteraction(this.duration_);
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    PinchRotate.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length >= 2) {
            var map = mapBrowserEvent.map;
            this.anchor_ = null;
            this.lastAngle_ = undefined;
            this.rotating_ = false;
            this.rotationDelta_ = 0.0;
            if (!this.handlingDownUpSequence) {
                map.getView().beginInteraction();
            }
            return true;
        }
        else {
            return false;
        }
    };
    return PinchRotate;
}(PointerInteraction));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by pinching with two fingers
 * on a touch screen.
 * @api
 */
var PinchZoom = /** @class */ (function (_super) {
    __extends$1(PinchZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function PinchZoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var pointerOptions = /** @type {import("./Pointer.js").Options} */ (options);
        if (!pointerOptions.stopDown) {
            pointerOptions.stopDown = FALSE;
        }
        _this = _super.call(this, pointerOptions) || this;
        /**
         * @private
         * @type {import("../coordinate.js").Coordinate}
         */
        _this.anchor_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 400;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastDistance_ = undefined;
        /**
         * @private
         * @type {number}
         */
        _this.lastScaleDelta_ = 1;
        return _this;
    }
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    PinchZoom.prototype.handleDragEvent = function (mapBrowserEvent) {
        var scaleDelta = 1.0;
        var touch0 = this.targetPointers[0];
        var touch1 = this.targetPointers[1];
        var dx = touch0.clientX - touch1.clientX;
        var dy = touch0.clientY - touch1.clientY;
        // distance between touches
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (this.lastDistance_ !== undefined) {
            scaleDelta = this.lastDistance_ / distance;
        }
        this.lastDistance_ = distance;
        var map = mapBrowserEvent.map;
        var view = map.getView();
        if (scaleDelta != 1.0) {
            this.lastScaleDelta_ = scaleDelta;
        }
        // scale anchor point.
        var viewportPosition = map.getViewport().getBoundingClientRect();
        var centroid$1 = centroid(this.targetPointers);
        centroid$1[0] -= viewportPosition.left;
        centroid$1[1] -= viewportPosition.top;
        this.anchor_ = map.getCoordinateFromPixelInternal(centroid$1);
        // scale, bypass the resolution constraint
        map.render();
        view.adjustResolutionInternal(scaleDelta, this.anchor_);
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    PinchZoom.prototype.handleUpEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length < 2) {
            var map = mapBrowserEvent.map;
            var view = map.getView();
            var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
            view.endInteraction(this.duration_, direction);
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    PinchZoom.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length >= 2) {
            var map = mapBrowserEvent.map;
            this.anchor_ = null;
            this.lastDistance_ = undefined;
            this.lastScaleDelta_ = 1;
            if (!this.handlingDownUpSequence) {
                map.getView().beginInteraction();
            }
            return true;
        }
        else {
            return false;
        }
    };
    return PinchZoom;
}(PointerInteraction));

/**
 * @module ol/interaction
 */
/**
 * @typedef {Object} DefaultsOptions
 * @property {boolean} [altShiftDragRotate=true] Whether Alt-Shift-drag rotate is
 * desired.
 * @property {boolean} [onFocusOnly=false] Interact only when the map has the
 * focus. This affects the `MouseWheelZoom` and `DragPan` interactions and is
 * useful when page scroll is desired for maps that do not have the browser's
 * focus.
 * @property {boolean} [doubleClickZoom=true] Whether double click zoom is
 * desired.
 * @property {boolean} [keyboard=true] Whether keyboard interaction is desired.
 * @property {boolean} [mouseWheelZoom=true] Whether mousewheel zoom is desired.
 * @property {boolean} [shiftDragZoom=true] Whether Shift-drag zoom is desired.
 * @property {boolean} [dragPan=true] Whether drag pan is desired.
 * @property {boolean} [pinchRotate=true] Whether pinch rotate is desired.
 * @property {boolean} [pinchZoom=true] Whether pinch zoom is desired.
 * @property {number} [zoomDelta] Zoom level delta when using keyboard or double click zoom.
 * @property {number} [zoomDuration] Duration of the zoom animation in
 * milliseconds.
 */
/**
 * Set of interactions included in maps by default. Specific interactions can be
 * excluded by setting the appropriate option to false in the constructor
 * options, but the order of the interactions is fixed.  If you want to specify
 * a different order for interactions, you will need to create your own
 * {@link module:ol/interaction/Interaction} instances and insert
 * them into a {@link module:ol/Collection} in the order you want
 * before creating your {@link module:ol/Map~Map} instance. Changing the order can
 * be of interest if the event propagation needs to be stopped at a point.
 * The default set of interactions, in sequence, is:
 * * {@link module:ol/interaction/DragRotate~DragRotate}
 * * {@link module:ol/interaction/DoubleClickZoom~DoubleClickZoom}
 * * {@link module:ol/interaction/DragPan~DragPan}
 * * {@link module:ol/interaction/PinchRotate~PinchRotate}
 * * {@link module:ol/interaction/PinchZoom~PinchZoom}
 * * {@link module:ol/interaction/KeyboardPan~KeyboardPan}
 * * {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}
 * * {@link module:ol/interaction/MouseWheelZoom~MouseWheelZoom}
 * * {@link module:ol/interaction/DragZoom~DragZoom}
 *
 * @param {DefaultsOptions=} opt_options Defaults options.
 * @return {import("./Collection.js").default<import("./interaction/Interaction.js").default>}
 * A collection of interactions to be used with the {@link module:ol/Map~Map}
 * constructor's `interactions` option.
 * @api
 */
function defaults(opt_options) {
    var options = opt_options ? opt_options : {};
    var interactions = new Collection();
    var kinetic = new Kinetic(-0.005, 0.05, 100);
    var altShiftDragRotate = options.altShiftDragRotate !== undefined
        ? options.altShiftDragRotate
        : true;
    if (altShiftDragRotate) {
        interactions.push(new DragRotate());
    }
    var doubleClickZoom = options.doubleClickZoom !== undefined ? options.doubleClickZoom : true;
    if (doubleClickZoom) {
        interactions.push(new DoubleClickZoom({
            delta: options.zoomDelta,
            duration: options.zoomDuration,
        }));
    }
    var dragPan = options.dragPan !== undefined ? options.dragPan : true;
    if (dragPan) {
        interactions.push(new DragPan({
            onFocusOnly: options.onFocusOnly,
            kinetic: kinetic,
        }));
    }
    var pinchRotate = options.pinchRotate !== undefined ? options.pinchRotate : true;
    if (pinchRotate) {
        interactions.push(new PinchRotate());
    }
    var pinchZoom = options.pinchZoom !== undefined ? options.pinchZoom : true;
    if (pinchZoom) {
        interactions.push(new PinchZoom({
            duration: options.zoomDuration,
        }));
    }
    var keyboard = options.keyboard !== undefined ? options.keyboard : true;
    if (keyboard) {
        interactions.push(new KeyboardPan());
        interactions.push(new KeyboardZoom({
            delta: options.zoomDelta,
            duration: options.zoomDuration,
        }));
    }
    var mouseWheelZoom = options.mouseWheelZoom !== undefined ? options.mouseWheelZoom : true;
    if (mouseWheelZoom) {
        interactions.push(new MouseWheelZoom({
            onFocusOnly: options.onFocusOnly,
            duration: options.zoomDuration,
        }));
    }
    var shiftDragZoom = options.shiftDragZoom !== undefined ? options.shiftDragZoom : true;
    if (shiftDragZoom) {
        interactions.push(new DragZoom({
            duration: options.zoomDuration,
        }));
    }
    return interactions;
}

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @classdesc
 * The map is the core component of OpenLayers. For a map to render, a view,
 * one or more layers, and a target container are needed:
 *
 *     import Map from 'ol/Map';
 *     import View from 'ol/View';
 *     import TileLayer from 'ol/layer/Tile';
 *     import OSM from 'ol/source/OSM';
 *
 *     var map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1
 *       }),
 *       layers: [
 *         new TileLayer({
 *           source: new OSM()
 *         })
 *       ],
 *       target: 'map'
 *     });
 *
 * The above snippet creates a map using a {@link module:ol/layer/Tile} to
 * display {@link module:ol/source/OSM~OSM} OSM data and render it to a DOM
 * element with the id `map`.
 *
 * The constructor places a viewport container (with CSS class name
 * `ol-viewport`) in the target element (see `getViewport()`), and then two
 * further elements within the viewport: one with CSS class name
 * `ol-overlaycontainer-stopevent` for controls and some overlays, and one with
 * CSS class name `ol-overlaycontainer` for other overlays (see the `stopEvent`
 * option of {@link module:ol/Overlay~Overlay} for the difference). The map
 * itself is placed in a further element within the viewport.
 *
 * Layers are stored as a {@link module:ol/Collection~Collection} in
 * layerGroups. A top-level group is provided by the library. This is what is
 * accessed by `getLayerGroup` and `setLayerGroup`. Layers entered in the
 * options are added to this group, and `addLayer` and `removeLayer` change the
 * layer collection in the group. `getLayers` is a convenience function for
 * `getLayerGroup().getLayers()`. Note that {@link module:ol/layer/Group~Group}
 * is a subclass of {@link module:ol/layer/Base}, so layers entered in the
 * options or added with `addLayer` can be groups, which can contain further
 * groups, and so on.
 *
 * @api
 */
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    /**
     * @param {import("./PluggableMap.js").MapOptions} options Map options.
     */
    function Map(options) {
        var _this = this;
        options = assign({}, options);
        if (!options.controls) {
            options.controls = defaults$1();
        }
        if (!options.interactions) {
            options.interactions = defaults({
                onFocusOnly: true,
            });
        }
        _this = _super.call(this, options) || this;
        return _this;
    }
    Map.prototype.createRenderer = function () {
        return new CompositeMapRenderer(this);
    };
    return Map;
}(PluggableMap));

class XzTest extends Map{
  
}

export default XzTest;
