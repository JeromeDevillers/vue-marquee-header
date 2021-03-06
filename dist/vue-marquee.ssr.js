'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var count = 0;
var script = {
  name: "marquee",
  props: {
    speed: {
      type: Number,
      default: 40
    },
    textColor: {
      type: String,
      default: "#020826",
      required: false
    },
    bgColor: {
      type: String,
      default: "#F9F4EF",
      required: false
    },
    content: {
      type: String,
      default: "Do occaecat est ex <a href='http://www.google.com'>cillum laborum</a> tempor sint. Reprehenderit minim laboris et cupidatat exercitation est."
    },
    animate: {
      type: String,
      default: 'infinite',
      required: false
    }
  },
  data: function data() {
    count++;
    return {
      time: 0,
      animationState: "running",
      animationIterationCount: this.$props.animate,
      name: "marquee" + count,
      styleEl: document.createElement("style")
    };
  },
  watch: {
    content: function content() {
      this.start();
    },
    speed: function speed() {
      this.start();
    }
  },
  methods: {
    pauseAnimation: function pauseAnimation() {
      this.animationState = "paused";
    },
    playAnimation: function playAnimation() {
      this.animationState = "running";
    },
    hideMarquee: function hideMarquee() {
      this.isVisible = false;
    },
    getTime: function getTime() {
      return Math.max(this.$el.firstChild.offsetWidth, this.$el.offsetWidth) / this.speed + "s";
    },
    prefix: function prefix(key, value) {
      return ["-webkit-", "-moz-", "-ms-", ""].map(function (el) {
        return "".concat(el + key, ":").concat(value, ";");
      }).join("");
    },
    keyframes: function keyframes() {
      var from = this.prefix("transform", "translateX(".concat(this.$el.offsetWidth, "px)"));
      var to = this.prefix("transform", "translateX(-".concat(this.$el.firstChild.offsetWidth, "px)"));
      var v = "@keyframes ".concat(this.name, " {\n                from { ").concat(from, " }\n                to { ").concat(to, " }\n            }");
      this.styleEl.innerHTML = v;
      document.head.appendChild(this.styleEl);
    },
    start: function start() {
      var _this = this;

      this.$nextTick(function () {
        _this.time = _this.getTime();

        _this.keyframes();
      });
    }
  },
  mounted: function mounted() {
    this.start();
  },
  computed: {
    marqueeState: function marqueeState() {
      if (this.$props.animate == 0) {
        return 'marquee-center';
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "container-marquee",
    class: _vm.marqueeState,
    style: {
      backgroundColor: this.$props.bgColor
    }
  }, [_vm._ssrNode("<div class=\"marquee\" data-v-e43d311e>", "</div>", [_vm._ssrNode("<div" + _vm._ssrStyle(null, {
    'animation-play-state': _vm.animationState,
    'animation-duration': _vm.time,
    'animation-name': _vm.name,
    'animation-iteration-count': _vm.animationIterationCount
  }, null) + " data-v-e43d311e>", "</div>", [_vm._t("default", [_c('div', {
    style: {
      color: this.$props.textColor
    },
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })])], 2)])]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e43d311e_0", {
    source: ".container-marquee[data-v-e43d311e]{margin-bottom:30px}.container-marquee .marquee[data-v-e43d311e]{white-space:nowrap;overflow:hidden;font-size:18px;position:relative}.container-marquee .marquee>div[data-v-e43d311e]{display:inline-block;animation:marquee linear infinite}.container-marquee .marquee .pause[data-v-e43d311e]{animation-play-state:paused}.container-marquee .marquee .running[data-v-e43d311e]{animation-play-state:running}.container-marquee[data-v-e43d311e]{overflow:hidden;display:block;padding:20px 0}.marquee-center[data-v-e43d311e]{text-align:center}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-e43d311e";
/* module identifier */

var __vue_module_identifier__ = "data-v-e43d311e";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueMarquee', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;