import {H5Player} from "./H5Player"
import {AudioPlayer} from "./AudioPlayer"
import { IPlayer } from './IPlayer'
var Player: IPlayer;
if (IsMiniProgram){
    Player = new AudioPlayer()
}
else{
    Player = new H5Player()
}

export default Player;