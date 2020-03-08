import { IPlayer } from './IPlayer';

export class AudioPlayer implements IPlayer{
    backgroundManager: WechatMiniprogram.BackgroundAudioManager;
    played: boolean = false
    constructor(){
        this.backgroundManager = wx.getBackgroundAudioManager()
    }

    Play(): void{
        if (this.played){
            return;
        }

        this.played = true
        this.backgroundManager.src = "url"
        this.backgroundManager.title = "正在播放节目"
    }
}