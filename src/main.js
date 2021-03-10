// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
import Vuelidate from 'vuelidate'

import config from '../gridsome.config'

export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout)

    let copyRightNotice = `\u00a9 ${
        config.author
    }, ${new Date().getFullYear()}. All rights reserved`

    Vue.use(VueScrollTo, {
        duration: 500,
        easing: 'ease',
    })

    Vue.use(VueFuse)

    Vue.use(Vuelidate)

    head.meta.push({
        name: 'keywords',
        // content: 'Gridsome,Vue,Tailwind,Tailwind CSS,JavaScript,HTML,CSS,Vue.js,VueJS',
        content: config.keywords,
    })

    head.meta.push({
        name: 'description',
        // content: 'Gridsome Blog Starter',
        content: config.siteDescription,
    })

    head.meta.push({
        name: 'author',
        // content: 'Filip Vanden Eynde',
        content: config.author,
    })

    head.meta.push({
        name: 'copyright',
        content: copyRightNotice,
    })

    head.meta.push({
        key: 'og:type',
        property: 'og:type',
        content: 'article',
    })

    head.meta.push({
        key: 'og:description',
        property: 'og:description',
        content: config.siteDescription,
    })

    head.meta.push({
        key: 'og:image',
        property: 'og:image',
        content: 'src/static/logo.svg',
    })

    head.meta.push({
        key: 'og:site_name',
        property: 'og:site_name',
        content: config.siteName,
    })

    head.link.push({
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700',
    })
}
