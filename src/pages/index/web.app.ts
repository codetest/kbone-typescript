import Vue from 'vue'
import Router from 'vue-router'
import Home from "../../components/home/index.vue"
import Detail from "../../components/detail/index.vue"
import App from "./app.vue"

function createApp() {
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

    console.log("It is not miniprogram env")
    document.documentElement.style.fontSize = document.documentElement.getBoundingClientRect().width / 16 + 'px'
    window.onload = function() {
        document.documentElement.style.fontSize = document.documentElement.getBoundingClientRect().width / 16 + 'px'
        document.documentElement.style.backgroundColor = '#fffbe7'
    }

    window.onerror = (message, source, lineno, colno, error) => {
        console.log('window.onerror => ', message, source, lineno, colno, error)
    };

    window.addEventListener('error', evt => console.log('window.addEventListener(\'error\') =>', evt))   
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)
    return new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  }

  createApp()