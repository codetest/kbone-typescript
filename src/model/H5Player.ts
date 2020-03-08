import { IPlayer } from './IPlayer';

export class H5Player implements IPlayer{
    played: boolean = false
    Play(){
        if (this.played){
            return;
        }

        this.played = true
        var audio = new Audio()
        audio.src = "url"
        audio.play()
    }
}