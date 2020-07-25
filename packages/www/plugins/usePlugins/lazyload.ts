import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: 'http://iph.href.lu/192x108?text=图片',
    loading: 'http://iph.href.lu/192x108?text=加载中',
    // attempt: 1
})
