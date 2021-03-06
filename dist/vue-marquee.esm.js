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
//
let count = 0;
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

  data() {
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
    content() {
      this.start();
    },

    speed() {
      this.start();
    }

  },
  methods: {
    pauseAnimation() {
      this.animationState = "paused";
    },

    playAnimation() {
      this.animationState = "running";
    },

    hideMarquee() {
      this.isVisible = false;
    },

    getTime() {
      return Math.max(this.$el.firstChild.offsetWidth, this.$el.offsetWidth) / this.speed + "s";
    },

    prefix(key, value) {
      return ["-webkit-", "-moz-", "-ms-", ""].map(el => `${el + key}:${value};`).join("");
    },

    keyframes() {
      const from = this.prefix("transform", `translateX(${this.$el.offsetWidth}px)`);
      const to = this.prefix("transform", `translateX(-${this.$el.firstChild.offsetWidth}px)`);
      const v = `@keyframes ${this.name} {
                from { ${from} }
                to { ${to} }
            }`;
      this.styleEl.innerHTML = v;
      document.head.appendChild(this.styleEl);
    },

    start() {
      this.$nextTick(() => {
        this.time = this.getTime();
        this.keyframes();
      });
    }

  },

  mounted() {
    this.start();
  },

  computed: {
    marqueeState: function () {
      if (this.$props.animate == 0) {
        return 'marquee-center';
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "container-marquee",
    class: _vm.marqueeState,
    style: {
      backgroundColor: this.$props.bgColor
    }
  }, [_c('div', {
    staticClass: "marquee",
    on: {
      "mouseleave": function ($event) {
        return _vm.playAnimation();
      },
      "mouseover": function ($event) {
        return _vm.pauseAnimation();
      }
    }
  }, [_c('div', {
    style: {
      'animation-play-state': _vm.animationState,
      'animation-duration': _vm.time,
      'animation-name': _vm.name,
      'animation-iteration-count': _vm.animationIterationCount
    }
  }, [_vm._t("default", [_c('div', {
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

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-e43d311e_0", {
    source: ".container-marquee[data-v-e43d311e]{margin-bottom:30px}.container-marquee .marquee[data-v-e43d311e]{white-space:nowrap;overflow:hidden;font-size:18px;position:relative}.container-marquee .marquee>div[data-v-e43d311e]{display:inline-block;animation:marquee linear infinite}.container-marquee .marquee .pause[data-v-e43d311e]{animation-play-state:paused}.container-marquee .marquee .running[data-v-e43d311e]{animation-play-state:running}.container-marquee[data-v-e43d311e]{overflow:hidden;display:block;padding:20px 0}.marquee-center[data-v-e43d311e]{text-align:center}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-e43d311e";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueMarquee', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
