import { _decorator, AlphaKey, CCFloat, CCInteger, Color, Component, Label, Node, tween, UIOpacity, UITransform, v3, Vec3 } from 'cc';
import { AppRoot } from '../../../AppRoot/AppRoot';
import { Signal } from '../../../Services/EventSystem/Signal';
import { ISignal } from '../../../Services/EventSystem/ISignal';
const { ccclass, property } = _decorator;

/**
 * 伤害跳字
 */
@ccclass('DamageSkipping')
export class DamageSkipping extends Component {
    /**
     * 显示伤害跳字的数字
     */
    @property({ type: Label, displayName: '伤害值' })
    number: Label

    /**
     * 跳字力度
     */
    @property({ type: CCFloat, displayName: '力度' })
    forceIntensity: number = 5

    @property({ type: Color, displayName: '伤害颜色' })
    displayColor: Color = new Color('#EBFF00')

    /**
     * 跳字动画时间
     */
    @property({ type: CCInteger, displayName: '动画时间(ms)' })
    displayDuration: number = 1500

    /**
     * 显示伤害跳字的玩家节点
     */
    @property(Node)
    private displayPlayer: Node

    /**
     * 伤害跳字的根节点层
     */
    @property(Node)
    private damageLayer: Node

    private objectDestroy: Signal<DamageSkipping> = new Signal<DamageSkipping>()

    /**
     * 获取跳字玩家节点
     */
    public get DisplayPlayerNode(): Node {
        return this.displayPlayer
    }

    /**
     * 设置跳字玩家节点
     */
    public set DisplayPlayerNode(v: Node) {
        this.displayPlayer = v;
    }

    /**
     * 获取飘字颜色
     */
    public get DisplayColor(): Color {
        return this.displayColor
    }

    /**
     * 更新跳字伤害值
     * @param damage 跳字伤害值
     */
    public updateDamage(damage: number) {
        if (this.number) {
            this.number.string = String(damage)
        }
    }

    /**
     * 获取跳字动画时间
     */
    public get DisplayDuration(): number {
        return this.displayDuration
    }

    /**
     * 跳字动画时间
     */
    public set DisplayDuration(v: number) {
        this.displayDuration = v;
    }

    /**
     * 设置飘字颜色
     */
    public set DisplayColor(v: Color) {
        this.displayColor = v;

        if (this.number) {
            this.number.color = this.DisplayColor
        }
    }


    public get ObjectDestroy(): ISignal<DamageSkipping> {
        return this.objectDestroy
    }


    /**
     * 初始化飘字组件
     * @param layer 显示飘字的根节点
     * @param playerNode 显示飘字的玩家节点
     * @param damage 伤害值
     * @param color 飘字颜色
     */
    public init(layer: Node, playerNode: Node, damage: number, color: Color) {
        this.damageLayer = layer
        this.DisplayPlayerNode = playerNode
        this.number.string = String(damage)
        this.DisplayColor = color

        // if (layer) {
        //     this.damageLayer.addChild(this.node)
        // }
    }

    public play() {
        // 确保 number 和 displayPlayer 都已经设置
        if (!this.number || !this.displayPlayer || !this.damageLayer) {
            console.error('Number label or display player node not set.');
            return;
        }

        this.node.active = true

        // 将伤害跳字节点设置到 displayPlayer 的位置
        const worldPosition = this.displayPlayer.getWorldPosition()
        // const uiTransform = AppRoot.Instance.MainCamera.node.parent.getComponent(UITransform)
        // const uiPosition = uiTransform.convertToNodeSpaceAR(worldPosition)

        this.node.setWorldPosition(worldPosition);

        // console.log(`${this.displayPlayer.name}----${worldPosition}, uipos: ${uiPosition}`)

        // return

        // 计算动画目标位置
        const startPosition = worldPosition
        const targetPosition = new Vec3(startPosition.x + this.forceIntensity, startPosition.y + this.forceIntensity + 50, startPosition.z);

        const opacityNode = this.node.children[0].getComponent(UIOpacity)

        // // 创建跳字动画
        // tween(this.node)
        //     .to(this.displayDuration / 1000, { position: targetPosition }, {
        //         easing: 'sineOut',
        //         onUpdate: (target, ratio) => {
        //             // 设置伤害跳字的透明度随动画进展而减少
        //             opacityNode.opacity = 255 * (1 - ratio);
        //         }
        //     })
        //     .call(() => {
        //         // 动画结束后销毁节点
        //         // this.node.destroy();
        //     })
        //     .start();

        const obj = {
            p: startPosition,
            alpha: 255
        }

        tween(obj)
            .to(0.1, { p: targetPosition },
                {
                    easing: 'sineIn',
                    onUpdate: (target, ratio) => {
                        this.node.setWorldPosition(obj.p)
                    }
                })
            .to(0.5, { alpha: 0 },
                {
                    easing: 'sineIn',
                    onUpdate: (target, ratio) => {
                        // opacityNode.opacity = 255 * (1 - ratio);
                        opacityNode.opacity = obj.alpha
                    }
                }
            )
            .call(() => {
                // this.node.parent.removeChild(this.node)
                // this.node.destroy()

                this.objectDestroy.trigger(this)
            })
            .start();
    }

}


