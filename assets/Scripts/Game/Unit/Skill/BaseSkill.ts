import { _decorator, Component, Node } from 'cc';
import { Player } from '../Player/Player';
import { GameTimer } from '../../../Services/GameTimer';
const { ccclass, property } = _decorator;

@ccclass('BaseSkill')
export class BaseSkill extends Component {
    @property(Player)
    private player: Player

    private gameTimer: GameTimer

    public gameTick(deltaTime: number): void {
    }
}
