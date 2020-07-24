import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: 'http://iph.href.lu/1920x844',
    loading: 'http://iph.href.lu/500x500',
    // attempt: 1
})
