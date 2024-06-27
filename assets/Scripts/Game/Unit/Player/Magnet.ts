import { _decorator, Component, Node, Collider2D, CircleCollider2D } from "cc";
import { GameTimer } from "../../../Services/GameTimer";
const { ccclass, property } = _decorator;

/**
 * 磁铁能力
 * 本质上就是一个不可见的节点绑定了一个碰撞体, 在玩家行动中所有与该碰撞体发生碰撞的道具都被玩家吸附
 */
@ccclass("Magnet")
export class Magnet extends Component {
    @property(CircleCollider2D) private collider: CircleCollider2D;

    private timer: GameTimer;
    private duration: number;

    public get Collider(): Collider2D {
        return this.collider;
    }
    public init(duration: number): void {
        this.duration = duration;
        this.node.active = false;
    }

    public activate(): void {
        this.timer = new GameTimer(this.duration);
        this.node.active = true;
    }

    public gameTick(deltaTime: number): void {
        if (!this.node.active) return;

        this.timer.gameTick(deltaTime);
        if (this.timer.tryFinishPeriod()) {
            this.node.active = false;
        }
    }
}
