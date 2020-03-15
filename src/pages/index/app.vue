<template>
    <div>
        <div @click="sayHello" class="sample2">{{msg}}</div>
        <div class="sample">{{msg}}</div>
        <div class="sample1">{{msg}}</div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    import "../../style/sample.css"
    import "../../style/sample.sass"
    @Component({name: "Home"})
    export default class Home extends Vue{
        msg: string = "Hello World"
        sayHello(){
            wx.showToast({title: this.msg, icon: "none"})
        }

        created() {
            window.addEventListener("wxload", (query: any) => {this.onLoad(query)})
            window.addEventListener("wxshow", () => {this.onShow()})
            window.addEventListener("wxhide", () => {this.onHide()})
            wx.showShareMenu({})
            window.onShareAppMessage = (options: WechatMiniprogram.Page.IShareAppMessageOption) => {return this.onShareAppMessage(options)};
        }

        onShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption): WechatMiniprogram.Page.ICustomShareContent{
            return {title: "页面分享"}
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
    }
</script>
<style lang="sass">
    .sample2{
        color: red;
    }
</style>