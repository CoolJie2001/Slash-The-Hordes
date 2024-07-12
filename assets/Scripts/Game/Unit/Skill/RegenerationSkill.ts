import { _decorator, ParticleSystem2D } from 'cc';
import { BaseSkill } from './BaseSkill';
import { RegenerationSetting } from './Settings/RegenerationSetting';
import { PlayerRegeneration } from '../Player/PlayerRegeneration';
import { UnitHealth } from '../UnitHealth';
import { Player } from '../Player/Player';
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

    public get RegenerationSettings(): RegenerationSetting[] {
        return this.SkillSettings
    }

    start() {
        if (this.player) {
            this.healthUnit = this.player.Health
        }
    }

    public getCurrentSkillSetting(): RegenerationSetting {
        if (this.RegenerationSettings && this.RegenerationSettings.length >= this.CurrentLevel) {
            return this.RegenerationSettings[this.CurrentLevel - 1]
        }
    }

    protected override init(damage: number, duration: number, lifeTime: number): void {
        super.init(damage, duration, lifeTime)

        this.regeneration = new PlayerRegeneration(this.healthUnit)
    }

    override upgrade(): void {
        super.upgrade()

        const setting = this.getCurrentSkillSetting()

        this.regeneration.SingleRecoveryHealth = setting.Damage
        this.regeneration.upgrade()
    }

    update(deltaTime: number) {
        if (this.elapsedTime < this.LifeTime) {
            this.elapsedTime += deltaTime
        } else {
            this.elapsedTime = 0

            this.node.active = false

            this.IsFire = false
        }
    }
}


