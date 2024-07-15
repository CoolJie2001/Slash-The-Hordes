import { _decorator, Color, Component, Node, Prefab } from "cc";
import { ObjectPool } from "../../../Services/ObjectPool";
import { DamageSkipping } from "./DamageSkipping";

const { ccclass, property } = _decorator;

/**
 * 伤害跳字管理器
 */
@ccclass("SkippingManager")
export class SkippingManager extends Component {
    @property(Prefab)
    private damageSkipping: Prefab

    @property(Node)
    private damageSkippingRoot: Node

    private objectPool: ObjectPool<DamageSkipping>

    private static instance: SkippingManager


    public static get Instance(): SkippingManager {
        return this.instance
    }

    protected start(): void {
        if (!this.damageSkipping) {
            console.error(`必须绑定一个伤害跳字预制件.`)
            return
        }

        if (!this.damageSkippingRoot) {
            console.error("必须设置一个伤害跳字的根节点.")
            return
        }

        SkippingManager.instance = this

        this.objectPool = new ObjectPool(this.damageSkipping, this.damageSkippingRoot,
            50, "DamageSkipping"
        )
    }

    public createNewObject(playerNode: Node, damage: number, color: Color): DamageSkipping {
        const skipping = this.objectPool.borrow()

        if (skipping) {
            skipping.init(this.damageSkippingRoot, playerNode, damage, color)

            skipping.ObjectDestroy.on(this.returnSkipping, this)
        }

        return skipping
    }

    private returnSkipping(obj: DamageSkipping) {
        obj.ObjectDestroy.off(this.returnSkipping)

        this.objectPool.return(obj)
    }
}