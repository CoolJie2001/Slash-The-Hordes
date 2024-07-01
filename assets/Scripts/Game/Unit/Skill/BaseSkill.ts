import { _decorator, BoxCollider2D, CCFloat, Collider2D, Component, Contact2DType, Node, sp, Vec3 } from 'cc';
import { Player } from '../Player/Player';
import { GameTimer } from '../../../Services/GameTimer';
import { Enemy } from '../Enemy/Enemy';
const { ccclass, property } = _decorator;

@ccclass('BaseSkill')
export class BaseSkill extends Component {
    @property(Player)
    private player: Player

    private gameTimer: GameTimer

    /**
     * 技能每次碰撞伤害
     */
    @property(CCFloat)
    private damage: number = 100
    /**
     * 技能持续时间
     */
    @property(CCFloat)
    private duration: number = 3

    /**
     * 技能存活时间
     */
    @property(CCFloat)
    private lifeTime: number = 2

    /**
     * 技能的速度
     */
    @property(CCFloat)
    private speed: number = 1

    @property(BoxCollider2D)
    private collider: BoxCollider2D

    private isFire: boolean = false

    public get Damage(): number {
        return this.damage
    }

    public get Duration(): number {
        return this.duration
    }

    public get LifeTime(): number {
        return this.lifeTime
    }

    public get Speed(): number {
        return this.speed
    }

    public get IsFire(): boolean {
        return this.isFire
    }

    public set IsFire(value: boolean) {
        this.isFire = value
    }

    public setup() {
        this.init(this.damage, this.duration, this.speed)

        this.gameTimer = new GameTimer(this.duration)

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this)
    }

    // protected onEnable(): void {
    //     console.log(`${this.node.name} ---- onEnable`)
    //     this.collider.on(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this)

    // }

    // protected onDisable(): void {
    //     console.log(`${this.node.name} ---- onDisable`)
    //     this.collider.off(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this)

    // }

    onColliderContactBegin(thisCollider: Collider2D, otherCollider: Collider2D): void {
        console.log(`碰撞到的对象名字:${otherCollider.node.name}, Id:${otherCollider.node.uuid}`)

        let enemy = otherCollider.getComponent(Enemy)

        if (enemy)
            enemy.dealDamage(this.Damage);
    }

    protected init(damage: number, duration: number, speed: number) {
        this.damage = damage
        this.duration = duration
        this.speed = speed

        this.node.active = false
    }

    public gameTick(deltaTime: number): void {
        if (!this.IsFire) {
            this.gameTimer.gameTick(deltaTime)

            if (this.gameTimer.tryFinishPeriod()) {
                this.fire(this.node.position)
            }
        }
    }

    public fire(startPosition: Vec3) {
        this.node.active = true

        this.node.position = startPosition

        this.IsFire = true
    }
}
