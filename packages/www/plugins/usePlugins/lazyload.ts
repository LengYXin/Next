import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loading from '~/assets/svg/loading2.svg';

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: 'http://iph.href.lu/192x108?text=图片',
    loading: loading,
    // attempt: 1
})
