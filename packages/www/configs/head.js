/*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
module.exports = {
    title: '暄桐教室',//process.env.npm_package_name || '',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
        { hid: 'version', name: 'version', content: process.env.npm_package_version || '' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
}