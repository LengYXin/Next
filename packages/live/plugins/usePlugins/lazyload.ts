/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:12:35
 * @modify date 2020-08-05 14:12:35
 * @desc [description]
 */
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
// import loading from '~/assets/svg/loading.gif';

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: '/images/logo.png',
    loading: '/images/loading.gif',
    // attempt: 1
})
