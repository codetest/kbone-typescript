<template>
  <div>
    <div @click="testClick" class="apptitle">{{test}}</div>
    <img :src="imgUrl" />
    <router-link to="/test/home">home</router-link>
    <router-link to="/test/detail">detail</router-link>
    <router-view></router-view>
    <img @click="goToOtherPage" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=10955058,2823889533&fm=11&gp=0.jpg" />
  </div>
</template>

<script lang="ts">
  import Home from "../../components/home/index.vue"
  import { Component, Vue } from 'vue-property-decorator'

  @Component({name: 'App', components: {Home}})
  export default class App extends Vue{
    test: string = "Hello Next World"
    imgUrl: string = require("../../images/test.jpg")
    created(){
      console.log("MainPage created")
      if (IsMiniProgram){
        window.addEventListener("wxload", (query: any) => {this.onLoad(query)});
        window.addEventListener("wxshow", () => {this.onShow()});
        window.addEventListener("wxhide", () => {this.onHide()});
        window.onShareAppMessage = (options: WechatMiniprogram.Page.IShareAppMessageOption) => {
          return this.onShareAppMessage(options)
        }

        wx.showShareMenu({
          withShareTicket: false,
          complete: (res: WechatMiniprogram.GeneralCallbackResult) => {
          }
        })
      }
    }

    onShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption): WechatMiniprogram.Page.ICustomShareContent{
        return {
          title: "页面内分享测试",
          path: "/index?q=123456"
        }
    }

    testClick(){
      this.test = "Hello World at " + new Date().toString()
    }

    onShow(){
      console.log("Page on show")
    }

    onHide(){
      console.log("Page on hide")
    }

    onLoad(query: Record<string, string | undefined>){
      console.log(query)
      console.log("Page on Load")
    }

    goToOtherPage(){
      if (IsMiniProgram){
        wx.navigateTo({url: "/pages/other/index"})
      }
    }
  }
</script>
<style>
  .apptitle{
    color: green;
    font-size: 30px;
    font-weight: bold;
  }
</style>