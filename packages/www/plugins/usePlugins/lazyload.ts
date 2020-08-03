import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loading from '~/assets/svg/loading.svg';

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: '/img.jpg',
    loading: loading,
    // attempt: 1
})
