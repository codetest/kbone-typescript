App({
    onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
        console.log("app launched ", options)
    },

    onShow(options: WechatMiniprogram.App.LaunchShowOption) {
        console.log("app show ", options)
    },

    onHide() {
    },

    onError(err: string) {
        console.log("app error ", err)
    },

    onPageNotFound(options: WechatMiniprogram.App.PageNotFoundOption) {
        console.log("page not found ", options)
    },
})