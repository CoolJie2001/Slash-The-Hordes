import { _decorator, CCFloat, Component, Enum, Vec3 } from 'cc';
import { GameTimer } from '../../../Services/GameTimer';
import { SkillUpgradeType } from '../../Upgrades/UpgradeType';
import { SkillLevel } from './SkillLevel';
const { ccclass, property } = _decorator;

Enum(SkillUpgradeType)

@ccclass('BaseSkill')
export class BaseSkill extends Component {
    private gameTimer: GameTimer

    private currentLevel: number = 0
    private maxLevel: number = 1

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

    private skillSettings: SkillLevel[]

    private isFire: boolean = false

    private id: string

    public get Id(): string {
        return this.id
    }

    public set Id(value: string) {
        this.id = value
    }


    public get CurrentLevel(): number {
        return this.currentLevel
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

    public get Level(): number {
        return this.currentLevel
    }


    public get SkillSettings(): SkillLevel[] {
        return this.skillSettings
    }

    public getCurrentSkillSetting(): any | null {
        if (this.SkillSettings && this.SkillSettings.length >= this.CurrentLevel)
            return this.SkillSettings[this.CurrentLevel - 1]

        return null
    }

    public setup(skillSetting: SkillLevel[]) {
        this.skillSettings = skillSetting

        if (this.skillSettings.length > 0) {
            const data = this.skillSettings[0]

            this.Id = data.id

            this.init(0, 0, 0)

            this.skillSettings.forEach((value) => {
                this.maxLevel = Math.max(this.maxLevel, value.level)
            })
        }
    }

    /**
     * 技能升级
     */
    public upgrade() {
        if (this.skillSettings != null && this.skillSettings.length > 0) {
            this.currentLevel++

            if (this.currentLevel > this.maxLevel) {
                this.currentLevel = this.maxLevel
            }

            const setting = this.skillSettings[this.currentLevel - 1]

            if (setting) {
                this.init(Number(setting.damage), Number(setting.cooldown), Number(setting.lifetime))

                this.gameTimer = new GameTimer(this.cooldown)
            }
        }
    }

    protected init(damage: number, duration: number, lifeTime: number) {
        this.damage = damage
        this.cooldown = duration
        this.lifeTime = lifeTime

        this.node.active = false
    }

    public gameTick(deltaTime: number): void {
        // 当前没有释放技能, 则判断gameTimer的冷却时间是否完成技能冷却
        if (!this.IsFire && this.currentLevel > 0) {
            this.gameTimer.gameTick(deltaTime)

            if (this.gameTimer.tryFinishPeriod()) {
                // 技能冷却后, 释放技能
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
