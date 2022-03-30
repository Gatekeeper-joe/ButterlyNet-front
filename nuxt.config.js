require('dotenv').config()
import Vue from 'vue'
Vue.use(BootstrapVue)
import BootstrapVue from 'bootstrap-vue'

export default {
    ssr: true,
    target: 'server',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Butterfly.Net',
        htmlAttrs: {
            lang: 'ja'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/style.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/auth-next',
        'bootstrap-vue/nuxt',
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
    ],

    // https://www.nanatsu.jp/?p=513
    bootstrapVue: {
        icons: true
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            compact: true,
        },
    },

    //BASE_URL="https://52.198.111.82:443/api"
    axios: {
        baseURL:  "https://52.198.111.82:443/routes"
    },

    auth: {
        redirect: {
            login: '/login',
            logout: '/login',
            callback: false,
            home: '/workspace'
        },

        strategies: {
            User: {
                provider: 'laravel/jwt',
                url: 'https://52.198.111.82:443/routes',
                token: {
                    property: 'access_token',
                    maxAge: 60 * 60,
                    type: 'Bearer',
                },
                refreshToken: {
                    property: 'access_token',
                    maxAge: 20160 * 60,
                },

                endpoints: {
                    login: { url: '/login', method: 'post', propertyName: 'access_token' },
                    logout: { url: '/logout', method: 'post', propertyName: 'access_token' },
                    refresh: { url: '/refresh', method: 'post' , propertyName: 'access_token'},
                    user: { url: '/me', method: 'get', propertyName: false},
                }
            }
        },
    },
}
