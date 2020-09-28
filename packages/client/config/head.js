/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:29:33
 * @modify date 2020-08-05 14:29:33
 * @desc [description]
 */
const path = require('path');
const moment = require('moment');
const t=`?t=${moment().valueOf()}`
/*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
module.exports = (env) => {
    return {
        title: '暄桐教室',//process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
            { hid: 'description', name: 'description', content: '暄桐的写字课 | 文人式的生活与快乐' },
            {
                name: "keywords",
                content:
                    "书法,写字,书法课,书法零基础,美育,临帖,暄桐,暄桐教室,林曦,林糊糊,ask林曦,儿童书法,齐白石,丰子恺,小世界,闹事集,文人"
            },
            { hid: 'version', name: 'version', content: `${process.env.npm_package_version} ${moment().format("YYYY-MM-DD HH:mm")}` }
        ],
        link: [
            //  <link rel="preload" href="/assets/lib.b6ba1f1.js" as="script">
            { rel: 'preload', href: `${path.join(env.base, env.publicPath)}mocks/home.json${t}`, as: 'fetch' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            // { rel: 'stylesheet', href: '//at.alicdn.com/t/font_2037753_6zobxeuq2hh.css' }
        ],
        script: [
            { src: 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js' },
            { src: `${path.join(env.base, env.publicPath)}env.config.js${t}` }
        ],
    }
}