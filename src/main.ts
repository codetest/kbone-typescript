import "./main.css"

App({
    onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
        console.log("app on launch")
    },

    onShow(options: WechatMiniprogram.App.LaunchShowOption) {
        console.log("app on show")
    },

    onHide() {
        console.log("app on hide")
    },

    onError(err: string) {},

    onPageNotFound(options: WechatMiniprogram.App.PageNotFoundOption) {
        console.log("app on page not found")
    },
})