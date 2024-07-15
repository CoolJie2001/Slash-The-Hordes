import { _decorator, math, ParticleSystem2D } from 'cc';
import { BaseSkill } from './BaseSkill';
import { RegenerationSetting } from './Settings/RegenerationSetting';
import { PlayerRegeneration } from '../Player/PlayerRegeneration';
import { UnitHealth } from '../UnitHealth';
import { Player } from '../Player/Player';
import { Game } from '../../Game';
const { ccclass, property } = _decorator;

/**
 * 回复术技能
 */
@ccclass('RegenerationSkill')
export class RegenerationSkill extends BaseSkill {
    @property(ParticleSystem2D)
    regenerationParticle: ParticleSystem2D

    @property({ type: Player })
    player: Player

    private healthUnit: UnitHealth

    private elapsedTime: number = 0

    private regeneration: PlayerRegeneration

    start() {

    }

    public getCurrentSkillSetting(): RegenerationSetting {
        if (this.SkillSettings && this.SkillSettings.length >= this.CurrentLevel) {
            return this.SkillSettings[this.CurrentLevel - 1] as RegenerationSetting
        }
    }

    protected override init(damage: number, duration: number, lifeTime: number): void {
        super.init(damage, duration, lifeTime)

        if (this.player == null) {
            this.player = Game.Instance.Player
        }

        if (this.player) {
            this.healthUnit = this.player.Health
        }

        this.regeneration = new PlayerRegeneration(this.healthUnit)
    }

    override upgrade(): void {
        super.upgrade()

        const setting = this.getCurrentSkillSetting()

        this.regeneration.SingleRecoveryHealth = Number(setting.damage)
        this.regeneration.upgrade()
    }

    public override gameTick(deltaTime: number): void {
        super.gameTick(deltaTime)

        if (this.IsFire) {
            // 判断释放技能后, 技能的LifeTime

            if (this.elapsedTime < this.LifeTime) {
                this.elapsedTime += deltaTime

                if (this.regeneration) {
                    const fire = this.regeneration.gameTick(deltaTime)

                    if (fire) this.IsFire = false
                }
            } else {
                // 技能LifeTime到期
                this.elapsedTime = 0

                this.node.active = false

                this.IsFire = false

                this.disableParticleNode()
            }
        }
    }

    enableParticleNode() {
        if (this.regenerationParticle) {
            this.regenerationParticle.node.active = true

            this.regenerationParticle.resetSystem()
        }
    }

    disableParticleNode() {
        if (this.regenerationParticle) {
            this.regenerationParticle.node.active = false
        }
    }

    override fire(startPosition: math.Vec3): void {
        super.fire(startPosition)

        this.enableParticleNode()
    }
}


