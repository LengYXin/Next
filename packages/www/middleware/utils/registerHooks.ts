import { Component } from "vue-property-decorator";
// https://class-component.vuejs.org/api/#component-registerhooks-hooks
Component.registerHooks([
    'beforeRouteUpdate',
    'beforeRouteEnter',
    'beforeRouteLeave',
    'asyncData',
    'fetch',
    'head',
    'middleware',
    'layout',
    'transition',
    'scrollToTop',
    'validate'
])