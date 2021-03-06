import Vue from 'vue'
import Router from 'vue-router'
import Home from "../../components/home/index.vue"
import Detail from "../../components/detail/index.vue"
import App from "./app.vue"

export default function createApp() {
    Vue.use(Router)
    const router = new Router({
        routes: [{
            path: '/',
            component: Home,
        }, {
            path: '/test/home',
            component: Home,
        },{
            path: "/test/detail",
            component: Detail,
        }]
    })

    document.documentElement.style.fontSize = wx.getSystemInfoSync().screenWidth / 16 + 'px'
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)
    return new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  }