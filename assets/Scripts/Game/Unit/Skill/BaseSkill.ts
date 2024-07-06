import { _decorator, BoxCollider2D, CCFloat, Collider2D, Component, Contact2DType, Enum, Node, sp, Vec3 } from 'cc';
import { Player } from '../Player/Player';
import { GameTimer } from '../../../Services/GameTimer';
import { SkillUpgradeType, UpgradeType } from '../../Upgrades/UpgradeType';
const { ccclass, property } = _decorator;

Enum(SkillUpgradeType)

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
     * 技能冷却时间
     */
    @property(CCFloat)
    private cooldown: number = 3

    /**
     * 技能存活时间
     */
    @property(CCFloat)
    private lifeTime: number = 2

    private skillSettings: any[]

    private isFire: boolean = false

    private id: string

    public get Id(): string {
        return this.id
    }

    public set Id(value: string) {
        this.id = value
    }

    public get Damage(): number {
        return this.damage
    }

    /**
     * 技能冷却时间
     */
    public get Cooldown(): number {
        return this.cooldown
    }

    /**
     * 技能存活时间
     */
    public get LifeTime(): number {
        return this.lifeTime
    }

    /**
     * 技能是否已经释放
     */
    public get IsFire(): boolean {
        return this.isFire
    }

    /**
     * 设置技能释放状态
     */
    public set IsFire(value: boolean) {
        this.isFire = value
    }

    public get SkillSettings(): any[] {
        return this.skillSettings
    }

    public setup(skillSetting: any[]) {
        this.skillSettings = skillSetting

        if (this.skillSettings.length > 0) {
            const data = this.skillSettings[0]

            this.init(data.damage, data.cooldown)
        }

        this.gameTimer = new GameTimer(this.cooldown)
    }

    /**
     * 技能升级
     */
    public upgrade() {

    }

    protected init(damage: number, duration: number) {
        this.damage = damage
        this.cooldown = duration

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
