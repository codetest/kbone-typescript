import {IPlayer} from "./IPlayer"
import Player from "./AudioWrapper"

export class Global{
    static Player: IPlayer = Player;
}