import { _decorator } from "cc";
import { BaseSkill } from "./BaseSkill";
import { WeaponSettings } from "../../Data/GameSettings";

const { ccclass, property } = _decorator;

/**
 * 武器伤害技能
 */
@ccclass("WeaponDamageSkill")
export class WeaponDamageSkill extends BaseSkill {

    private currentSetting: WeaponSettings

    protected override init(damage: number, duration: number, lifeTime: number): void {
        super.init(damage, duration, lifeTime)

        this.currentSetting = new WeaponSettings()
        this.currentSetting.batter = 1
        this.currentSetting.damage = damage
        this.currentSetting.strikeDelay = duration
    }

    override upgrade(): void {
        const setting = this.getCurrentSkillSetting()
    }

    public override getCurrentSkillSetting(): WeaponSettings {
        const option = super.getCurrentSkillSetting()

        if (option) {
            this.currentSetting.damage = option.damage
            this.currentSetting.strikeDelay = option.cooldown
            this.currentSetting.batter = option.batter
        }

        return this.currentSetting
    }
}
