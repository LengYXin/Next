/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:05
 * @modify date 2020-08-05 14:16:05
 * @desc viewerjs https://mirari.cc/2017/08/27/Vue%E5%9B%BE%E7%89%87%E6%B5%8F%E8%A7%88%E7%BB%84%E4%BB%B6v-viewer%EF%BC%8C%E6%94%AF%E6%8C%81%E6%97%8B%E8%BD%AC%E3%80%81%E7%BC%A9%E6%94%BE%E3%80%81%E7%BF%BB%E8%BD%AC%E7%AD%89%E6%93%8D%E4%BD%9C/
 */
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import { debounce } from 'lodash'
import Vue from 'vue';
const install = (Vue, { name = 'viewer', debug = false }) => {
    function createViewer(el, options, rebuild = false) {
        // nextTick执行，否则可能漏掉未渲染完的子元素
        Vue.nextTick(() => {
            if (rebuild || !el[`$${name}`]) {
                destroyViewer(el)
                el[`$${name}`] = new Viewer(el, options)
                // log('viewer created')
            } else {
                el[`$${name}`].update()
                // log('viewer updated')
            }
        })
    }

    function createObserver(el, options, debouncedCreateViewer, rebuild) {
        destroyObserver(el)
        const MutationObserver = global.MutationObserver || global['WebKitMutationObserver'] || global['MozMutationObserver']
        if (!MutationObserver) {
            //   log('observer not supported')
            return
        }
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // log('viewer mutation:' + mutation.type)
                debouncedCreateViewer(el, options, rebuild)
            })
        })
        const config = { attributes: true, childList: true, characterData: true, subtree: true }
        observer.observe(el, config)
        el['$viewerMutationObserver'] = observer
        // log('observer created')
    }

    function createWatcher(el, { expression }, vnode, debouncedCreateViewer) {
        const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/
        if (!expression || !simplePathRE.test(expression)) {
            //   log('only simple dot-delimited paths can create watcher')
            return
        }
        el['$viewerUnwatch'] = vnode.context.$watch(expression, function (newVal, oldVal) {
            //   log('change detected by watcher: ', expression)
            debouncedCreateViewer(el, newVal, true)
        }, {
            deep: true
        })
        // log('watcher created, expression: ', expression)
    }

    function destroyViewer(el) {
        if (!el[`$${name}`]) {
            return
        }
        el[`$${name}`].destroy()
        delete el[`$${name}`]
        // log('viewer destroyed')
    }

    function destroyObserver(el) {
        if (!el['$viewerMutationObserver']) {
            return
        }
        el['$viewerMutationObserver'].disconnect()
        delete el['$viewerMutationObserver']
        // log('observer destroyed')
    }

    function destroyWatcher(el) {
        if (!el['$viewerUnwatch']) {
            return
        }
        el['$viewerUnwatch']()
        delete el['$viewerUnwatch']
        log('watcher destroyed')
    }

    function log(...arg) {
        debug && console.log(...arg)
    }

    Vue.directive('viewer', {
        bind(el, binding, vnode) {
            //   log('viewer bind')
            const debouncedCreateViewer = debounce(createViewer, 50)
            debouncedCreateViewer(el, binding.value)

            // 创建watch监听options表达式变化
            createWatcher(el, binding, vnode, debouncedCreateViewer)

            // 是否监听dom变化
            if (!binding.modifiers.static) {
                // 增加dom变化监听
                createObserver(el, binding.value, debouncedCreateViewer, binding.modifiers.rebuild)
            }
        },
        unbind(el, binding) {
            //   log('viewer unbind')
            // 销毁dom变化监听
            destroyObserver(el)
            // 销毁指令表达式监听
            destroyWatcher(el)
            // 销毁viewer
            destroyViewer(el)
        }
    })
}
install(Vue, {})
// export default {
//     install
// }